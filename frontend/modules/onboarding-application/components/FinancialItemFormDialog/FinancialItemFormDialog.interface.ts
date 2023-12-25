import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { IFormDialogProps } from '@fsi/core-components/dist/components/containers/FormDialog';
import { ApplicantFinancialCategoryOption } from '../../constants/FinancialCategories.const';
import { IFinancialCategory } from '../../interfaces/IFinancialCategory';

export interface IFinancialItemFormDialogProps extends Omit<IFormDialogProps, 'onSubmit' | 'errorProps' | 'loadingProps'> {
    category: ApplicantFinancialCategoryOption;
    itemTypeOptions: IDropdownOption[];
    onSubmit: (item: IFinancialCategory) => Promise<any>;
    item: IFinancialCategory;
}
