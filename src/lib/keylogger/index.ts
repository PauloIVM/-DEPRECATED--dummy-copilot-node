/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EventEmitter } from "events";
import fs from "fs";
import toKey from "./keycodes";

const EVENT_TYPES = ["up", "down", "hold"];
const EV_KEY = 1;

class Keyboard extends EventEmitter {
    // Por algum motivo esse cara buga o build:
    dev: string;
    bufferSize: number;
    buffer: Buffer;
    data: fs.ReadStream;

    constructor(dev: string) {
        super();
        this.dev = dev || "event0";
        this.bufferSize = 24;
        // Testar:
        // this.buffer = Buffer.alloc(this.bufferSize);
        this.buffer = new Buffer(this.bufferSize);
        this.data = fs.createReadStream("/dev/input/".concat(this.dev));
        this.onRead();
        // this.emit("ready");
    }
    onRead() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        this.data.on("data", function (data) {
            this.buffer = data.slice(24);
            const event = self.parse(this, this.buffer);
            if (event) {
                event.dev = self.dev;
                self.emit(event.type, event);
            }
        });

        this.data.on("error", function (err) {
            self.emit("error", err);
            throw err;
        });
    }

    parse(input, buffer) {
        let event;
        if (buffer.readUInt16LE(16) === EV_KEY) {
            event = {
                timeS: buffer.readUInt16LE(0),
                timeMS: buffer.readUInt16LE(8),
                keyCode: buffer.readUInt16LE(18),
            };
            event.keyId = toKey[event.keyCode];
            event.type = EVENT_TYPES[buffer.readUInt32LE(20)];
        }
        return event;
    }
}

// function Keyboard(dev) {
//     this.dev = dev || "event0";
//     this.bufferSize = 24;
//     this.buffer = new Buffer(this.bufferSize);
//     this.data = fs.createReadStream("/dev/input/".concat(this.dev));
//     this.onRead();
// }

// Keyboard.prototype = Object.create(EventEmitter.prototype, {
//     constructor: { value: Keyboard },
// });

// Keyboard.prototype.onRead = function onRead() {
//     // eslint-disable-next-line @typescript-eslint/no-this-alias
//     const self = this;

//     this.data.on("data", function (data) {
//         this.buffer = data.slice(24);
//         const event = parse(this, this.buffer);
//         if (event) {
//             event.dev = self.dev;
//             self.emit(event.type, event);
//         }
//     });

//     this.data.on("error", function (err) {
//         self.emit("error", err);
//         throw new Error(err);
//     });
// };

// function parse(input, buffer) {
//     let event;
//     if (buffer.readUInt16LE(16) === EV_KEY) {
//         event = {
//             timeS: buffer.readUInt16LE(0),
//             timeMS: buffer.readUInt16LE(8),
//             keyCode: buffer.readUInt16LE(18),
//         };
//         event.keyId = toKey[event.keyCode];
//         event.type = EVENT_TYPES[buffer.readUInt32LE(20)];
//     }
//     return event;
// }

// Keyboard.Keys = toKey;
export default Keyboard;
