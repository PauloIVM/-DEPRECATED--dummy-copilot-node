import { IAction } from "../interfaces/i-action";
import { IActionMiddleware } from "../interfaces/i-action-middleware";
import clipboard from "copy-paste";
import robot from "robotjs";

export class PasteAction implements IActionMiddleware {
    private readonly name: IAction["actionType"] = "paste";

    getName(): IAction["actionType"] {
        return this.name;
    }

    exec(action: IAction, next: () => void): void {
        if (!action?.content) {
            return;
        }

        if (action?.configs === "robot") {
            this.pasteRobot(action.content);
            next();
            return;
        }

        let curr = "";
        try {
            curr = clipboard.paste();
        } catch (error) {
            // INFO: If this error persists, try implement a lib with 'xsel' instead 'xclip', see:
            // https://github.com/neovim/neovim/issues/2642
            console.error("ERROR ON PASTE CLIPBOARD");
            console.error(error);
            curr = "";
        }
        clipboard.copy(action.content, () => {
            this.paste();
            clipboard.copy(curr, () => {
                next();
            });
        });
    }

    private paste() {
        robot.keyToggle("control", "down");
        robot.keyToggle("v", "down");
        robot.keyToggle("control", "up");
        robot.keyToggle("v", "up");
    }

    private pasteRobot(content: string) {
        robot.typeString(content);
    }
}
