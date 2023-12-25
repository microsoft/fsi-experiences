import { calculateFinancialValues } from '../helpers/calculateFinancialValues';
import { getFinancialGroupedTableGroups } from '../helpers/getFinancialGroupedTableGroups';
import { IFinancialCategory } from '../interfaces/IFinancialCategory';

interface IGroupFinancialItem {
    key: string;
    name?: string;
    financialItems: IFinancialCategory[];
}

export interface IUseGroupedFinancialItemsProps {
    groupsFinancialItems: IGroupFinancialItem[];
}

export const useGroupedFinancialItems = ({ groupsFinancialItems }: IUseGroupedFinancialItemsProps) => {
    /* istanbul ignore next*/
    const financialGroupedTableGroups = getFinancialGroupedTableGroups(
        {
            key: groupsFinancialItems[0].key,
            name: groupsFinancialItems[0].name,

            total: calculateFinancialValues(groupsFinancialItems[0].financialItems).total,
            startIndex: 0,
            count: groupsFinancialItems[0].financialItems.length,
        },
        {
            key: groupsFinancialItems[1].key,
            name: groupsFinancialItems[1].name,
            total: calculateFinancialValues(groupsFinancialItems[1].financialItems).total,
            startIndex: groupsFinancialItems[0].financialItems.length,
            count: groupsFinancialItems[1].financialItems.length,
        }
    );

    return financialGroupedTableGroups;
};
