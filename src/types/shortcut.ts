import shortcutsFile from "./../../shortcuts.config.json";

export type ShortcutsFile = typeof shortcutsFile;

export interface Shortcut {
    trigger: TriggerKey[];
    actions: Action[];
}

export interface Action {
    actionType: "sequence" | "paste" | "copyPasteClipboard";
    content?: string;
    keys?: ActionKey[];
}

export interface Key<T extends string> {
    keyId: string;
    clickType: T;
}

export type ActionKey = Key<"down" | "up" | "tap">;

export type TriggerKey = Key<"down" | "up">;
