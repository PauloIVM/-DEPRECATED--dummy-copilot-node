import { IKeyEvent } from "./i-key-event";
export interface IKeylistener {
    on: (eventName: "down" | "up", listener: (args: IKeyEvent) => void) => this;
}
