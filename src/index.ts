import DummyCopilot from "./services/dummy-copilot";
import Keyboard from "./lib/keylogger";
import { ShortcutsFileUtil } from "./utils/shortcuts-file-parser";
import shortcutsFile from "../shortcuts.config.json";

(function () {
    const dummyCopilot = new DummyCopilot(new Keyboard("event3"));
    dummyCopilot.startShortcutListener(ShortcutsFileUtil.parse(shortcutsFile));
})();
