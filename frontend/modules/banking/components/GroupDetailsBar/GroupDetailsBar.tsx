import React, { FC, useMemo } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { IStackStyles, Stack } from '@fluentui/react/lib/Stack';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { IGroup } from '../../interfaces/Groups';
import { GroupIconType, defaultGroupIconType } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { mergeStyleSets } from '@fluentui/merge-styles';
import {
    groupDetailsBarBoldTextStyles,
    groupDetailsBarStyles,
    groupDetailsBarIconContainerStyles,
    groupDetailsBarIconStyles,
    groupDetailsBarTextStyles,
    groupDetailsBarWrapper,
} from './GroupDetailsBar.styles';
import Indicator from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import isNil from 'lodash/isNil';
import { OverflowText } from '@fsi/core-components/dist/components/atoms';

export type IGroupShortDetailsStyles = IStackStyles;
export interface GroupDetailsBarProps {
    group: IGroup;
    isPrimary: boolean;
    styles?: IGroupShortDetailsStyles;
}

const GroupDetailsBar: FC<GroupDetailsBarProps> = ({ group, isPrimary, styles }) => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const translateMainHouseHold = useTranslation(namespaces.MAIN_HOUSEHOLD);

    const getGroupDetailsText = () => {
        const members = (
            <Stack horizontal tokens={{ childrenGap: '4px' }}>
                <Text styles={groupDetailsBarBoldTextStyles} data-testid="group-short-details-members-length">
                    {group.members.length}
                </Text>
                <Text styles={{ root: { fontWeight: FontWeights.regular, fontSize: FontSizes.size14 } }}>{translateMainHouseHold('MEMBERS')}</Text>
            </Stack>
        );
        const fhs = (
            <Stack horizontal tokens={{ childrenGap: '4px' }}>
                <Text styles={groupDetailsBarBoldTextStyles} data-testid="group-short-details-fh-length">
                    {group.financialHoldings?.length || 0}
                </Text>
                <Text styles={{ root: { fontWeight: FontWeights.regular, fontSize: FontSizes.size14 } }}>
                    {translateMainHouseHold('FINANCIAL_HOLDINGS')}
                </Text>
            </Stack>
        );
        return (
            <Stack wrap horizontal tokens={{ childrenGap: '4px' }}>
                {members}
                <Text styles={groupDetailsBarBoldTextStyles}>•</Text>
                {fhs}
            </Stack>
        );
    };

    const missingGroupContent = useMemo(() => {
        return group.members.every(m => m.id !== group.primaryMember) || isNil(group.financialHoldings) || group.financialHoldings.length === 0;
    }, [group]);

    const renderGroupPrimaryIcon = () =>
        isPrimary && (
            <FontIcon iconName="FavoriteStarFill" style={{ fontSize: '10px', color: COLORS.white }} data-testid="group-short-details-primary-icon" />
        );

    const groupTooltipMessage = useMemo(() => {
        if (group.members.every(m => m.id !== group.primaryMember)) {
            if (isNil(group.financialHoldings) || group.financialHoldings.length === 0) {
                return translateMainHouseHold('MISSING_HOLDING_AND_PRIMARY');
            }
            return translateMainHouseHold('MISSING_PRIMARY');
        }
        return translateMainHouseHold('MISSING_HOLDING');
    }, [group]);

    const missingGroupTooltip = useMemo(
        () => ({
            content: groupTooltipMessage,
            directionalHint: DirectionalHint.rightCenter,
        }),
        []
    );

    const groupIconName = GroupIconType[group.type] ?? defaultGroupIconType;

    return (
        <Stack as="h3" horizontal styles={mergeStyleSets(groupDetailsBarStyles, styles)}>
            <Stack
                className="group-details-bar-icon"
                verticalAlign="center"
                horizontalAlign="center"
                tokens={{ childrenGap: '2px' }}
                styles={groupDetailsBarIconContainerStyles(themePrimary)}
            >
                <FontIcon iconName={groupIconName} style={groupDetailsBarIconStyles} data-testid="group-short-details-icon" />
                {renderGroupPrimaryIcon()}
            </Stack>
            <Stack grow={1} className="group-details-bar-text" horizontalAlign="start" styles={groupDetailsBarWrapper}>
                <OverflowText styles={groupDetailsBarTextStyles} text={group.name} overflowModeSelf />
                {getGroupDetailsText()}
            </Stack>
            {missingGroupContent && (
                <Stack.Item align="center">
                    <Indicator
                        size={16}
                        iconName="warning"
                        color={COLORS.red}
                        tooltipProps={missingGroupTooltip}
                        iconAriaLabel={translateMainHouseHold('ARIA_LABEL_WARNING')}
                    />
                </Stack.Item>
            )}
        </Stack>
    );
};
export default GroupDetailsBar;
