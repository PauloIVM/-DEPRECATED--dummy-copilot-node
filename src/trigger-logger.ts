import DummyCopilot from "./services/dummy-copilot";
import { IKeyEvent } from "./services/dummy-copilot/interfaces/i-key-event";
import Keyboard from "./lib/keylogger";

(function () {
    const dummyCopilot = new DummyCopilot([new Keyboard("event21"), new Keyboard("event3")]);
    let trigger = [];
    console.log("TYPE YOUR TRIGGER AND AFTER TYPE 'ESCAPE' TO FINISH:");
    const onClick = (keyEvent: IKeyEvent) => {
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
    dummyCopilot.startKeyListener(onClick, onClick);
})();
