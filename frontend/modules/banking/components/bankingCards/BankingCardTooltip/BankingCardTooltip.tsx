import { Stack } from '@fluentui/react/lib/Stack';
import React, { FC, ReactElement } from 'react';
import DataBox from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { IBankingCardTooltipProps } from './BankingCardTooltip.interface';
import { bankingCardTooltipBoxValueSize, bankingCardTooltipTokens } from './BankingCardTooltip.style';

const BankingCardTooltip: FC<IBankingCardTooltipProps> = ({ embossingName, withdrawalLimit, purchasingLimit, currencyId, metadata }) => {
    const boxDetailsList = [
        { label: metadata?.fhiEmbossingName.displayName, value: embossingName },
        { label: metadata?.fhiPurchasingLimit.displayName, value: purchasingLimit, isCurrency: true },
        { label: metadata?.fhiWithdrawalLimit.displayName, value: withdrawalLimit, isCurrency: true },
    ];
    const currencyRenderer = (value?: string | number | Date): ReactElement => (
        <Currency
            value={value as number}
            currencyId={currencyId}
            numberStyles={bankingCardTooltipBoxValueSize}
            currencyStyles={bankingCardTooltipBoxValueSize}
        />
    );

    return (
        <Stack tokens={bankingCardTooltipTokens}>
            {boxDetailsList.map((boxDetails, index) => (
                <DataBox
                    key={index}
                    styles={bankingCardTooltipBoxValueSize}
                    boxDetails={boxDetails}
                    valueRender={boxDetails.isCurrency ? currencyRenderer : undefined}
                />
            ))}
        </Stack>
    );
};

export default BankingCardTooltip;
