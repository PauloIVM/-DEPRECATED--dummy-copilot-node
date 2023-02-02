import { IKeyEvent, IKeylistener } from "./interfaces";
import { IFactory } from "@common/interfaces";
import { Keylistener } from "./keylistener";

export class KeylistenersFactory implements IFactory<string[], IKeylistener[]> {
    create(devices: string[]): IKeylistener[] {
        return devices.map((device) => new Keylistener(device));
    }
}

export { IKeylistener, IKeyEvent };
