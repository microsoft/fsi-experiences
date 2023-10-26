import { IFinancialHoldingCard } from '../FinancialHoldingCard';
import React, { FC, useEffect } from 'react';
import { IFHFetcher } from '../../interfaces/IFHFetcher';
import useFinancialHoldingsByCategory from '../../hooks/financialHoldings/useFinancialHoldingsByCategory';
import FinancialHoldingList from '../detailedFinancialHolding/components/FinancialHoldingList';
import { useOpenForm } from '@fsi/core-components/dist/context/hooks/useOpenForm';
import useMediaQueryListener from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { MOBILE_MEDIA_QUERY } from './FinancialHoldingSelector.const';

export interface IFinancialHoldingSelectorProps {
    fetcher: IFHFetcher;
    contactId: string;
    onChange: (item: IFinancialHoldingCard) => void;
    selectedFinancialHoldingId?: string;
    financialHoldingsCategory?: string;
    formId?: string;
}

const FinancialHoldingSelector: FC<IFinancialHoldingSelectorProps> = ({
    fetcher,
    contactId,
    onChange,
    selectedFinancialHoldingId,
    financialHoldingsCategory,
    formId,
}) => {
    const { entities, isError, isLoading, isRestricted } = useFinancialHoldingsByCategory({ contactId, fetcher, financialHoldingsCategory });

    const openFinancialHoldingForm = useOpenForm({ formId, entity: 'msfsi_financialholding' });

    const isMobile = useMediaQueryListener(MOBILE_MEDIA_QUERY, window);

    const onChangeWithMobile = (item: IFinancialHoldingCard) => {
        if (isMobile) {
            return openFinancialHoldingForm(item.id);
        }

        onChange(item);
    };

    /* istanbul ignore next */
    useEffect(() => {
        if (entities.length && !selectedFinancialHoldingId) {
            onChange(entities[0]);
        }
    }, [entities, onChange, selectedFinancialHoldingId]);

    return (
        <FinancialHoldingList
            isRestricted={isRestricted}
            isLoading={isLoading}
            isError={isError}
            items={entities}
            onChange={onChangeWithMobile}
            selectedId={isMobile ? undefined : selectedFinancialHoldingId}
        />
    );
};

export default FinancialHoldingSelector;
