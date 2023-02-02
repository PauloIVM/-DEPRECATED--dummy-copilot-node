export interface IContext {
    getClipElement(index: number): string;
    setClipElement(index: number, content: string): boolean;
}
