import { IAction } from "./i-action";

export interface IActionsExecutor {
    exec(actions: IAction[]): void;
}
