import { IKeyEvent } from "./i-key-event";
export interface IKeylogger {
    on: (eventName: "down" | "up", listener: (args: IKeyEvent) => void) => this;
}
