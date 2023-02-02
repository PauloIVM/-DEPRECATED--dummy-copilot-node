import { IAction } from "@common/interfaces";

export interface IActionsExecutor {
    exec(actions: IAction[]): void;
}
