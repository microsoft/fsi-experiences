import React, { FC } from 'react';
import Widget from '../../../components/atoms/Widget/Widget';
import ResponsiveContainer from '../../../components/atoms/ResponsiveContainer/ResponsiveContainer';
import { ICustomerIndicatorFetcher } from '../../../dataLayerInterface/service/ICustomerIndicatorFetcher';
import CustomerIndicatorContent from './components/CustomerIndicatorContent/CustomerIndicatorContent';
import { customerIndicatorsPrefix } from './consts/reponsive.consts';
import useCustomerIndicators from '../hooks/useCustomerIndicators';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';

export interface ICustomerIndicator {
    fetcher: ICustomerIndicatorFetcher;
}

const CustomerIndicator: FC<ICustomerIndicator> = props => {
    const { indicatorData, isLoading, isError, invalidConfig } = useCustomerIndicators(props);
    const translate = useTranslation(namespaces.KEY_OBSERVATIONS);

    return (
        <ResponsiveContainer classPrefix={customerIndicatorsPrefix}>
            <Widget
                isLoading={isLoading}
                isError={!invalidConfig && isError}
                errorIconSize={100}
                header={translate('INDICATORS_HEADER')}
                name="customer-indicators-widget"
            >
                <CustomerIndicatorContent customerIndicators={indicatorData!} invalidConfig={invalidConfig} />
            </Widget>
        </ResponsiveContainer>
    );
};
export default CustomerIndicator;
