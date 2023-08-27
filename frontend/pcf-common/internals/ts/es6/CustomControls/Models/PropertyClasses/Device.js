import { instance as XrmProxy } from "../../Utilities/XrmProxy";
var Device = (function () {
    function Device(customControlProperties) {
        this._bagProps = customControlProperties.propBagMethods.device;
    }
    Device.prototype.captureImage = function (options) {
        return XrmProxy.captureImage(options);
    };
    Device.prototype.captureAudio = function (options) {
        return XrmProxy.captureAudio(options);
    };
    Device.prototype.captureVideo = function (options) {
        return XrmProxy.captureVideo(options);
    };
    Device.prototype.pickFile = function (options) {
        return XrmProxy.pickFile(options);
    };
    Device.prototype.getBarcodeValue = function () {
        return XrmProxy.getBarcodeValue();
    };
    Device.prototype.getCurrentPosition = function () {
        return XrmProxy.getCurrentPosition();
    };
    Device.prototype.isGetBarcodeValueOperationAvailable = function () {
        return this._bagProps.isGetBarcodeValueOperationAvailable();
    };
    Device.prototype.isTakePictureOperationAvailable = function () {
        return this._bagProps.isTakePictureOperationAvailable();
    };
    Device.prototype.isCaptureVideoOperationAvailable = function () {
        return this._bagProps.isCaptureVideoOperationAvailable();
    };
    Device.prototype.isCaptureAudioOperationAvailable = function () {
        return this._bagProps.isCaptureAudioOperationAvailable();
    };
    Device.prototype.isOpenARViewerAvailable = function () {
        return this._bagProps.isOpenARViewerAvailable();
    };
    Device.prototype.openARViewer = function (options) {
        return XrmProxy.openARViewer(options);
    };
    Device.prototype.getDeclaredFeatures = function () {
        return {
            unspecifiedFeatureFallback: { supportStatus: "supported" },
            featureList: {
                captureImage: {
                    supportStatus: this.isTakePictureOperationAvailable && this.isTakePictureOperationAvailable()
                        ? "supported"
                        : "unsupported",
                },
                captureAudio: {
                    supportStatus: this.isCaptureAudioOperationAvailable && this.isCaptureAudioOperationAvailable()
                        ? "supported"
                        : "unsupported",
                },
                captureVideo: {
                    supportStatus: this.isCaptureVideoOperationAvailable && this.isCaptureVideoOperationAvailable()
                        ? "supported"
                        : "unsupported",
                },
                getBarcodeValue: {
                    supportStatus: this.isGetBarcodeValueOperationAvailable && this.isGetBarcodeValueOperationAvailable()
                        ? "supported"
                        : "unsupported",
                },
                getCurrentPosition: { supportStatus: "supported" },
                pickFile: { supportStatus: "supported" },
                openARViewer: {
                    supportStatus: this.isOpenARViewerAvailable && this.isOpenARViewerAvailable() ? "supported" : "unsupported",
                },
            },
        };
    };
    Device.prototype.getFeatureClassName = function () {
        return "Device";
    };
    return Device;
}());
export { Device };
