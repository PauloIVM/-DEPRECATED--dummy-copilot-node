import { KeyEvent, Keylogger } from "../../types/keylogger";
import { Shortcut, TriggerKey } from "../../types/shortcut";
import ActionsExecutor from "./actions-executor";
import { KeyComparatorUtil } from "../../utils/key-comparator";
import { actionsMethods } from "./actions-methods";

export default class DummyCopilot {
    private shortcuts: Shortcut[];
    private readonly keylogger: Keylogger;
    private keysClickedQueue: TriggerKey[] = [];
    private readonly actionsExecutor: ActionsExecutor;

    constructor(keylogger: DummyCopilot["keylogger"]) {
        this.keylogger = keylogger;
        this.actionsExecutor = new ActionsExecutor(actionsMethods);
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

    // TODO: Handle this properly. Should be on actions-executor?
    // setDelay(delayBetweenClicks: number): void {
    //     robot.setKeyboardDelay(delayBetweenClicks);
    // }

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
            this.actionsExecutor.execActions(shortcut.actions);
            this.keysClickedQueue = [];
        }
    }
}
