import { IAction } from "./interfaces/i-action";
import { IActionMiddleware } from "./interfaces/i-action-middleware";
export default class ActionsExecutor {
    private readonly actionMiddlewaresMap: Map<IAction["actionType"], IActionMiddleware>;
    private index = 0;
    private actions: IAction[];

    constructor(middlewares: IActionMiddleware[]) {
        this.actionMiddlewaresMap = new Map();
        middlewares.forEach((actionMiddleware) => {
            this.actionMiddlewaresMap.set(actionMiddleware.getName(), actionMiddleware);
        });
    }

    execActions(actions: IAction[]): void {
        this.actions = actions;
        this.index = 0;
        this.next();
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
