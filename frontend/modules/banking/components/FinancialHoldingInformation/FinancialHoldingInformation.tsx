import React, { FC } from 'react';
import { IFHFetcher } from '../../interfaces/IFHFetcher';
import { SIDMain } from '../detailedFinancialHolding/components/SelectedItemDetails/SIDMain';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import useFinancialHoldingById from '../../hooks/financialHoldings/useFinancialHoldingById';
import Widget from '@fsi/core-components/dist/components/atoms/Widget';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export interface IFinancialHoldingInformationProps {
    fetcher: IFHFetcher;
    financialHoldingId: string;
}

const FinancialHoldingInformation: FC<IFinancialHoldingInformationProps> = ({ fetcher, financialHoldingId }) => {
    const { financialHolding, isError, isLoading, metadata, relatedCustomers, portfolioChartData } = useFinancialHoldingById({
        fetcher,
        financialHoldingId,
    });
    const translate = useTranslation(namespaces.DETAILED_FH_CONTROL);

    return (
        <Widget isError={isError} isLoading={isLoading} name="financial-holding-information">
            <SIDMain
                metadata={metadata}
                selected={financialHolding}
                relatedCustomers={relatedCustomers || []}
                relatedCustomersLoadingState={LoadingState.Success}
                chart={{
                    header: translate('PORTFOLIO_ALLOCATION'),
                    data: portfolioChartData,
                    emptyStateText: translate('NO_ASSETS_YET'),
                }}
                isPreviewFeatures
            />
        </Widget>
    );
};

export default FinancialHoldingInformation;
