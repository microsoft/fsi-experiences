import React, { FC, useMemo } from 'react';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IFHFetcher } from '../../interfaces/IFHFetcher';
import useFinancialHoldingsByCategory from '../../hooks/financialHoldings/useFinancialHoldingsByCategory';
import { FH_NAME_TO_CATEGORY_MAP } from '../../constants/FHValueMaps';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import isEmpty from 'lodash/isEmpty';
import FinancialHoldingCard from '../FinancialHoldingCard/FinancialHoldingCard';
import SeparatedList from '@fsi/core-components/dist/components/atoms/SeparatedList';

export interface IInvestmentsPortfoliosProps {
    fetcher: IFHFetcher;
    contactId: string;
}

const InvestmentsPortfolios: FC<IInvestmentsPortfoliosProps> = ({ fetcher, contactId }) => {
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const { entities, isLoading, isError, isRestricted } = useFinancialHoldingsByCategory({
        contactId,
        fetcher,
        financialHoldingsCategory: FH_NAME_TO_CATEGORY_MAP.Investments.toString(),
    });

    const emptyProps = useMemo(() => {
        if (isRestricted) {
            return { title: translate('CUSTOMER_INFORMATION_RESTRICTED'), icon: IMAGE_SRC.no_access100, iconSize: 100 };
        }

        if (isEmpty(entities)) {
            return { title: translate('NO_INVESTMENTS_PORTFOLIOS'), icon: IMAGE_SRC.emptyState48, iconSize: 48 };
        }

        return undefined;
    }, [entities, isRestricted, translate]);

    return (
        <Widget
            isLoading={isLoading}
            isError={isError}
            errorIconSize={100}
            header={translate('INVESTMENTS_PORTFOLIOS')}
            name="investments-portfolios-widget"
            emptyProps={emptyProps}
        >
            <SeparatedList items={entities!} onRenderItem={investmentsPortfolio => <FinancialHoldingCard {...investmentsPortfolio} />} />
        </Widget>
    );
};
export default InvestmentsPortfolios;
