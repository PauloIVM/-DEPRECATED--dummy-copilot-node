import * as ActionsMiddlewares from "./actions-middlewares";
import * as Interfaces from "./interfaces";
import ActionsExecutor from "./actions-executor";
import Context from "./context";

export default class DummyCopilot {
    private shortcuts: Interfaces.IShortcut[];
    private readonly devices: Interfaces.IKeylogger[];
    private readonly context: Interfaces.IContext;
    private keysClickedQueue: Interfaces.IKey<"down" | "up">[] = [];
    private readonly actionsExecutor: Interfaces.IActionsExecutor;

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
        onClickUpKey?: (_: Interfaces.IKeyEvent) => void,
        onClickDownKey?: (_: Interfaces.IKeyEvent) => void,
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

    private onClickKey({ keyId, clickType }: Interfaces.IKeyEvent) {
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
