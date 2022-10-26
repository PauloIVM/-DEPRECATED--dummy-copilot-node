import { KeyComparatorUtil } from "../../utils/key-comparator";
import { Shortcut, Action, Key } from "../../types/shortcut";
import { ShortcutsFile } from "../../types/shortcut";
import { Keylogger, KeyEvent } from "../../types/keylogger";
import robot from "robotjs";

export default class ShortcutsManager {
    private shortcutsFile: ShortcutsFile;
    private keylogger: Keylogger;
    private keysClickedQueue: Key[] = [];

    constructor(
        shortcutsFile: ShortcutsManager["shortcutsFile"],
        keylogger: ShortcutsManager["keylogger"],
    ) {
        this.keylogger = keylogger;
        this.shortcutsFile = shortcutsFile;
    }

    startShortcutListener() {
        this.keylogger.on("up", this.onClickKey.bind(this));
        this.keylogger.on("down", this.onClickKey.bind(this));
    }

    private onClickKey({ keyId, clickType }: KeyEvent) {
        this.keysClickedQueue.push({ keyId, clickType });

        // TODO: Criar parser e validador do arquivo de entrada:
        const shortcut = this.shortcutsFile.shortcuts.find((cmd) => {
            return KeyComparatorUtil.contains(cmd.trigger as Key[], this.keysClickedQueue);
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
            "sequence": this.execSequenceAction,
            "paste": this.execPasteAction,
        }
        for (const action of actions) {
            actionTypeMethods[action.actionType](action);
        }
    }

    private execSequenceAction(action: Action) {
        if (!action?.keys) {
            return;
        }
        const clickTypeMethods = {
            "tap": (value: string) => { robot.keyTap(value) },
            "down": (value: string) => { robot.keyToggle(value, "down") },
            "up": (value: string) => { robot.keyToggle(value, "up") },
        }
        action.keys.forEach(({ keyId, clickType }) => { clickTypeMethods[clickType](keyId) });
    }

    private execPasteAction(action: Action) {
        if (!action?.content) {
            return;
        }
        robot.typeString(action.content);
    }
}
