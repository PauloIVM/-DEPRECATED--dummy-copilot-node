import { IKeyEvent, IKeylistener, KeylistenersFactory } from "@services/keylistener";
import { ITriggerLogger } from "./interfaces";

export class TriggerLogger implements ITriggerLogger {
    private readonly keylisteners: IKeylistener[];

    constructor() {
        this.keylisteners = new KeylistenersFactory().create(["event3", "event9"]);
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

export { IKeyEvent, ITriggerLogger };
