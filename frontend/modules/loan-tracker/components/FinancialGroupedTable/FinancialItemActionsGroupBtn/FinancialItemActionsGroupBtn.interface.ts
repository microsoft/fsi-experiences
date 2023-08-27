import { ILoanFinancialCategory } from '../../../interfaces/ILoanFinancialCategory/ILoanFinancialCategory';
import { ApplicantFinancialCategoryOption } from '../../../constants/ApplicantFinancialItemCategories.consts';

export interface IFinancialItemActionsGroupBtnProps {
    item: Omit<ILoanFinancialCategory, 'customerId' | 'type'> & {
        category: ApplicantFinancialCategoryOption;
    };
    index?: number;
    compactMode?: boolean;
    hasPrivilege: (category: ApplicantFinancialCategoryOption, operationType: number) => boolean;
}
