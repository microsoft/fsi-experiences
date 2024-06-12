import React from 'react';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import FinancialHoldingSelector from '@fsi/banking/components/FinancialHoldingSelector';
import { IFinancialHoldingCard } from '@fsi/banking/components/FinancialHoldingCard';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';

export interface FinancialHoldingSelectorContainerProps extends PCFContainerProps {
    onChangeLookup: (guid: string) => void;
}

export const FinancialHoldingSelectorContainer: React.FC<FinancialHoldingSelectorContainerProps> = ({ context, onChangeLookup }) => {
    const fetcher = useFHFetcher(context);

    const contactId = extractEntityId(context.parameters?.contactId);
    const onChange = (item: IFinancialHoldingCard) => onChangeLookup(item.id);
    const selectedFinancialHoldingId = context.parameters?.selectedFinancialHolding?.raw[0]?.id;
    const financialHoldingCategoryId = context.parameters?.financialHoldingCategory.raw;
    const formId = context.parameters?.formId?.raw;

    return context ? (
        <PCFContainer context={context}>
            <FinancialHoldingSelector
                contactId={contactId}
                fetcher={fetcher}
                selectedFinancialHoldingId={selectedFinancialHoldingId}
                onChange={onChange}
                formId={formId}
                financialHoldingsCategory={financialHoldingCategoryId}
            />
        </PCFContainer>
    ) : null;
};
