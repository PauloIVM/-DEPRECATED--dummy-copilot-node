import * as fs from "fs";
import { Element } from "../../utils/utility-types";
import { IShortcut } from "../../services/dummy-copilot/i-shortcut";
import { IShortcutsFile } from "./i-shortcuts-file";
import { KeyComparatorUtil } from "../../utils/key-comparator";
import { Shortcut } from "./shortcut";
import { join as joinPath } from "path";

export class ShortcutsFileParser {
    parse(): IShortcut[] {
        try {
            const rawFile = fs
                .readFileSync(joinPath(process.cwd(), "shortcuts.config.json"))
                .toString();
            const file = JSON.parse(rawFile) as IShortcutsFile;
            if (!file?.shortcuts || !file.shortcuts.length || !Array.isArray(file.shortcuts)) {
                return;
            }
            return this.parseShortcuts(file.shortcuts);
        } catch (error) {
            // TODO: Validate and handle errors.
            return [];
        }
    }

    private parseShortcuts(shortcutsOnFile: IShortcutsFile["shortcuts"]): IShortcut[] {
        const parsedShortcuts: IShortcut[] = [];
        for (const shortcutOnFile of shortcutsOnFile) {
            const shortcut: IShortcut = new Shortcut();
            const trigger = this.parseTrigger(shortcutOnFile?.trigger || []);
            const actions = this.parseActions(shortcutOnFile?.actions || []);
            if (!trigger?.length || !actions?.length) {
                continue;
            }
            shortcut.setTrigger(trigger);
            shortcut.setActions(actions);
            parsedShortcuts.push(shortcut);
        }
        return parsedShortcuts;
    }

    // eslint-disable-next-line complexity
    private parseActions(
        actionsOnFile: Element<IShortcutsFile["shortcuts"]>["actions"],
    ): Shortcut["actions"] {
        const parsedActions = [];
        for (const action of actionsOnFile) {
            const { actionType, content, keys } = action;
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

    private parseTrigger(
        triggerOnFile: Element<IShortcutsFile["shortcuts"]>["trigger"],
    ): Shortcut["trigger"] {
        const parsedTrigger = [];
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
            parsedTrigger.push({ clickType, keyId });
        }
        return parsedTrigger;
    }
}
