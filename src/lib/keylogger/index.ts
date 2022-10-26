/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EventEmitter } from "events";
import fs from "fs";
import toKey from "./keycodes";

const EVENT_TYPES = ["up", "down", "hold"];
const EV_KEY = 1;

interface KeyEvent {
    timeS: number;
    timeMS: number;
    keyCode: number;
    keyId: string;
    type: string;
    device: string;
}

class Keyboard extends EventEmitter {
    private readonly device: string;
    private readonly bufferSize: number;
    private readonly buffer: Buffer;
    private readonly data: fs.ReadStream;

    constructor(dev: string) {
        super();
        this.device = dev || "event0";
        this.bufferSize = 24;
        this.buffer = Buffer.alloc(this.bufferSize);
        this.data = fs.createReadStream("/dev/input/".concat(this.device));
        this.onRead();
    }

    onRead(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        this.data.on("data", function (data) {
            // TODO: Aqui deveria ser o self.buffer. Parece que o alloc é desnecessário?
            this.buffer = data.slice(24);
            if (this.buffer.readUInt16LE(16) !== EV_KEY) {
                return;
            }
            const event = self.parse(this.buffer);
            self.emit(event.type, event);
        });

        this.data.on("error", function (err) {
            self.emit("error", err);
            throw err;
        });
    }

    parse(buffer: Buffer): Partial<KeyEvent> {
        return {
            timeS: buffer.readUInt16LE(0),
            timeMS: buffer.readUInt16LE(8),
            keyCode: buffer.readUInt16LE(18),
            keyId: toKey[buffer.readUInt16LE(18)],
            type: EVENT_TYPES[buffer.readUInt32LE(20)],
            device: this.device,
        };
    }
}

export default Keyboard;
