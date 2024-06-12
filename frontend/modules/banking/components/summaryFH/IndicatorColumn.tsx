import { ITooltipHostProps } from '@fluentui/react/lib/components/Tooltip/TooltipHost.types';
import React, { FC, useMemo } from 'react';
import { INDICATOR_TYPE_MAP } from '@fsi/core-components/dist/constants/IndicatorTypeMap';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { IIndicatorFields } from '../../interfaces/FHEntity/IndictableFH';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';

export interface IIndicatorColumn {
    indicator: IIndicatorFields | undefined;
    size: number;
}

const IndicatorColumn: FC<IIndicatorColumn> = props => {
    const { indicator, size } = props;

    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const indicatorColumnTooltip: ITooltipHostProps = useMemo(() => {
        if (!indicator) {
            return {};
        }
        return {
            content: translate(indicator.messageKey, indicator.messageProps),
        };
    }, [indicator, translate]);

    const indicatorProps = indicator && INDICATOR_TYPE_MAP[indicator.type()];

    if (!indicator || !indicatorProps) {
        return <></>;
    }

    return (
        <Indicator
            iconName={indicatorProps.icon}
            tooltipProps={indicatorColumnTooltip}
            size={size}
            color={indicatorProps.color}
            iconAriaLabel={translate(indicatorProps.iconAriaLabel)}
        />
    );
};

export default IndicatorColumn;
