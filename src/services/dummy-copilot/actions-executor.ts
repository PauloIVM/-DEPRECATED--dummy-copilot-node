import { IAction } from "./interfaces/i-action";
export default class ActionsExecutor {
    private readonly actionMethodsMap: Record<
        IAction["actionType"],
        (action: IAction, next: () => void) => void
    >;
    private index = 0;
    private actions: IAction[];

    constructor(actionMethodsMap: ActionsExecutor["actionMethodsMap"]) {
        this.actionMethodsMap = actionMethodsMap;
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
        this.actionMethodsMap[action.actionType](action, this.next.bind(this));
    }
}
