import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { ILoanFinancialCategory } from '../../interfaces/ILoanFinancialCategory/ILoanFinancialCategory';
import { IFormDialogProps } from '@fsi/core-components/dist/components/containers/FormDialog';
import { ApplicantFinancialCategoryOption } from '../../constants/ApplicantFinancialItemCategories.consts';

export interface ILoanFinancialItemFormDialogProps extends Omit<IFormDialogProps, 'onSubmit' | 'errorProps' | 'loadingProps'> {
    category: ApplicantFinancialCategoryOption;
    itemTypeOptions: IDropdownOption[];
    onSubmit: (item: ILoanFinancialCategory) => Promise<any>;
    item: ILoanFinancialCategory;
}
