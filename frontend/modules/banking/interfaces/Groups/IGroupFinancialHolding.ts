import { ICustomerFH } from '../../interfaces/FHEntity/CustomerFH';
import { IndictableFH } from '../../interfaces/FHEntity/IndictableFH';

export interface IGroupFinancialHolding extends IndictableFH {
    groupHoldingId: string;
    owners: ICustomerFH[];
}
