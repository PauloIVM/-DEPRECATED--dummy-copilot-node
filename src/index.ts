import DummyCopilot from "./services/dummy-copilot";
import Keyboard from "./lib/keylogger";
import { ShortcutsFileParser } from "./data-providers/shortcuts-file-parser/shortcuts-file-parser";

(function () {
    const dummyCopilot = new DummyCopilot(new Keyboard("event3"));
    dummyCopilot.setShortcutsFile(new ShortcutsFileParser().parse());
    dummyCopilot.startShortcutListener();
})();
