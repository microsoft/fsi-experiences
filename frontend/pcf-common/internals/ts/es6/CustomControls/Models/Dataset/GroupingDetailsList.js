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
var GroupingDetailsList = (function (_super) {
    __extends(GroupingDetailsList, _super);
    function GroupingDetailsList(onUpdated) {
        return _super.call(this, makeGroupingExpressionComparer, "grouping", onUpdated) || this;
    }
    GroupingDetailsList.prototype.asDataSetGrouping = function () {
        return this.as("getGroupBys", "addGroupBy", "removeGroupBy", "clear");
    };
    return GroupingDetailsList;
}(DataSetDetailsList));
export { GroupingDetailsList };
function makeGroupingExpressionComparer(lhs) {
    return function (rhs) {
        return lhs.alias === rhs.alias &&
            lhs.columnName === rhs.columnName &&
            (isDateGroupingExpression(lhs) && lhs.dateGrouping) === (isDateGroupingExpression(rhs) && rhs.dateGrouping);
    };
}
function isDateGroupingExpression(expression) {
    return !!expression.dateGrouping;
}
