import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { categoryDetails, eventsTextStyles, categoryTitleStyle, disabledCategoryTitleStyle, lifeEventButtonStyle, rowStyles } from './Header.style';
import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export interface IHeaderProps {
    categoryName: string;
    categoryCode: number;
    isEmpty: boolean;
    icon: string;
    eventsCount: number;
    financialGoalsCount: number;
}

export const useTranslateInstances = (instanceName: string, instances: number, isEmpty: boolean) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const text = translate(`${instanceName}`, { pluralCount: `${instances}` });
    return isEmpty ? translate(`NO_${instanceName}_YET`) : text;
};

const Header: FC<IHeaderProps> = ({ categoryName, categoryCode, isEmpty, icon, eventsCount, financialGoalsCount }) => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const iconPropsStyle: IIconProps = {
        iconName: icon,
        'aria-hidden': true,
        styles: {
            root: {
                fontSize: '20px',
                margin: 0,
            },
        },
    };

    const titleStyle = useMemo(() => {
        return {
            ...categoryTitleStyle,
            ...(isEmpty ? disabledCategoryTitleStyle : {}),
        };
    }, [isEmpty]);

    const lifeEventLabelId = `life-event-category-label-${categoryCode}`;

    const defaultButtonStyle = useMemo(() => lifeEventButtonStyle(themePrimary), [themePrimary]);

    const eventsText = useTranslateInstances('EVENTS', eventsCount, isEmpty);
    const eventsTextFinancialGoal = useTranslateInstances('GOALS', financialGoalsCount, isEmpty);

    const totalEvents = eventsCount + financialGoalsCount;

    return (
        <Stack horizontal>
            <DefaultButton
                aria-labelledby={lifeEventLabelId}
                data-is-focusable={false}
                primary={!isEmpty}
                styles={defaultButtonStyle}
                data-testid={`life-event-icon-button-${categoryCode}`}
                iconProps={iconPropsStyle}
            />
            <Stack verticalAlign="space-between" styles={categoryDetails}>
                <Stack.Item styles={rowStyles}>
                    <Text title={categoryName} id={lifeEventLabelId} styles={titleStyle}>
                        {categoryName}
                    </Text>
                </Stack.Item>
                <Stack.Item styles={rowStyles} data-testid="all-events-count" data-count={totalEvents}>
                    {financialGoalsCount ? (
                        <Text
                            title={eventsText}
                            data-testid="life-event-count-financial-goal"
                            data-count={financialGoalsCount}
                            styles={eventsTextStyles}
                        >
                            {eventsText}, {eventsTextFinancialGoal}
                        </Text>
                    ) : (
                        <Text title={eventsText} data-testid="life-event-count" data-count={eventsCount} styles={eventsTextStyles}>
                            {eventsText}
                        </Text>
                    )}
                </Stack.Item>
            </Stack>
        </Stack>
    );
};

export default Header;
