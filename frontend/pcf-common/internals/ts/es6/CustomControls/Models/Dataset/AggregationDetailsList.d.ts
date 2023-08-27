import { AggregationExpression, DataSetAggregation, DataSetUpdatePropertyNames } from "./CustomControlDataSetInterfaces";
import { DataSetDetailsList } from "./DataSetDetailsList";
export declare class AggregationDetailsList extends DataSetDetailsList<AggregationExpression> {
    constructor(onUpdated: (property: DataSetUpdatePropertyNames) => void);
    asDataSetAggregation(): DataSetAggregation;
}
