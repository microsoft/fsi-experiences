import { Stack } from '@fluentui/react/lib/components/Stack';
import React, { FC, Fragment } from 'react';
import CustomerIndicator from '../CustomerIndicator/CustomerIndicator';
import { horizontalSeparatorStyles, rootContentStyles, verticalSeparatorStyles } from './CustomerIndicatorContent.styles';
import { ICustomerIndicatorField } from '../../../../../dataLayerInterface/entity/CustomerIndicators/CustomerIndicator';
import EmptyState from '../../../../../components/atoms/EmptyState/EmptyState';
import isEmpty from 'lodash/isEmpty';
import { namespaces, useTranslation } from '../../../../../context/hooks/useTranslation';
import { IMAGE_SRC } from '../../../../../constants/ImageSrc';
import ErrorState from '../../../../../components/containers/ErrorState/ErrorState';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';

interface IContent {
    customerIndicators: ICustomerIndicatorField[];
    invalidConfig?: boolean;
}

const Content: FC<IContent> = ({ customerIndicators, invalidConfig }) => {
    const commnTranslate = useTranslation(namespaces.COMMON);
    const translate = useTranslation(namespaces.KEY_OBSERVATIONS);

    if (invalidConfig) {
        return (
            <ErrorState
                icon={IMAGE_SRC.error48}
                title={commnTranslate('ERROR_STATE_TITLE')}
                subtitle={translate('TRY_REFRESH_CONTACT_ADMIN')}
                iconSize={100}
            />
        );
    }
    const indicatorsLength = customerIndicators.length;

    if (!customerIndicators || isEmpty(customerIndicators)) {
        return (
            <EmptyState
                title={translate('NO_INDICATORS_TO_SHOW_YET')}
                subtitle={commnTranslate('CONTACT_SYSTEM_ADMIN')}
                icon={IMAGE_SRC.emptyState48}
                iconSize={100}
            />
        );
    }

    return (
        <Stack styles={rootContentStyles(indicatorsLength)}>
            {customerIndicators?.map(customerIndicator => (
                <Fragment key={customerIndicator.label}>
                    <CustomerIndicator
                        key={customerIndicator.label}
                        value={customerIndicator.value}
                        label={customerIndicator.label}
                        staleness={customerIndicator.staleness}
                        currencyId={customerIndicator.currencyId}
                    />
                    <Separator vertical styles={verticalSeparatorStyles} />
                    <Separator styles={horizontalSeparatorStyles(indicatorsLength)} />
                </Fragment>
            ))}
        </Stack>
    );
};

export default Content;
