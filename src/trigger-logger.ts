import DummyCopilot from "./services/dummy-copilot";
import { IKeyEvent } from "@services/keylistener/interfaces";
import { Keylistener } from "@services/keylistener";

(function () {
    const dummyCopilot = new DummyCopilot([new Keylistener("event21"), new Keylistener("event3")]);
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
