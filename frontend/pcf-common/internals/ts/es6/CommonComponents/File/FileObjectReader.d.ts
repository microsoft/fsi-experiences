declare class FileObjectReader implements ControlAndClientApiInterfaces.FileObjectReader {
    private _file;
    private _chunkSize;
    private _currentIndex;
    constructor(file: File, chunkSize?: number);
    getCurrentIndex(): number;
    read(): Promise<ControlAndClientApiInterfaces.ReaderResponse>;
}
export { FileObjectReader };
