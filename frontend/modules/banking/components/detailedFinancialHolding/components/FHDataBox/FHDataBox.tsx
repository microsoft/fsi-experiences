import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import React, { FC, ReactElement, useMemo } from 'react';
import DataBox from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import { IBoxDetails } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox.interface';
import NumericValue from '@fsi/core-components/dist/components/atoms/NumericValue/NumericValue';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import TimedPerformance from '@fsi/core-components/dist/components/containers/TimedPerformance/TimedPerformance';
import { TimedPerformancePairs } from '@fsi/core-components/dist/components/containers/TimedPerformance/TimedPerformance.interface';
import FinancialHoldingFields from '../../../../interfaces/FHEntity/FinancialHoldingFields';
import { toRate } from '@fsi/core-components/dist/utilities';
import DateTime from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import { FHDataBoxType, FHDataBoxValueType, ICurrencyDisplayBox, IFHDataBoxProps } from './FHDataBox.interface';
import { currencyStyleDetails } from './FHDataBox.style';
interface RenderValue {
    value?: string | number | Date;
    valueRender?: (value?: string | number | Date) => ReactElement;
}

const getRenderProps = (
    type?: FHDataBoxType,
    value?: FHDataBoxValueType,
    entity?: FinancialHoldingFields,
    styles?: ITextStyles,
    currency?: ICurrencyDisplayBox
): RenderValue => {
    const display: RenderValue = {};

    if (type === undefined) {
        return display;
    }

    if (value === undefined || value === '') {
        return {
            value: 'N/A',
        };
    }

    switch (type) {
        case FHDataBoxType.Currency:
        case FHDataBoxType.SignedCurrency:
            display.value = value as number;
            display.valueRender = value => (
                <Currency
                    value={value as number}
                    numberStyles={styles}
                    currencyStyles={currency?.styles || currencyStyleDetails}
                    fricationDigits={currency?.fricationDigits}
                    signed={type === FHDataBoxType.SignedCurrency}
                    currencyId={entity?.currencyId}
                />
            );
            break;

        case FHDataBoxType.Date:
            display.value = value as Date;
            display.valueRender = value => <DateTime styles={styles} date={value as Date} />;
            break;

        case FHDataBoxType.Rate:
            display.value = toRate(value as number);
            break;

        case FHDataBoxType.Number:
            display.value = value as number;
            display.valueRender = value => <NumericValue value={value as number} styles={styles} />;
            break;

        default:
            display.value = value as string;
    }

    return display;
};
const FHDataBox: FC<IFHDataBoxProps> = props => {
    const { boxDetails, entity, styles, currencyDisplay } = props;

    const { type, value: rawValue, footer } = boxDetails;

    const content = useMemo(() => {
        if (type === FHDataBoxType.Performance) {
            return <TimedPerformance timedPerformancePairs={rawValue as TimedPerformancePairs[]} styles={styles} />;
        }

        const { value, valueRender } = getRenderProps(type, rawValue, entity, styles, currencyDisplay);
        const { value: footerValue, valueRender: footerRender } = getRenderProps(footer?.type, footer?.value, entity);

        const details: IBoxDetails = {
            label: boxDetails.label,
            labelColor: boxDetails.labelColor,
            value,
            footer: footerValue,
        };

        return <DataBox boxDetails={details} valueRender={valueRender} footerRender={footerRender} styles={styles} />;
    }, [type, boxDetails, styles]);

    return content;
};

export default FHDataBox;
