import { Action, Shortcut, TriggerKey } from "../../types/shortcut";
import { KeyEvent, Keylogger } from "../../types/keylogger";
import { KeyComparatorUtil } from "../../utils/key-comparator";
import robot from "robotjs";

export default class DummyCopilot {
    private shortcuts: Shortcut[];
    private readonly keylogger: Keylogger;
    private keysClickedQueue: TriggerKey[] = [];

    constructor(keylogger: DummyCopilot["keylogger"]) {
        this.keylogger = keylogger;
    }

    startKeyListener(
        onClickUpKey?: (_: KeyEvent) => void,
        onClickDownKey?: (_: KeyEvent) => void,
    ): void {
        this.keylogger.on("up", onClickUpKey);
        this.keylogger.on("down", onClickDownKey);
    }

    startShortcutListener(): void {
        this.keylogger.on("up", this.onClickKey.bind(this));
        this.keylogger.on("down", this.onClickKey.bind(this));
    }

    setShortcutsFile(shortcuts: DummyCopilot["shortcuts"]): void {
        this.shortcuts = shortcuts;
    }

    setDelay(delayBetweenClicks: number): void {
        robot.setKeyboardDelay(delayBetweenClicks);
    }

    private onClickKey({ keyId, clickType }: KeyEvent) {
        this.keysClickedQueue.push({ keyId, clickType });

        const shortcut = this.shortcuts.find((element) => {
            return KeyComparatorUtil.contains(element.trigger, this.keysClickedQueue);
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
