import { ActionsExecutor, IActionsExecutor } from "@services/actions-executor";
import { Context, IContext } from "@services/context";
import { IKeyEvent, IKeylistener } from "@services/keylistener/interfaces";
import { IKey } from "@common/interfaces";
import { IShortcut } from "./interfaces";

export default class DummyCopilot {
    private shortcuts: IShortcut[];
    private readonly devices: IKeylistener[];
    private readonly context: IContext;
    private keysClickedQueue: IKey<"down" | "up">[] = [];
    private readonly actionsExecutor: IActionsExecutor;

    constructor(devices: DummyCopilot["devices"]) {
        this.devices = devices;
        this.context = new Context();
        this.actionsExecutor = new ActionsExecutor(this.context);
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
