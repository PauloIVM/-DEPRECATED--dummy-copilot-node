import { IAction } from "../../interfaces/i-action";
import { IActionMiddleware } from "./interfaces/i-action-middleware";

export default abstract class AbstractActionsExecutor {
    private actionMiddlewaresMap: Map<IAction["actionType"], IActionMiddleware>;
    private index = 0;
    private actions: IAction[];
    protected abstract actionMiddlewares: IActionMiddleware[];

    constructor() {
        this.setupActionMiddlewaresMap();
    }

    exec(actions: IAction[]): void {
        this.actions = actions;
        this.index = 0;
        this.next();
    }

    private setupActionMiddlewaresMap() {
        this.actionMiddlewaresMap = new Map();
        this.actionMiddlewares.forEach((actionMiddleware) => {
            this.actionMiddlewaresMap.set(actionMiddleware.getName(), actionMiddleware);
        });
    }

    private next() {
        const action = this.actions[this.index];
        if (!action) {
            this.index = 0;
            this.actions = [];
            return;
        }
        this.index = this.index + 1;
        this.actionMiddlewaresMap.get(action.actionType).exec(action, this.next.bind(this));
    }
}
