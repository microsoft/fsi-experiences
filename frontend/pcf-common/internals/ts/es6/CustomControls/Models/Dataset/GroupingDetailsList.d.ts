import { DataSetGrouping, DataSetUpdatePropertyNames, GroupingExpression } from "./CustomControlDataSetInterfaces";
import { DataSetDetailsList } from "./DataSetDetailsList";
export declare class GroupingDetailsList extends DataSetDetailsList<GroupingExpression> {
    constructor(onUpdated: (property: DataSetUpdatePropertyNames) => void);
    asDataSetGrouping(): DataSetGrouping;
}
