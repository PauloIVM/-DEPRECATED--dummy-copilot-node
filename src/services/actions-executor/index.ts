import * as ActionsMiddlewares from "./actions-middlewares";
import { ActionsExecutor } from "./actions-executor";
import { IActionsExecutor } from "./interfaces";
import { IContext } from "@services/context/interfaces";
import { IFactory } from "@common/interfaces";
export class ActionsExecutorFactory implements IFactory<IContext, IActionsExecutor> {
    create(ctx: IContext): IActionsExecutor {
        return new ActionsExecutor([
            new ActionsMiddlewares.PasteAction(),
            new ActionsMiddlewares.SequenceAction(),
            new ActionsMiddlewares.FeedClipboardAction(ctx),
            new ActionsMiddlewares.RetrieveClipboardAction(ctx),
        ]);
    }
}

export { IActionsExecutor };
