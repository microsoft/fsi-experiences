declare class ReaderResponse implements ControlAndClientApiInterfaces.ReaderResponse {
    readonly done: boolean;
    readonly value: Uint8Array;
    constructor(done: boolean, value: Uint8Array);
}
export { ReaderResponse };
