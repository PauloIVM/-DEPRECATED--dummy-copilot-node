import { IKeyEvent, IKeylistener } from "./interfaces";
import { Keylistener } from "./keylistener";

export class KeylistenersFactory {
    static create(devices: string[]): IKeylistener[] {
        return devices.map((device) => new Keylistener(device));
    }
}

export { IKeylistener, IKeyEvent };
