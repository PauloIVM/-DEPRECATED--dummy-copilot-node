import Keyboard from "./lib/keylogger";
import { ShortcutsFileUtil } from "./utils/shortcuts-file-parser";
import ShortcutsManager from "./services/shortcuts-manager";
import shortcutsFile from "../shortcuts.config.json";

(function () {
    const shortcutsManager = new ShortcutsManager(
        ShortcutsFileUtil.parse(shortcutsFile),
        new Keyboard("event3"),
    );
    shortcutsManager.startShortcutListener();
})();
