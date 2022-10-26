import shortcutsFile from "./../../shortcuts.config.json";

export type ShortcutsFile = typeof shortcutsFile;

export interface Shortcut {
    // TODO: O trigger é só "down" | "up"... preciso implementar um parser do JSON que
    // converta o "tap".
    trigger: Key[];
    actions: Action[];
}

export interface Action {
    actionType: "sequence" | "paste";
    content?: string;
    keys?: Key[];
}

export interface Key {
    keyId: string;
    clickType: "down" | "up" | "tap";
}
