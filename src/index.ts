import Keyboard from "./lib/keylogger";
import shortcutsFile from "../shortcuts.config.json";
import ShortcutsManager from "./services/shortcuts-manager";

(function() {
    const shortcutsManager = new ShortcutsManager(
        shortcutsFile,
        new Keyboard("event3", "linux")
    );
    shortcutsManager.startShortcutListener();
})();
