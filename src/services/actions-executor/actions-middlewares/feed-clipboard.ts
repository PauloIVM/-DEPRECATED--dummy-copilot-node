import { IAction } from "@common/interfaces";
import { IActionMiddleware } from "../interfaces";
import { IContext } from "@services/context/interfaces";
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
