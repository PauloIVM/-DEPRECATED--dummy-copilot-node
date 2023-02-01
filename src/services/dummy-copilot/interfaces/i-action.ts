import { IKey } from "./i-key";

export interface IAction {
    actionType: "sequence" | "paste" | "retrieve_clipboard" | "feed_clipboard";
    clipIndex?: number;
    content?: string;
    keys?: IKey<"down" | "up" | "tap">[];
    configs?: "clipboard" | "robot";
}
