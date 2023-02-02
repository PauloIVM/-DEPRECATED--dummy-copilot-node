import * as fs from "fs";
import { IShortcutsFile } from "./interfaces";
import { join as joinPath } from "path";

export class ShortcutsFileFactory {
    static create(): IShortcutsFile {
        try {
            const rawFile = fs
                .readFileSync(joinPath(process.cwd(), "shortcuts.config.json"))
                .toString();
            const file = JSON.parse(rawFile) as IShortcutsFile;
            // TODO: Validate and handle errors.
            if (!file?.shortcuts || !file.shortcuts.length || !Array.isArray(file.shortcuts)) {
                return;
            }
            return file;
        } catch (error) {
            // TODO: Validate and handle errors.
            return;
        }
    }
}

export { IShortcutsFile };
