import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import {
    labelTextStyles,
    rootContentStyles,
    valueTextStyles,
    StalenessTextStyles,
    contentStyle,
    currencyTextStyle,
    valueErrorTextStyles,
    labelErrorTextStyles,
} from './CustomerIndicator.styles';
import { Text } from '@fluentui/react/lib/Text';
import Currency from '../../../../../components/containers/Currency/Currency';
import { namespaces, useTranslation } from '../../../../../context/hooks/useTranslation';

interface ICustomerIndicator {
    value?: number | string;
    label: string;
    staleness?: Date;
    currencyId?: string;
}

const CustomerIndicator: FC<ICustomerIndicator> = ({ value, label, staleness, currencyId }) => {
    const commnTranslate = useTranslation(namespaces.COMMON);
    const translate = useTranslation(namespaces.KEY_OBSERVATIONS);

    return (
        <Stack className="indicator" styles={rootContentStyles}>
            {currencyId && value ? (
                <Currency
                    numberStyles={valueTextStyles}
                    currencyStyles={currencyTextStyle}
                    currencyId={currencyId}
                    value={+value}
                    fricationDigits={2}
                    compact
                />
            ) : value ? (
                <Text styles={valueTextStyles}>{value}</Text>
            ) : currencyId && !value ? (
                <>
                    <Text styles={valueErrorTextStyles}>{translate('CUSTOMER_INDICATOR_EMPTY_STATE_TITLE')}</Text>
                    <Text styles={labelErrorTextStyles}>{commnTranslate('CONTACT_SYSTEM_ADMIN')}</Text>
                </>
            ) : (
                <Text styles={valueTextStyles}>-</Text>
            )}
            <Stack styles={contentStyle}>
                {currencyId && !value ? (
                    <></>
                ) : staleness ? (
                    <>
                        <Text styles={labelTextStyles}>{label}</Text>
                        <Text styles={StalenessTextStyles}>{staleness.toLocaleDateString()}</Text>
                    </>
                ) : (
                    <>
                        <Text styles={labelTextStyles}>{label}</Text>
                        <Text styles={valueTextStyles}></Text>
                    </>
                )}
            </Stack>
        </Stack>
    );
};

export default CustomerIndicator;
