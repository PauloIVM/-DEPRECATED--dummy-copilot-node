import { Key } from "../types/shortcut";

export class KeyComparatorUtil {
    static contains<T extends string>(keysA: Key<T>[], keysB: Key<T>[]): boolean {
        for (let index = 0; index < keysA.length; index++) {
            const elementA = keysA[index];
            const elementB = keysB[index];
            if (!elementA || !elementB) {
                continue;
            }

            if (!this.isSameKey(elementA, elementB)) {
                return false;
            }
        }
        return true;
    }

    static hasSameLength<T extends string>(keysA: Key<T>[], keysB: Key<T>[]): boolean {
        return keysA.length === keysB.length;
    }

    static isValidKey<T extends string>(key: Key<T>): boolean {
        if (!key?.clickType || !key.keyId) {
            return false;
        }
        if (key.clickType !== "down" && key.clickType !== "tap" && key.clickType !== "up") {
            return false;
        }
        return true;
    }

    private static isSameKey<T extends string>(keyA: Key<T>, keyB: Key<T>) {
        return keyA.keyId === keyB.keyId && keyA.clickType === keyB.clickType;
    }
}
