import { Action, Shortcut, ShortcutsFile, TriggerKey } from "../types/shortcut";
import { KeyComparatorUtil } from "./key-comparator";

export class ShortcutsFileUtil {
    static parse(file: ShortcutsFile): Shortcut[] {
        if (!file?.shortcuts || !file.shortcuts.length || !Array.isArray(file.shortcuts)) {
            return;
        }

        return this.parseShortcuts(file.shortcuts);
    }

    private static parseShortcuts(shortcutsOnFile: ShortcutsFile["shortcuts"]): Shortcut[] {
        const parsedShortcuts: Shortcut[] = [];
        for (const shortcut of shortcutsOnFile) {
            const trigger = this.parseTrigger(shortcut?.trigger || []);
            const actions = this.parseActions(shortcut?.actions || []);
            if (!trigger?.length || !actions?.length) {
                continue;
            }
            parsedShortcuts.push({ trigger, actions });
        }
        return parsedShortcuts;
    }

    // eslint-disable-next-line complexity
    private static parseActions(
        actionsOnFile: ShortcutsFile["shortcuts"][0]["actions"],
    ): Shortcut["actions"] {
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
            parsedActions.push({ actionType, content, keys } as Action);
        }
        return parsedActions;
    }

    private static parseTrigger(
        triggerOnFile: ShortcutsFile["shortcuts"][0]["trigger"],
    ): Shortcut["trigger"] {
        const parsedTrigger: Shortcut["trigger"] = [];
        for (const trigger of triggerOnFile) {
            if (!KeyComparatorUtil.isValidKey(trigger)) {
                continue;
            }
            const { clickType, keyId } = trigger;
            if (clickType === "tap") {
                parsedTrigger.push({ clickType: "down", keyId });
                parsedTrigger.push({ clickType: "up", keyId });
                continue;
            }
            parsedTrigger.push({ clickType, keyId } as TriggerKey);
        }
        return parsedTrigger;
    }
}
