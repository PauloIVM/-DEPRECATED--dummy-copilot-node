import { PasteAction, SequenceAction } from "./actions-middlewares";
import ActionsExecutor from "../abstract-actions-executor";
import { IActionMiddleware } from "../abstract-actions-executor/interfaces/i-action-middleware";
import { IActionsExecutor } from "../../interfaces/i-actions-executor";

export default class ShortcutActionsExecutor extends ActionsExecutor implements IActionsExecutor {
    protected actionMiddlewares: IActionMiddleware[];

    constructor() {
        super();
        this.actionMiddlewares = [new PasteAction(), new SequenceAction()];
    }
}
