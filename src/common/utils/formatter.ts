export class Formatter {
    static pretty<T>(entry: T): string {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return JSON.stringify(entry, undefined, 2);
    }
}
