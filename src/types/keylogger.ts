import { TriggerKey } from "./shortcut";

export interface Keylogger {
    on: (eventName: TriggerKey["clickType"], listener: (args: KeyEvent) => void) => this;
}

export interface KeyEvent {
    timeS: number;
    timeMS: number;
    keyCode: number;
    keyId: string;
    clickType: TriggerKey["clickType"];
    device: string;
}
