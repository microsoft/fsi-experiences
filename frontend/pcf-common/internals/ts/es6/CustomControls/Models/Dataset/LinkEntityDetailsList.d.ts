import { DataSetLinking, DataSetUpdatePropertyNames, LinkEntityExpression } from "./CustomControlDataSetInterfaces";
import { DataSetDetailsList } from "./DataSetDetailsList";
export declare class LinkEntityDetailsList extends DataSetDetailsList<LinkEntityExpression> {
    constructor(onUpdated: (property: DataSetUpdatePropertyNames) => void);
    asDataSetLinking(): DataSetLinking;
}
