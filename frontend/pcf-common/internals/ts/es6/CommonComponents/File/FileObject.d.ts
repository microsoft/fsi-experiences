declare class FileObject implements ControlAndClientApiInterfaces.FileObject {
    readonly fileContent: string;
    readonly fileName: string;
    readonly fileSize: number;
    readonly mimeType: string;
    readonly fileUrl?: string;
    readonly version?: number;
    private readonly _file;
    constructor(file: File);
    getBinaryReader(chunkSize: number): ControlAndClientApiInterfaces.FileObjectReader;
}
export { FileObject };
