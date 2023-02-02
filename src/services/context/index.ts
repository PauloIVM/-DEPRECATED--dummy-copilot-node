import { IContext } from "./interfaces";

export class Context implements IContext {
    private readonly clipboardContents: string[];
    constructor() {
        this.clipboardContents = [];
    }
    getClipElement(index: number): string {
        if (!Number.isInteger(index)) {
            return;
        }
        return this.clipboardContents[index];
    }
    setClipElement(index: number, content: string): boolean {
        if (!Number.isInteger(index) || typeof content !== "string") {
            return false;
        }
        this.clipboardContents[index] = content;
        return true;
    }
}

export { IContext };
