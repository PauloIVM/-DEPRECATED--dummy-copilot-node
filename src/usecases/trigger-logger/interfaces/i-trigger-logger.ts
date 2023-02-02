import { IKeyEvent } from "@services/keylistener";

export interface ITriggerLogger {
    startKeyListener(onClickUpKey?: OnClickMethod, onClickDownKey?: OnClickMethod): void;
}

type OnClickMethod = (_: IKeyEvent) => void;
