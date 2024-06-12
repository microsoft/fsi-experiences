import { ApplicantFinancialCategoryOption } from '../../../constants/FinancialCategories.const';
import { IFinancialCategory } from '../../../interfaces/IFinancialCategory';

export interface IFinancialItemActionsGroupBtnProps {
    item: Omit<IFinancialCategory, 'customerId' | 'type'> & {
        category: ApplicantFinancialCategoryOption;
    };
    index?: number;
    compactMode?: boolean;
    hasPrivilege: (category: ApplicantFinancialCategoryOption, operationType: number) => boolean;
}
