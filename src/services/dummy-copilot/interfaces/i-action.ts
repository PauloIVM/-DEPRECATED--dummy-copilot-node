import { IKey } from "./i-key";

export interface IAction {
    actionType: "sequence" | "paste";
    content?: string;
    keys?: IKey<"down" | "up" | "tap">[];
    configs?: "clipboard" | "robot";
}
