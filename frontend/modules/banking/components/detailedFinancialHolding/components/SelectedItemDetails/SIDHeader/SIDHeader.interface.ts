import {
    AccountHeaderProps,
    CreditHeaderProps,
    InvestmentHeaderProps,
    LoanHeaderProps,
    SavingHeaderProps,
} from '../../../utilities/SIDComponentStructure';
import { IIndicatorFields } from '../../../../../interfaces/FHEntity/IndictableFH';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import ICustomerFH from '../../../../../interfaces/FHEntity/CustomerFH';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
export interface ISIDHeaderProps {
    data: AccountHeaderProps | LoanHeaderProps | CreditHeaderProps | SavingHeaderProps | InvestmentHeaderProps;
    name: string | undefined;
    category: string;
    type: string;
    indicators: IIndicatorFields[] | undefined;
    contactsRole?: EntityMetadata | undefined;
    description?: string;
    contacts: ICustomerFH[];
    customersLoadingState: LoadingState;
}
