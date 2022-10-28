import { Key, Shortcut, ShortcutsFile } from "../types/shortcut";
import { KeyComparatorUtil } from "./key-comparator";

export class ShortcutsFileUtil {
    static parse(file: ShortcutsFile): Shortcut[] {
        if (!file?.shortcuts || !file.shortcuts.length || !Array.isArray(file.shortcuts)) {
            return;
        }

        return this.parseShortcuts(file.shortcuts as Shortcut[]);
    }

    private static parseShortcuts(shortcutsOnFile: Shortcut[]): Shortcut[] {
        const parsedShortcuts: Shortcut[] = [];
        for (const shortcut of shortcutsOnFile) {
            const trigger = this.parseTrigger(shortcut?.trigger || []);
            const actions = this.parseActions((shortcut?.actions || []) as Shortcut["actions"]);
            if (!trigger?.length || !actions?.length) {
                continue;
            }
            parsedShortcuts.push({ trigger, actions });
        }
        return parsedShortcuts;
    }

    // eslint-disable-next-line complexity
    private static parseActions(actionsOnFile: Shortcut["actions"]): Shortcut["actions"] {
        const parsedActions: Shortcut["actions"] = [];
        for (const action of actionsOnFile) {
            const { actionType, content, keys } = action;
            // TODO: Create 'isValidAction' util:
            if (!actionType) {
                continue;
            }
            if (!content && (!keys || !Array.isArray(keys) || !keys.length)) {
                continue;
            }
            if (keys && keys.some((el) => !KeyComparatorUtil.isValidKey(el))) {
                continue;
            }
            parsedActions.push({ actionType, content, keys });
        }
        return parsedActions;
    }

    private static parseTrigger(
        triggerOnFile: { keyId: string; clickType: string }[],
    ): Shortcut["trigger"] {
        const parsedTrigger: Shortcut["trigger"] = [];
        for (const trigger of triggerOnFile) {
            if (!KeyComparatorUtil.isValidKey(trigger as Key)) {
                continue;
            }
            const { clickType, keyId } = trigger;
            if (clickType === "tap") {
                parsedTrigger.push({ clickType: "down", keyId });
                parsedTrigger.push({ clickType: "up", keyId });
                continue;
            }
            parsedTrigger.push({ clickType, keyId } as Key);
        }
        return parsedTrigger;
    }
}
