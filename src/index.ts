import Keyboard from "./lib/keylogger";
import { ShortcutsFileUtil } from "./utils/shortcuts-file-parser";
import ShortcutsManager from "./services/shortcuts-manager";
import shortcutsFile from "../shortcuts.config.json";

(function () {
    const shortcutsManager = new ShortcutsManager(new Keyboard("event3"));
    shortcutsManager.startShortcutListener(ShortcutsFileUtil.parse(shortcutsFile));
})();
