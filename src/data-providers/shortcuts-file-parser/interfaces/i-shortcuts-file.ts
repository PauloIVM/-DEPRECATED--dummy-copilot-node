export interface IShortcutsFile {
    shortcuts: {
        trigger: {
            keyId: string;
            clickType: string;
        }[];
        actions: {
            actionType: string;
            keys: {
                keyId: string;
                clickType: string;
            }[];
            content?: string;
            configs?: string;
            repeat?: number;
        }[];
    }[];
}
