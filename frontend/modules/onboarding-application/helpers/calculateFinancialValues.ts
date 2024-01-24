import { IFinancialCategory } from '../interfaces/IFinancialCategory';

export const calculateFinancialValues = (data: IFinancialCategory[], applicantId?: string) => {
    const defaultResult = { total: 0, applicantTotal: 0 };
    if (!data) return defaultResult;

    return data.reduce(
        (acc, item) => ({
            total: acc.total + item.value,
            applicantTotal: item.customerId === applicantId ? acc.applicantTotal + item.value : acc.applicantTotal,
        }),
        defaultResult
    );
};
