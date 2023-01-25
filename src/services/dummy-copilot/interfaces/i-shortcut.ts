import { IAction } from "./i-action";
import { IKey } from "./i-key";

export interface IShortcut {
    getActions(): IAction[];
    getTrigger(): IKey<"down" | "up">[];
    pushAction(action: IAction): boolean;
    setActions(action: IAction[]): boolean;
    setTrigger(trigger: IKey<"down" | "up">[]): boolean;
    hasTrigger(keysQueue: IKey<string>[]): boolean;
}
