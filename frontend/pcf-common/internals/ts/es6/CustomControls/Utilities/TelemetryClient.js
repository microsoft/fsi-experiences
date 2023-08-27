var TelemetryClient = (function () {
    function TelemetryClient() {
        this._initialized = false;
    }
    TelemetryClient.prototype._logMessage = function (_customControlName, _message, _logType) {
        throw "_logMessage is not overrided by actual implementation";
    };
    TelemetryClient.prototype.setProps = function (props) {
        if (!this._initialized &&
            props &&
            props.propBagMethods &&
            props.propBagMethods.utils &&
            props.propBagMethods.utils.logMessage) {
            this._logMessage = props.propBagMethods.utils.logMessage;
            this._initialized = true;
        }
    };
    TelemetryClient.prototype.log = function (control, message) {
        if (this._initialized) {
            this._logMessage(control, message, 3);
        }
    };
    TelemetryClient.prototype.warn = function (control, message) {
        if (this._initialized) {
            this._logMessage(control, message, 2);
        }
    };
    TelemetryClient.prototype.error = function (control, message) {
        if (this._initialized) {
            this._logMessage(control, message, 1);
        }
    };
    return TelemetryClient;
}());
var instance = new TelemetryClient();
export { TelemetryClient, instance };
export default instance;
