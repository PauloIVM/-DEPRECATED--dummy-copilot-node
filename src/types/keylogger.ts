import { EventEmitter } from "events";

export abstract class Keylogger extends EventEmitter {
    constructor(device: string, os: string) {
        super();
    }
    on: (eventName: "up" | "down", listener: (args: KeyEvent) => void) => this;
}

export interface KeyEvent {
    timeS: number;
    timeMS: number;
    keyCode: number;
    keyId: string;
    clickType: "up" | "down";
    device: string;
}
