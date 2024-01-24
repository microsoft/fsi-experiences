import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { IStackItemStyles } from '@fluentui/react/lib/components/Stack/StackItem/StackItem.types';
import { FontSizes, FontWeights, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { CSSProperties } from 'react';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { createClassSelectorRange } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';
import { IMessageBarStyles } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import { GROUPS_APP_RESPONSIVE_CLASS, maxSixColumnsGroupsSelector } from '../GroupsAndRelationshipsApp.const';
import { CommunicationColors } from '@fluentui/react/lib/Theme';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';

export const detailsListStylesShowingIcons = mergeStyleSets({
    contentWrapper: {
        '.ms-DetailsRow:hover': {
            '.control-btn': {
                display: 'block !important',
            },
        },
    },
});

export const leftPanelRoot = ({ splitLayout, isSticky }): IStackStyles =>
    mergeStyleSets(
        {
            root: {
                justifyContent: isSticky ? 'space-between' : 'flex-start',
                height: splitLayout ? 'auto' : '100%',
                '&:before': {
                    position: 'absolute',
                    content: "''",
                    borderBottom: '1px solid #8A8886',
                    borderLeft: '1px solid #8A8886',
                    width: '32px',
                    right: '100%',
                    top: '-80px',
                    marginRight: '-15px',
                },
                [maxSixColumnsGroupsSelector]: {
                    justifyContent: 'flex-start',
                },
            },
        },
        detailsListStylesShowingIcons
    );

export const loadingWindowStyle: CSSProperties = {
    backgroundColor: COLORS.white,
    opacity: 0.8,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    right: 0,
    bottom: 0,
};

export const mainDetailsStyle: IStackStyles = {
    root: {
        width: '100%',
        height: '100%',
        borderRadius: '2px',
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        background: COLORS.white,
    },
};

export const mainDetailsWrapperStyle = (isSelectedGroup: boolean): IStackItemStyles => ({
    root: {
        width: '100%',
        overflow: 'hidden',
        marginTop: '16px',
        marginBottom: '16px',
        zIndex: '2',
        [maxSixColumnsGroupsSelector]: {
            display: isSelectedGroup ? 'flex' : 'none',
            overflow: 'auto',
            marginLeft: '0 !important',
        },
    },
});

export const groupsSmallContainerSelector = `${createClassSelectorRange(0, 7, GROUPS_APP_RESPONSIVE_CLASS)}`;

export const rootStyles = (splitLayout): IStackStyles => ({
    root: {
        overflow: 'auto',
        inset: 0,
        height: '100%',
        background: COLORS.gray,
        width: '100%',
        position: splitLayout ? 'relative' : 'absolute',
    },
});

export const mainStackStyles = (splitLayout): IStackStyles =>
    mergeStyleSets({
        root: {
            padding: '0 40px',
            flex: 1,
            overflow: splitLayout ? 'initial' : 'auto',

            [groupsSmallContainerSelector]: {
                padding: '0 15px',
            },
            [maxSixColumnsGroupsSelector]: {
                overflow: 'auto',
            },
        },
    });

export const mainGroupAppMessageBarStyle: IMessageBarStyles = {
    root: {
        zIndex: 3,
        position: 'relative',
    },
};

export const leftPanelWrapper = (isSelectedGroup: boolean): IStackStyles => ({
    root: {
        marginBlock: 16,

        [maxSixColumnsGroupsSelector]: {
            position: 'relative',
            flex: 1,
            display: isSelectedGroup ? 'none' : 'flex',
        },
    },
});

export const focusZoneStyles: CSSProperties = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flex: 1, overflow: 'auto' };

export const groupsPanelWrapper: IStackStyles = { root: { minHeight: '100px' } };
export const relationshipPanelWrapper: IStackStyles = { root: { minHeight: '100px' } };

export const refDivCss: CSSProperties = {
    display: 'flex',
    flex: 1,
    height: '100%',
};

export const navigationStyles: IStackStyles = {
    root: {
        background: COLORS.white,
        padding: '16px 24px',
        display: 'none',
        [maxSixColumnsGroupsSelector]: {
            display: 'flex',
        },
    },
};

export const navigationTextStyles: ITextStyles = {
    root: {
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size20,
        lineHeight: 28,
    },
};

export const backIconStyles = { root: { color: CommunicationColors.primary } };

export const mainAppStyles = ({ isSticky }): IStackStyles => ({ root: { overflow: isSticky ? 'auto' : 'initial' } });
