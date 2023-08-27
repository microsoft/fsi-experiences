import { ILoanFinancialCategory } from '../../interfaces/ILoanFinancialCategory/ILoanFinancialCategory';
import { IFormDialogProps } from '@fsi/core-components/dist/components/containers/FormDialog';
import { ApplicantFinancialCategoryOption } from '../../constants/ApplicantFinancialItemCategories.consts';

export interface IRemoveLoanFinancialItemDialogProps extends Omit<IFormDialogProps, 'onSubmit' | 'errorProps' | 'loadingProps'> {
    category: ApplicantFinancialCategoryOption;
    item: ILoanFinancialCategory;
    onSubmit: (item: ILoanFinancialCategory, index: number) => Promise<any>;
    itemIndex: number;
}
