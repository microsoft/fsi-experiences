import { ApplicantFinancialCategoryOption } from '../../constants/FinancialCategories.const';

export interface IFinancialGroupedTableItem {
    id: string;
    name: string;
    description: string;
    value: number;
    category: ApplicantFinancialCategoryOption;
}

export interface IFinancialGroupedTableGroupItem {
    key: string;
    name: string;
    startIndex: number;
    count: number;
    total: number;
    level?: number;
    ariaLabel?: string;
}

export interface IFinancialGroupedTableProps {
    data: IFinancialGroupedTableItem[];
    groups: IFinancialGroupedTableGroupItem[];
    isError?: boolean;
    isLoading?: boolean;
    ariaLabelForTable?: string;
    currencyId?: string;
    actionsRenderer: (item: IFinancialGroupedTableItem, index: number, isSmallScreen: boolean) => any;
}
