import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { getCurrentTagStyle, hideElementStyles, lineWrapperStyles } from './LineChart.style';
import { ILineChart } from './LineChart.interface';
import { textStyles } from '../PartyAssetsAndLiabilities.style';

const lineTokens = { childrenGap: 4 };

export const LineChart: FC<ILineChart> = ({ color, percent, value, hideCurrencyCode }) => {
    const currTagStyles = getCurrentTagStyle(color, percent)
    return (
        <Stack disableShrink horizontal verticalAlign="center">
            <Stack horizontal verticalAlign="center" styles={lineWrapperStyles} tokens={lineTokens}>
                <Stack horizontal styles={currTagStyles} horizontalAlign="start" data-testid="line-chart-component" />
                <Currency
                    currencyStyles={hideCurrencyCode ? hideElementStyles : textStyles}
                    numberStyles={textStyles}
                    compact
                    value={value}
                ></Currency>
            </Stack>
        </Stack>
    );
};
export default LineChart;
