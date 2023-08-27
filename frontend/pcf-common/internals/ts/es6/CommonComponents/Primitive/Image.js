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
var InnerImage = (function (_super) {
    __extends(InnerImage, _super);
    function InnerImage(props) {
        var _this = _super.call(this, props) || this;
        _this._onLoad = _this._onLoad.bind(_this);
        return _this;
    }
    InnerImage.prototype._onLoad = function () {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    };
    InnerImage.prototype.getElementName = function () {
        return "img";
    };
    InnerImage.prototype.getElementProps = function () {
        var props = {
            src: this.props.source,
            onLoad: this._onLoad,
            alt: this.props.altText ? this.props.altText : "",
            title: this.props.title ? this.props.title : this.props.altText ? this.props.altText : undefined,
            onError: this.props.onError,
        };
        return props;
    };
    InnerImage.displayName = "Image";
    return InnerImage;
}(ComponentBase));
var Image = ReactFela.connect(rules)(InnerImage);
export { InnerImage, Image };
