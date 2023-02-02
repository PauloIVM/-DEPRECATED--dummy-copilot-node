import { IKeyEvent, IKeylistener, KeylistenersFactory } from "@services/keylistener";

export class TriggerLogger {
    private readonly keylisteners: IKeylistener[];

    constructor() {
        this.keylisteners = KeylistenersFactory.create(["event3", "event9"]);
    }

    startKeyListener(
        onClickUpKey?: (_: IKeyEvent) => void,
        onClickDownKey?: (_: IKeyEvent) => void,
    ): void {
        this.keylisteners.forEach((keyboard) => {
            keyboard.on("up", onClickUpKey);
            keyboard.on("down", onClickDownKey);
        });
    }
}

export { IKeyEvent };
