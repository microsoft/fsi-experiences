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
import { DataSetDetailsList } from "./DataSetDetailsList";
var LinkEntityDetailsList = (function (_super) {
    __extends(LinkEntityDetailsList, _super);
    function LinkEntityDetailsList(onUpdated) {
        return _super.call(this, makeLinkEntityExpressionComparer, "linking", onUpdated) || this;
    }
    LinkEntityDetailsList.prototype.asDataSetLinking = function () {
        return this.as("getLinkedEntities", "addLinkedEntity", "removeLinkedEntity", "clear");
    };
    return LinkEntityDetailsList;
}(DataSetDetailsList));
export { LinkEntityDetailsList };
function makeLinkEntityExpressionComparer(lhs) {
    return function (rhs) {
        return lhs.name === rhs.name &&
            lhs.from === rhs.from &&
            lhs.to === rhs.to &&
            lhs.linkType === rhs.linkType &&
            lhs.alias === rhs.alias;
    };
}
