import { contains, hasSameLength } from "./utils";
import Keyboard from "./lib/keylogger";
import commands from "../commands.config.json";
import robot from "robotjs";

// TODO: Reescrever a lib em TS e arrumar tipagens
const k = new Keyboard("event3") as any;
let keyStack = [];

k.on("up", onClick);
k.on("down", onClick);

// k.on('up', console.log);
// k.on('down', console.log);
// k.on('hold', console.log);

function onClick({ keyId, type }) {
    keyStack.push({ keyId, clickType: type });

    const command = commands.shortcuts.find((cmd) => {
        return contains(cmd.trigger, keyStack);
    });

    if (!command) {
        keyStack = [];
        return;
    }
    if (hasSameLength(command.trigger, keyStack)) {
        execActions(command);
        keyStack = [];
    }
}

// TODO: Criar tipagens
function execActions(command) {
    for (const action of command.actions) {
        if (action.actionType === "sequence") {
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
            continue;
        }
        if (action.actionType === "paste") {
            robot.typeString(action.content);
            continue;
        }
    }
}
