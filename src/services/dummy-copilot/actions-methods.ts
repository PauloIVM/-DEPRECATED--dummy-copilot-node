import { IAction } from "./i-action";
import clipboard from "copy-paste";
import robot from "robotjs";

export const actionsMethods = {
    copyPasteClipboard: function execClipboardCopyPasteAction(
        action: IAction,
        next: () => void,
    ): void {
        if (!action?.content) {
            return;
        }

        const curr = clipboard.paste();
        clipboard.copy(action.content, () => {
            robot.keyToggle("control", "down");
            robot.keyToggle("v", "down");
            robot.keyToggle("control", "up");
            robot.keyToggle("v", "up");
            clipboard.copy(curr, () => {
                next();
            });
        });
    },

    sequence: function execSequenceAction(action: IAction, next: () => void): void {
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

    paste: function execPasteAction(action: IAction, next: () => void): void {
        if (!action?.content) {
            return;
        }
        robot.typeString(action.content);
        next();
    },
};
