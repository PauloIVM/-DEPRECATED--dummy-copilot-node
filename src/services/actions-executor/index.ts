import * as ActionsMiddlewares from "./actions-middlewares";
import { IAction } from "@common/interfaces";
import { IActionsExecutor } from "./interfaces";
import { IContext } from "@services/context/interfaces";
import MiddlewaresExecutor from "./middlewares-executor";

// INFO: Essa classe aqui poderia ser uma factory? Me parece fazer algum sentido!
export class ActionsExecutor implements IActionsExecutor {
    private readonly context: IContext;
    // Criar interface para essa classe? Seria a mesma do ActionsExecutor
    private readonly middlewaresExecutor: MiddlewaresExecutor;
    constructor(ctx: IContext) {
        this.context = ctx;
        this.middlewaresExecutor = new MiddlewaresExecutor([
            new ActionsMiddlewares.PasteAction(),
            new ActionsMiddlewares.SequenceAction(),
            new ActionsMiddlewares.FeedClipboardAction(this.context),
            new ActionsMiddlewares.RetrieveClipboardAction(this.context),
        ]);
    }

    exec(actions: IAction[]): void {
        this.middlewaresExecutor.exec(actions);
    }
}

export { IActionsExecutor };
