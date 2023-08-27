import { FileObjectReader } from "./FileObjectReader";
var FileObject = (function () {
    function FileObject(file) {
        this._file = file;
        this.fileName = file.name;
        this.fileSize = file.size;
        this.mimeType = file.type;
        this.fileUrl = URL.createObjectURL && URL.createObjectURL(this._file);
        this.version = Date.now();
    }
    FileObject.prototype.getBinaryReader = function (chunkSize) {
        return new FileObjectReader(this._file, chunkSize);
    };
    return FileObject;
}());
export { FileObject };
