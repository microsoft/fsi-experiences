import { IGroupFinancialHolding } from '../../../interfaces/Groups';
import { IGroup } from '@fluentui/react/lib/GroupedList';
import { FHMetadata } from '../../../interfaces/FHEntity';

export interface IFhPickListsProps {
    fhCategoryTypes: Map<number, string>;
    fhTypeTypes: Map<number, string>;
    roles: Map<number, string>;
}

export interface IDetailedMembersGroupHoldingsProps {
    financialHoldings: IGroupFinancialHolding[];
    responsiveColumns?: number;
    items: IGroupFinancialHolding[];
    groups: IGroup[];
    viewKey: string;
    fhPickLists: IFhPickListsProps;
    onFHSelected?: (groupHoldings: IGroupFinancialHolding[], isChecked?: boolean) => void;
    contactId?: string;
    metadata?: FHMetadata;
}

export interface IDetailedMembersGroupHoldingsWrapperProps {
    selectedFinancialHoldings?: IGroupFinancialHolding[];
    allFinancialHoldings: IGroupFinancialHolding[];
    selectedKey: string;
    fhPickLists: IFhPickListsProps;
    onFHChanged?: (financialHoldings: IGroupFinancialHolding[]) => void;
    contactId?: string;
    metadata?: FHMetadata;
    emptyStateMessage?: string;
}
