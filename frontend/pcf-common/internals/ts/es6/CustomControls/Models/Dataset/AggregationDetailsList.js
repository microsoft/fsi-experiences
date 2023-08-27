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
var AggregationDetailsList = (function (_super) {
    __extends(AggregationDetailsList, _super);
    function AggregationDetailsList(onUpdated) {
        return _super.call(this, makeAggregationExpressionComparer, "aggregation", onUpdated) || this;
    }
    AggregationDetailsList.prototype.asDataSetAggregation = function () {
        return this.as("getAggregations", "addAggregation", "removeAggregation", "clear");
    };
    return AggregationDetailsList;
}(DataSetDetailsList));
export { AggregationDetailsList };
function makeAggregationExpressionComparer(lhs) {
    return function (rhs) {
        return lhs.alias === rhs.alias &&
            lhs.columnName === rhs.columnName &&
            lhs.aggregationFunction === rhs.aggregationFunction &&
            isCountColumnDistinct(lhs) === isCountColumnDistinct(rhs);
    };
}
function isCountColumnDistinct(expression) {
    return expression.aggregationFunction === "countcolumn" && expression.distinct;
}
