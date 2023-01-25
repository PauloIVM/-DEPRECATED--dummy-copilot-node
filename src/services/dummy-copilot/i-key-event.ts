export interface IKeyEvent {
    timeS: number;
    timeMS: number;
    keyCode: number;
    keyId: string;
    clickType: "down" | "up";
    device: string;
}
