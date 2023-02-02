import { ActionsExecutorFactory, IActionsExecutor } from "@services/actions-executor";
import { ContextFactory, IContext } from "@services/context";
import { IKeyEvent, IKeylistener, KeylistenersFactory } from "@services/keylistener";
import { IShortcut, ShortcutsFactory } from "@services/shortcuts";
import { IDummyCopilot } from "./interfaces";
import { IKey } from "@common/interfaces";

export class DummyCopilot implements IDummyCopilot {
    private readonly shortcuts: IShortcut[];
    private readonly keylisteners: IKeylistener[];
    private readonly context: IContext;
    private keysClickedQueue: IKey<"down" | "up">[] = [];
    private readonly actionsExecutor: IActionsExecutor;

    constructor() {
        this.keylisteners = new KeylistenersFactory().create(["event3", "event9"]);
        this.context = new ContextFactory().create();
        this.shortcuts = new ShortcutsFactory().create();
        this.actionsExecutor = new ActionsExecutorFactory().create(this.context);
    }

    startShortcutListener(): void {
        this.keylisteners.forEach((keylistener) => {
            keylistener.on("up", this.onClickKey.bind(this));
            keylistener.on("down", this.onClickKey.bind(this));
        });
    }

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

export { IDummyCopilot };
