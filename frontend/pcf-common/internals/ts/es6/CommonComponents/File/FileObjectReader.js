import { ReaderResponse } from "./ReaderResponse";
import { MIN_CHUNK_SIZE } from "./FileObjectReaderConstants";
var FileObjectReader = (function () {
    function FileObjectReader(file, chunkSize) {
        this._file = file;
        this._currentIndex = 0;
        if (!chunkSize || chunkSize < MIN_CHUNK_SIZE) {
            chunkSize = MIN_CHUNK_SIZE;
        }
        this._chunkSize = Math.floor(chunkSize);
    }
    FileObjectReader.prototype.getCurrentIndex = function () {
        return this._currentIndex;
    };
    FileObjectReader.prototype.read = function () {
        var reader = this;
        var promise = new Promise(function (resolve) {
            if (!reader._file || reader._currentIndex >= reader._file.size) {
                resolve(new ReaderResponse(true, null));
                return;
            }
            var endIndex = reader._currentIndex + reader._chunkSize > reader._file.size
                ? reader._file.size
                : reader._currentIndex + reader._chunkSize;
            var currentBlob = reader._file.slice(reader._currentIndex, endIndex);
            var fileReader = new FileReader();
            if (fileReader._realReader) {
                fileReader = fileReader._realReader;
            }
            fileReader.addEventListener("loadend", function () {
                reader._currentIndex = endIndex;
                var buffer = fileReader.result;
                var fileContent = new Uint8Array(buffer);
                resolve(new ReaderResponse(false, fileContent));
            });
            fileReader.readAsArrayBuffer(currentBlob);
        });
        return promise;
    };
    return FileObjectReader;
}());
export { FileObjectReader };
