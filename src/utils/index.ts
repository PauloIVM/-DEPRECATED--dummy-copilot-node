// eslint-disable-next-line complexity
export function contains(arrayA, arrayB): boolean {
    for (let index = 0; index < arrayA.length; index++) {
        const elementA = arrayA[index];
        const elementB = arrayB[index];
        if (!elementA || !elementB) {
            continue;
        }

        if (elementA.keyId !== elementB.keyId || elementA.type !== elementB.type) {
            return false;
        }
    }
    return true;
}

export function hasSameLength(arrayA, arrayB): boolean {
    return arrayA.length === arrayB.length;
}
