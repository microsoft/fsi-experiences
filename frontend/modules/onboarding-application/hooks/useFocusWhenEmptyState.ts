import React, { useEffect } from 'react';
import { Milliseconds } from '../constants/FinancialCategories.const';
import { IFinancialCategory } from '../interfaces/IFinancialCategory';

interface IUseFocusWhenEmptyStateProps {
    financialItems: [IFinancialCategory[], IFinancialCategory[]];
    buttonReference: React.RefObject<HTMLButtonElement>;
}

export const useFocusWhenEmptyState = ({ financialItems, buttonReference }: IUseFocusWhenEmptyStateProps) => {
    /* istanbul ignore next*/
    useEffect(() => {
        const isEmpty = financialItems[0]?.length === 0 && financialItems[1]?.length === 0;

        if (!isEmpty) return;
        const timeoutID = setTimeout(() => {
            buttonReference.current?.focus();
        }, Milliseconds);

        return () => clearTimeout(timeoutID);
    }, [buttonReference, financialItems]);
};
