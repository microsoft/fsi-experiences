import React from 'react';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import FinancialHoldingInformation from '@fsi/banking/components/FinancialHoldingInformation/FinancialHoldingInformation';
import { useFHFetcher } from '@fsi-pcf/banking-common/financial-holding/fetchers/useFHFetcher';

export interface IFinancialHoldingInformationContainerProps extends PCFContainerProps {}

export const FinancialHoldingInformationContainer: React.FC<IFinancialHoldingInformationContainerProps> = props => {
    const { context } = props;
    const fetcher = useFHFetcher(context);

    const financialHoldingId = context.parameters.financialHoldingId.raw;

    return context ? (
        <PCFContainer context={props.context}>
            <FinancialHoldingInformation fetcher={fetcher} financialHoldingId={financialHoldingId} />
        </PCFContainer>
    ) : null;
};
