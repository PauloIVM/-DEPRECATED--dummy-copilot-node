import { IAction } from "@common/interfaces";

export interface IActionMiddleware {
    getName(): IAction["actionType"];
    exec(action: IAction, next: () => void): void;
}
