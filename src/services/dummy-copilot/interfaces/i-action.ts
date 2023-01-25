import { IKey } from "./i-key";

export interface IAction {
    actionType: "sequence" | "paste" | "copyPasteClipboard";
    content?: string;
    keys?: IKey<"down" | "up" | "tap">[];
}
