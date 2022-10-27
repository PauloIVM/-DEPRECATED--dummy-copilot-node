import { Key } from "../types/shortcut";

export class KeyComparatorUtil {
    static contains(keysA: Key[], keysB: Key[]): boolean {
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

    static hasSameLength(keysA: Key[], keysB: Key[]): boolean {
        return keysA.length === keysB.length;
    }

    static isValidKey(key: Key): boolean {
        if (!key?.clickType || !key.keyId) return false;
        if (key.clickType !== "down" && key.clickType !== "tap" && key.clickType !== "up") {
            return false;
        }
        return true;
    }

    private static isSameKey(keyA: Key, keyB: Key) {
        return keyA.keyId === keyB.keyId && keyA.clickType === keyB.clickType;
    }
}
