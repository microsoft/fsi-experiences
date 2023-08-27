import { IFormDialogProps } from '@fsi/core-components/dist/components/containers/FormDialog';
import { ApplicantFinancialCategoryOption } from '../../constants/FinancialCategories.const';
import { IFinancialCategory } from '../../interfaces/IFinancialCategory';

export interface IRemoveFinancialItemDialogProps extends Omit<IFormDialogProps, 'onSubmit' | 'errorProps' | 'loadingProps'> {
    category: ApplicantFinancialCategoryOption;
    item: IFinancialCategory;
    onSubmit: (item: IFinancialCategory, index: number) => Promise<any>;
    itemIndex: number;
}
