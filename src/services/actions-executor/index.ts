import * as ActionsMiddlewares from "./actions-middlewares";
import { ActionsExecutor } from "./actions-executor";
import { IActionsExecutor } from "./interfaces";
import { IContext } from "@services/context/interfaces";

export class ActionsExecutorFactory {
    static create(ctx: IContext): IActionsExecutor {
        return new ActionsExecutor([
            new ActionsMiddlewares.PasteAction(),
            new ActionsMiddlewares.SequenceAction(),
            new ActionsMiddlewares.FeedClipboardAction(ctx),
            new ActionsMiddlewares.RetrieveClipboardAction(ctx),
        ]);
    }
}

export { IActionsExecutor };
