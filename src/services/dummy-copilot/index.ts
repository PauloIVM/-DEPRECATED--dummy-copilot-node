import ActionsExecutor from "./actions-executor";
import { IKey } from "./interfaces/i-key";
import { IKeyEvent } from "./interfaces/i-key-event";
import { IKeylogger } from "./interfaces/i-keylogger";
import { IShortcut } from "./interfaces/i-shortcut";
import { actionsMethods } from "./actions-methods";
export default class DummyCopilot {
    private shortcuts: IShortcut[];
    private readonly keylogger: IKeylogger;
    private keysClickedQueue: IKey<"down" | "up">[] = [];
    private readonly actionsExecutor: ActionsExecutor;

    constructor(keylogger: DummyCopilot["keylogger"]) {
        this.keylogger = keylogger;
        this.actionsExecutor = new ActionsExecutor(actionsMethods);
    }

    startKeyListener(
        onClickUpKey?: (_: IKeyEvent) => void,
        onClickDownKey?: (_: IKeyEvent) => void,
    ): void {
        this.keylogger.on("up", onClickUpKey);
        this.keylogger.on("down", onClickDownKey);
    }

    startShortcutListener(): void {
        this.keylogger.on("up", this.onClickKey.bind(this));
        this.keylogger.on("down", this.onClickKey.bind(this));
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
            this.actionsExecutor.execActions(shortcut.getActions());
            this.keysClickedQueue = [];
        }
    }
}
