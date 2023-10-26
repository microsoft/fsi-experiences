import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { INDICATOR_TYPE_MAP } from '@fsi/core-components/dist/constants/IndicatorTypeMap';
import { IFHIndicatorMessageBar } from './FHIndicatorMessageBar.interface';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export const FHIndicatorMessageBar: FC<IFHIndicatorMessageBar> = props => {
    const { indicator, show } = props;
    const indicatorProps = indicator && INDICATOR_TYPE_MAP[indicator.type()];

    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const icon = useMemo(() => ({ iconName: indicatorProps?.icon, styles: { root: { color: indicatorProps?.color } } }), [indicatorProps]);

    if (!indicator || !show || !indicatorProps) {
        return <></>;
    }

    return (
        <Stack.Item align="auto" styles={{ root: { padding: '0px -8px' } }} data-testid={`indicator-bar-${indicator.type()}`}>
            <MessageBar messageBarType={indicatorProps.messageBarType} isMultiline={false} messageBarIconProps={icon}>
                {translate(indicator.messageKey, indicator.messageProps)}
            </MessageBar>
        </Stack.Item>
    );
};

export default FHIndicatorMessageBar;
