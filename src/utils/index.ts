import { Key } from "../types/shortcut";

export function contains(arrayA: Key[], arrayB: Key[]): boolean {
    for (let index = 0; index < arrayA.length; index++) {
        const elementA = arrayA[index];
        const elementB = arrayB[index];
        if (!elementA || !elementB) {
            continue;
        }

        if (!_isSameKey(elementA, elementB)) {
            return false;
        }
    }
    return true;
}

export function hasSameLength<T>(arrayA: Array<T>, arrayB: Array<T>): boolean {
    return arrayA.length === arrayB.length;
}

function _isSameKey(keyA: Key, keyB: Key) {
    return keyA.keyId === keyB.keyId && keyA.clickType === keyB.clickType;
}
