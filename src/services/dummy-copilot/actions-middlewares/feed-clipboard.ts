import { IAction } from "../interfaces/i-action";
import { IActionMiddleware } from "../interfaces/i-action-middleware";
import { IContext } from "../interfaces/i-context";
import clipboard from "copy-paste";

export class FeedClipboardAction implements IActionMiddleware {
    private readonly context: IContext;
    private readonly name: IAction["actionType"] = "feed_clipboard";

    constructor(ctx: IContext) {
        this.context = ctx;
    }

    getName(): IAction["actionType"] {
        return this.name;
    }

    exec(action: IAction, next: () => void): void {
        const content = this.context.getClipElement(action?.clipIndex);
        if (!content) {
            return;
        }
        clipboard.copy(content, () => {
            next();
        });
    }
}
