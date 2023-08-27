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
var InnerIFrame = (function (_super) {
    __extends(InnerIFrame, _super);
    function InnerIFrame(props) {
        var _this = _super.call(this, props) || this;
        _this._iframeElement = null;
        _this._origin = null;
        _this._onLoad = _this._onLoad.bind(_this);
        _this._origin = _this._normalizeUrl(props.src);
        return _this;
    }
    InnerIFrame.prototype._normalizeUrl = function (url) {
        var a = document.createElement("a");
        a.href = url;
        return a.protocol + "//" + a.host;
    };
    InnerIFrame.prototype._onLoad = function () {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
        if (this.props.onReadyStateComplete) {
            this.props.onReadyStateComplete();
        }
    };
    InnerIFrame.prototype.getElementName = function () {
        return "iframe";
    };
    InnerIFrame.prototype.getElementProps = function () {
        var props = {
            src: this.props.src,
            title: this.props.title,
            onLoad: this._onLoad,
        };
        if (this.props.security) {
            props.security = this.props.security;
            props.sandbox = "";
        }
        if (this.props.scrolling) {
            props.scrolling = this.props.scrolling;
        }
        if (this.props.allow) {
            props.allow = this.props.allow;
        }
        if (this.props.name) {
            props.name = this.props.name;
        }
        props.ref = this._registerIframeElement.bind(this);
        return props;
    };
    InnerIFrame.prototype.componentWillReceiveProps = function () {
        this._resetEventHandlers();
    };
    InnerIFrame.prototype._resetEventHandlers = function () {
        window.removeEventListener("message", this._receiveMessageHandler, false);
        this._receiveMessageHandler = null;
        if (this.props.registerSendMessageHandler) {
            this.props.registerSendMessageHandler(undefined);
        }
    };
    InnerIFrame.prototype._registerIframeElement = function (element) {
        this._iframeElement = element;
        if (this._iframeElement) {
            this._receiveMessageHandler = this._receiveMessage.bind(this);
            window.addEventListener("message", this._receiveMessageHandler, false);
            if (this.props.registerSendMessageHandler) {
                this.props.registerSendMessageHandler(this._sendMessage.bind(this));
            }
        }
        else {
            this._resetEventHandlers();
        }
    };
    InnerIFrame.prototype.componentWillUnmount = function () {
        this._resetEventHandlers();
    };
    InnerIFrame.prototype._receiveMessage = function (event) {
        if (!this._iframeElement || event.source !== this._iframeElement.contentWindow) {
            return;
        }
        if (this._normalizeUrl(event.origin) !== this._origin) {
            return;
        }
        if (this.props.onMessage) {
            this.props.onMessage(event);
        }
    };
    InnerIFrame.prototype._sendMessage = function (message) {
        if (!this._iframeElement) {
            return;
        }
        this._iframeElement.contentWindow.postMessage(message, this._origin);
    };
    InnerIFrame.displayName = "IFrame";
    return InnerIFrame;
}(ComponentBase));
var IFrame = ReactFela.connect(rules)(InnerIFrame);
export { InnerIFrame, IFrame };
