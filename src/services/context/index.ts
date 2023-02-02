import { Context } from "./context";
import { IContext } from "./interfaces";

export class ContextFactory {
    static create(): IContext {
        return new Context();
    }
}

export { IContext };
