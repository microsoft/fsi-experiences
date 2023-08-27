var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ComponentBase } from "./ComponentBase";
import * as ReactFela from "react-fela";
import { rules } from "./FelaConnectHelper";
var InnerFileInput = (function (_super) {
    __extends(InnerFileInput, _super);
    function InnerFileInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerFileInput.prototype.getElementName = function () {
        return "input";
    };
    InnerFileInput.prototype.getElementProps = function () {
        var _this = this;
        var props = {
            type: "file",
        };
        props.onKeyPress = function (e) {
            if ((_this.isEdge || _this.isIE) && e.key === "Enter") {
                var inputElement = e.target;
                inputElement.click();
            }
        };
        if (this.props.accept && this.props.accept.length) {
            props.accept = this.props.accept.join(",");
        }
        if (this.props.fileSelected) {
            props.onChange = function (e) {
                var inputElement = e.target;
                if (inputElement && inputElement.files && inputElement.files.length > 0) {
                    if (inputElement.files.length > 1 && _this.props.multipleFilesSelected) {
                        inputElement.type = "";
                        inputElement.type = "file";
                        _this.props.multipleFilesSelected();
                    }
                    else {
                        var file_1 = inputElement.files[0];
                        var reader_1 = new FileReader();
                        reader_1.readAsDataURL(file_1);
                        reader_1.onload = function () {
                            var fileInput = _this._parseFileReaderResult(file_1, reader_1.result);
                            _this.props.fileSelected(fileInput);
                        };
                        reader_1.onerror = function () {
                            if (_this.props.onReaderError) {
                                _this.props.onReaderError("Error reading file: " + file_1.name + "\n" + reader_1.error);
                            }
                        };
                    }
                }
                else if (_this.props.fileUnselected) {
                    _this.props.fileUnselected();
                }
            };
        }
        return props;
    };
    InnerFileInput.prototype._parseFileReaderResult = function (file, result) {
        var content = null;
        var encoding = null;
        if (result) {
            var commaIndex = result.indexOf(",");
            if (commaIndex > -1) {
                content = result.substring(commaIndex + 1);
            }
            var semiColonIndex = result.indexOf(";");
            if (semiColonIndex > -1 && commaIndex > -1) {
                encoding = result.substring(semiColonIndex + 1, commaIndex);
            }
        }
        return {
            content: content,
            mimeType: file.type,
            encoding: encoding,
            name: file.name,
            size: file.size,
        };
    };
    InnerFileInput.displayName = "FileInput";
    return InnerFileInput;
}(ComponentBase));
var FileInput = ReactFela.connect(rules)(InnerFileInput);
export { FileInput };
