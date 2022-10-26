import { contains, hasSameLength } from "./utils";
import { Shortcut, Action, Key } from "./types/shortcut";
import Keyboard from "./lib/keylogger";
import shortcutsFile from "../shortcuts.config.json";
import robot from "robotjs";

const k = new Keyboard("event3");
k.on("up", onClick);
k.on("down", onClick);

let keysClickedQueue: Key[] = [];

function onClick({ keyId, type }) {
    keysClickedQueue.push({ keyId, clickType: type });

    // TODO: Criar parser e validador do arquivo de entrada:
    const shortcut = shortcutsFile.shortcuts.find((cmd) => {
        return contains(cmd.trigger as Key[], keysClickedQueue);
    }) as Shortcut;

    if (!shortcut) {
        keysClickedQueue = [];
        return;
    }

    if (hasSameLength(shortcut.trigger, keysClickedQueue)) {
        _execActions(shortcut.actions);
        keysClickedQueue = [];
    }
}

function _execActions(actions: Shortcut["actions"]) {
    for (const action of actions) {
        if (action.actionType === "sequence") {
            _execSequenceAction(action);
            continue;
        }
        if (action.actionType === "paste") {
            _execPasteAction(action);
            continue;
        }
    }
}

function _execSequenceAction(action: Action) {
    if (!action?.keys) {
        // TODO: Adicionar throw??
        return;
    }
    action.keys.forEach((key) => {
        const value = key.keyId;
        if (key.clickType === "tap") {
            robot.keyTap(value);
        }
        if (key.clickType === "down") {
            robot.keyToggle(value, "down");
        }
        if (key.clickType === "up") {
            robot.keyToggle(value, "up");
        }
    });
}

function _execPasteAction(action: Action) {
    if (!action?.content) {
        return;
    }
    robot.typeString(action.content);
}
