/* eslint-disable @typescript-eslint/no-magic-numbers */
import { IKeyEvent, IKeylistener } from "./interfaces";
import { EventEmitter } from "events";
import fs from "fs";
import toKey from "./keycodes";

const EVENT_TYPES = ["up", "down", "hold"];
const EV_KEY = 1;

export class Keylistener extends EventEmitter implements IKeylistener {
    private readonly device: string;
    private readonly data: fs.ReadStream;

    constructor(dev: string) {
        super();
        this.device = dev || "event0";
        this.data = fs.createReadStream("/dev/input/".concat(this.device));
        this.onRead();
    }

    private onRead(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        this.data.on("data", function (data) {
            const buffer = data.slice(24) as Buffer;
            if (buffer.readUInt16LE(16) !== EV_KEY) {
                return;
            }
            const event = self.parse(buffer);
            self.emit(event.clickType, event);
        });

        this.data.on("error", function (err) {
            self.emit("error", err);
            throw err;
        });
    }

    private parse(buffer: Buffer): Partial<IKeyEvent> {
        return {
            timeS: buffer.readUInt16LE(0),
            timeMS: buffer.readUInt16LE(8),
            keyCode: buffer.readUInt16LE(18),
            keyId: toKey[buffer.readUInt16LE(18)],
            clickType: EVENT_TYPES[buffer.readUInt32LE(20)] as IKeyEvent["clickType"],
            device: this.device,
        };
    }
}
