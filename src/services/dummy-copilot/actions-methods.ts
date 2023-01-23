import { Action } from "../../types/shortcut";
import clipboard from "copy-paste";
import robot from "robotjs";

export const actionsMethods = {
    copyPasteClipboard: function execClipboardCopyPasteAction(
        action: Action,
        next: () => void,
    ): void {
        if (!action?.content) {
            return;
        }

        clipboard.copy(action.content, function () {
            robot.keyToggle("control", "down");
            robot.keyToggle("v", "down");
            robot.keyToggle("control", "up");
            robot.keyToggle("v", "up");
            next();
        });
    },

    sequence: function execSequenceAction(action: Action, next: () => void): void {
        if (!action?.keys) {
            return;
        }
        const clickTypeMethods = {
            tap: (value: string) => {
                robot.keyTap(value);
            },
            down: (value: string) => {
                robot.keyToggle(value, "down");
            },
            up: (value: string) => {
                robot.keyToggle(value, "up");
            },
        };
        action.keys.forEach(({ keyId, clickType }) => {
            clickTypeMethods[clickType](keyId);
        });
        next();
    },

    paste: function execPasteAction(action: Action, next: () => void): void {
        if (!action?.content) {
            return;
        }
        robot.typeString(action.content);
        next();
    },
};
