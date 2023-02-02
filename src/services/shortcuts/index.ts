import { IShortcutsFile, ShortcutsFileFactory } from "@data-providers/shortcuts-file-parser";
import { Element } from "@common/utils/utility-types";
import { IShortcut } from "./interfaces";
import { Shortcut } from "./shortcut";

export class ShortcutsFactory {
    static create(): IShortcut[] {
        const file = ShortcutsFileFactory.create();
        return this.parseShortcuts(file.shortcuts);
    }

    private static parseShortcuts(shortcutsOnFile: IShortcutsFile["shortcuts"]): IShortcut[] {
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
    private static parseActions(
        actionsOnFile: Element<IShortcutsFile["shortcuts"]>["actions"],
    ): Shortcut["actions"] {
        const parsedActions = [];
        for (const action of actionsOnFile) {
            const { actionType, content, keys, configs, repeat = 1, clipIndex } = action;
            if (!actionType) {
                continue;
            }
            for (let index = 0; index < repeat; index++) {
                parsedActions.push({ actionType, content, keys, configs, clipIndex });
            }
        }
        return parsedActions;
    }

    private static parseTrigger(
        triggerOnFile: Element<IShortcutsFile["shortcuts"]>["trigger"],
    ): Shortcut["trigger"] {
        const parsedTrigger = [];
        for (const trigger of triggerOnFile) {
            if (!trigger) {
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

export { IShortcut };
