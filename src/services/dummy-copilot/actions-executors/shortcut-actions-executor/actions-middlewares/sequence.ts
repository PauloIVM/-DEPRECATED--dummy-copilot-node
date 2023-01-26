import { IAction } from "../../../interfaces/i-action";
import { IActionMiddleware } from "../../abstract-actions-executor/interfaces/i-action-middleware";
import robot from "robotjs";

export class SequenceAction implements IActionMiddleware {
    private readonly name: IAction["actionType"] = "sequence";

    getName(): IAction["actionType"] {
        return this.name;
    }

    exec(action: IAction, next: () => void): void {
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
    }
}
