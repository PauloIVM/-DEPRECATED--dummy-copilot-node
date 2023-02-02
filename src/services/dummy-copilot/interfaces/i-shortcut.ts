import { IAction, IKey } from "@common/interfaces";

export interface IShortcut {
    getActions(): IAction[];
    getTrigger(): IKey<"down" | "up">[];
    pushAction(action: IAction): boolean;
    setActions(action: IAction[]): boolean;
    setTrigger(trigger: IKey<"down" | "up">[]): boolean;
    hasTrigger(keysQueue: IKey<string>[]): boolean;
}
