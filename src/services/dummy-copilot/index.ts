import * as ActionsMiddlewares from "./actions-middlewares";
import ActionsExecutor from "./actions-executor";
import Context from "./context";
import { IActionsExecutor } from "./interfaces/i-actions-executor";
import { IContext } from "./interfaces/i-context";
import { IKey } from "./interfaces/i-key";
import { IKeyEvent } from "./interfaces/i-key-event";
import { IKeylogger } from "./interfaces/i-keylogger";
import { IShortcut } from "./interfaces/i-shortcut";

export default class DummyCopilot {
    private shortcuts: IShortcut[];
    private readonly devices: IKeylogger[];
    private readonly context: IContext;
    private keysClickedQueue: IKey<"down" | "up">[] = [];
    private readonly actionsExecutor: IActionsExecutor;

    constructor(devices: DummyCopilot["devices"]) {
        this.devices = devices;
        this.context = new Context();
        this.actionsExecutor = new ActionsExecutor([
            new ActionsMiddlewares.PasteAction(),
            new ActionsMiddlewares.SequenceAction(),
            new ActionsMiddlewares.FeedClipboardAction(this.context),
            new ActionsMiddlewares.RetrieveClipboardAction(this.context),
        ]);
    }

    startKeyListener(
        onClickUpKey?: (_: IKeyEvent) => void,
        onClickDownKey?: (_: IKeyEvent) => void,
    ): void {
        this.devices.forEach((keyboard) => {
            keyboard.on("up", onClickUpKey);
            keyboard.on("down", onClickDownKey);
        });
    }

    startShortcutListener(): void {
        this.devices.forEach((keyboard) => {
            keyboard.on("up", this.onClickKey.bind(this));
            keyboard.on("down", this.onClickKey.bind(this));
        });
    }

    setShortcutsFile(shortcuts: DummyCopilot["shortcuts"]): void {
        this.shortcuts = shortcuts;
    }

    // TODO: Handle this properly. Should be on actions-executor?
    // setDelay(delayBetweenClicks: number): void {
    //     robot.setKeyboardDelay(delayBetweenClicks);
    // }

    private onClickKey({ keyId, clickType }: IKeyEvent) {
        this.keysClickedQueue.push({ keyId, clickType });

        const shortcut = this.shortcuts.find((element) =>
            element.hasTrigger(this.keysClickedQueue),
        );

        if (!shortcut) {
            this.keysClickedQueue = [];
            return;
        }

        if (shortcut.getTrigger()?.length === this.keysClickedQueue?.length) {
            this.actionsExecutor.exec(shortcut.getActions());
            this.keysClickedQueue = [];
        }
    }
}
