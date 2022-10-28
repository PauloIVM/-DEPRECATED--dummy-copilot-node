import { Action, Shortcut, TriggerKey } from "../../types/shortcut";
import { KeyEvent, Keylogger } from "../../types/keylogger";
import { KeyComparatorUtil } from "../../utils/key-comparator";
import robot from "robotjs";

export default class ShortcutsManager {
    private readonly shortcuts: Shortcut[];
    private readonly keylogger: Keylogger;
    private keysClickedQueue: TriggerKey[] = [];

    constructor(
        shortcuts: ShortcutsManager["shortcuts"],
        keylogger: ShortcutsManager["keylogger"],
    ) {
        this.keylogger = keylogger;
        this.shortcuts = shortcuts;
    }

    startShortcutListener(): void {
        this.keylogger.on("up", this.onClickKey.bind(this));
        this.keylogger.on("down", this.onClickKey.bind(this));
    }

    private onClickKey({ keyId, clickType }: KeyEvent) {
        this.keysClickedQueue.push({ keyId, clickType });

        const shortcut = this.shortcuts.find((cmd) => {
            return KeyComparatorUtil.contains(cmd.trigger, this.keysClickedQueue);
        }) as Shortcut;

        if (!shortcut) {
            this.keysClickedQueue = [];
            return;
        }

        if (KeyComparatorUtil.hasSameLength(shortcut.trigger, this.keysClickedQueue)) {
            this.execActions(shortcut.actions);
            this.keysClickedQueue = [];
        }
    }

    private execActions(actions: Shortcut["actions"]) {
        const actionTypeMethods = {
            sequence: this.execSequenceAction,
            paste: this.execPasteAction,
        };

        for (const action of actions) {
            actionTypeMethods[action.actionType](action);
        }
    }

    private execSequenceAction(action: Action) {
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
    }

    private execPasteAction(action: Action) {
        if (!action?.content) {
            return;
        }
        robot.typeString(action.content);
    }
}
