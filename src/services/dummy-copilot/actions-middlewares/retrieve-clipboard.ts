import { IAction } from "../interfaces/i-action";
import { IActionMiddleware } from "../interfaces/i-action-middleware";
import { IContext } from "../interfaces/i-context";
import clipboard from "copy-paste";

export class RetrieveClipboardAction implements IActionMiddleware {
    private readonly context: IContext;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    private readonly maxContentsLength = 20;
    private readonly name: IAction["actionType"] = "retrieve_clipboard";

    constructor(ctx: IContext) {
        this.context = ctx;
    }

    getName(): IAction["actionType"] {
        return this.name;
    }

    exec(action: IAction, next: () => void): void {
        if (
            !action ||
            !Number.isInteger(action.clipIndex) ||
            action.clipIndex > this.maxContentsLength
        ) {
            return;
        }
        const curr = clipboard.paste();
        this.context.setClipElement(action?.clipIndex, curr);
        next();
    }
}
