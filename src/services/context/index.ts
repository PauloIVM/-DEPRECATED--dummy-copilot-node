import { Context } from "./context";
import { IContext } from "./interfaces";
import { IFactory } from "@common/interfaces";

export class ContextFactory implements IFactory<void, IContext> {
    create(): IContext {
        return new Context();
    }
}

export { IContext };
