import { Element } from "../../utils/utility-types";
import { IAction } from "../../services/dummy-copilot/interfaces/i-action";
import { IKey } from "../../services/dummy-copilot/interfaces/i-key";
import { IShortcut } from "../../services/dummy-copilot/interfaces/i-shortcut";

export class Shortcut implements IShortcut {
    private trigger: IKey<"down" | "up">[] = [];
    private actions: IAction[] = [];
    private readonly validActionsTypes: IAction["actionType"][] = [
        "paste",
        "sequence",
        "feed_clipboard",
        "retrieve_clipboard",
    ];
    private readonly validActionsKeys: Element<IAction["keys"]>["clickType"][] = [
        "down",
        "up",
        "tap",
    ];
    private readonly validTriggerKeys: Element<Shortcut["trigger"]>["clickType"][] = ["down", "up"];

    getActions(): Shortcut["actions"] {
        return this.actions;
    }

    getTrigger(): Shortcut["trigger"] {
        return this.trigger;
    }

    setActions(actions: Shortcut["actions"]): boolean {
        let allSettled = true;
        this.actions = [];
        actions.forEach((action) => {
            const statement = this.pushAction(action);
            if (!statement) {
                allSettled = false;
            }
        });
        if (!allSettled) {
            this.actions = [];
        }
        return allSettled;
    }

    pushAction(action: Element<Shortcut["actions"]>): boolean {
        if (!this.validActionsTypes.includes(action.actionType)) {
            return false;
        }
        if (this.hasInvalidKeys(action.keys, this.validActionsKeys)) {
            return false;
        }
        this.actions.push(action);
        return true;
    }

    setTrigger(trigger: Shortcut["trigger"]): boolean {
        if (this.hasInvalidKeys(trigger, this.validTriggerKeys)) {
            return false;
        }
        this.trigger = trigger;
        return true;
    }

    hasTrigger(queueKeys: IKey<string>[]): boolean {
        for (let index = 0; index < this.trigger.length; index++) {
            const triggerKey = this.trigger[index];
            const queueKey = queueKeys[index];
            if (!triggerKey || !queueKey) {
                continue;
            }

            if (!this.isSameKey(triggerKey, queueKey)) {
                return false;
            }
        }
        return true;
    }

    private isSameKey<T extends string>(keyA: IKey<T>, keyB: IKey<T>) {
        return keyA.keyId === keyB.keyId && keyA.clickType === keyB.clickType;
    }

    private hasInvalidKeys<T extends string>(
        keys: IKey<T>[] | undefined,
        validValues: string[],
    ): boolean {
        return (
            keys?.length && !keys.every((key) => !!key.keyId && validValues.includes(key.clickType))
        );
    }
}
