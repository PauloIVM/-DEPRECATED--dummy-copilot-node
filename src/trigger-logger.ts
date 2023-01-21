import { KeyEvent } from "./types/keylogger";
import Keyboard from "./lib/keylogger";
import { ShortcutsFileUtil } from "./utils/shortcuts-file-parser";
import ShortcutsManager from "./services/shortcuts-manager";
import shortcutsFile from "../shortcuts.config.json";

(function () {
    const shortcutsManager = new ShortcutsManager(
        // TODO: Desacoplar para eu conseguir usar isso sem ter que passar esse file.
        ShortcutsFileUtil.parse(shortcutsFile),
        new Keyboard("event3"),
    );
    let trigger = [];
    console.log("TYPE YOUR TRIGGER AND AFTER TYPE 'ESCAPE' TO FINISH:");
    const onClick = (keyEvent: KeyEvent) => {
        if (keyEvent.keyId === "escape") {
            if (trigger.length) {
                console.log("YOUR TRIGGER:");
                console.log(trigger);
                console.log("TYPE A NEW TRIGGER AND AFTER TYPE 'ESCAPE' TO FINISH:");
            }
            trigger = [];
            return;
        }
        trigger.push({
            keyId: keyEvent.keyId,
            clickType: keyEvent.clickType,
        });
    };
    shortcutsManager.startShortcutListener(onClick, onClick);
})();
