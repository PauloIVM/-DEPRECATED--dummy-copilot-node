import Keyboard from "./lib/keylogger";
import shortcutsFile from "../shortcuts.config.json";
import ShortcutsManager from "./services/shortcuts-manager";
import { ShortcutsFileUtil } from "./utils/shortcuts-file-parser";

(function() {
    const shortcutsManager = new ShortcutsManager(
        ShortcutsFileUtil.parse(shortcutsFile),
        new Keyboard("event3")
    );
    shortcutsManager.startShortcutListener();
})();
