import { IAction } from "./i-action";

export interface IActionMiddleware {
    getName(): IAction["actionType"];
    exec(action: IAction, next: () => void): void;
}
