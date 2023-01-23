import { Action } from "../../types/shortcut";

export default class ActionsExecutor {
    private readonly actionMethodsMap: Record<
        Action["actionType"],
        (action: Action, next: () => void) => void
    >;
    private index = 0;
    private actions: Action[];

    constructor(actionMethodsMap: ActionsExecutor["actionMethodsMap"]) {
        this.actionMethodsMap = actionMethodsMap;
    }

    execActions(actions: Action[]): void {
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
