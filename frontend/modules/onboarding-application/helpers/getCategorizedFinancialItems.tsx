import { ApplicantFinancialCategoryOption } from '../constants/FinancialCategories.const';

interface IGetCategorizedFinancialItemsProps {
    items: any & { value: number }[];
    category: ApplicantFinancialCategoryOption;
    setNegativeValues?: boolean;
}

export const getCategorizedFinancialItems = ({ items = [], category, setNegativeValues }: IGetCategorizedFinancialItemsProps) => {
    return items.map(item => ({
        ...item,
        value: setNegativeValues && item.value !== 0 ? item.value * -1 : item.value,
        category,
    }));
};
