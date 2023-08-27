import {
    AccountHeaderProps,
    CreditHeaderProps,
    InvestmentHeaderProps,
    LoanHeaderProps,
    SavingHeaderProps,
} from '../../../utilities/SIDComponentStructure';
import ICustomerFH from '../../../../../interfaces/FHEntity/CustomerFH';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { FHMetadata } from '../../../../../interfaces/FHEntity/FHMetadata';
import { IndictableFH } from '../../../../../interfaces/FHEntity/IndictableFH';
import { IPieChartData } from '@fsi/core-components/dist/components/containers/DataPieChart';

export interface ISIDMainProps {
    selected: IndictableFH | undefined;
    relatedCustomers: ICustomerFH[];
    relatedCustomersLoadingState: LoadingState;
    metadata?: FHMetadata;
    chart?: { header: string; data?: IPieChartData[]; emptyStateText: string };
    isPreviewFeatures?: boolean;
}

export type HeaderProps = InvestmentHeaderProps | AccountHeaderProps | LoanHeaderProps | SavingHeaderProps | CreditHeaderProps;
