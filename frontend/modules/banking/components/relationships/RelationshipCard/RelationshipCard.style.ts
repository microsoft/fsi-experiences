import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes, FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { leftCardCollapsedWidth, leftCardWidth, maxSixColumnsGroupsSelector } from '../../../components/groups/GroupsAndRelationshipsApp.const';
import { groupsSmallContainerSelector } from '../../../components/groups/GroupsAndRelationshipsMainApp/GroupsAndRelationshipsMainApp.style';

export const relationshipListContainerStyles = {
    root: {
        width: leftCardWidth,
        paddingLeft: 21,
        [groupsSmallContainerSelector]: {
            paddingLeft: 0,
            width: leftCardCollapsedWidth,
            '.groups-line::before': {
                display: 'none',
            },
            '.relationship-card::before': {
                display: 'none',
            },
        },
        [maxSixColumnsGroupsSelector]: {
            width: 'auto',
        },

        '.relationship-card': {
            position: 'relative',
        },
        '.relationship-card::before': {
            position: 'absolute',
            content: "''",
            borderBottom: `1px solid ${NeutralColors.gray110}`,
            borderLeft: `1px solid ${NeutralColors.gray110}`,
            width: '20px',
            right: '100%',
            top: '-2030px',
            marginRight: '18px',
            height: '2043px',
        },
    },
};

export const relationshipCardStyle: IStackStyles = {
    root: {
        background: COLORS.white,
        borderRadius: '2px',
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        paddingLeft: '12px',
        paddingTop: '12px',
        paddingRight: '12px',
        '&.group-selected': {
            border: `1px solid ${COLORS.black}`,
            [maxSixColumnsGroupsSelector]: {
                border: 'none',
            },
        },
        '&:not(.group-selected):hover': {
            cursor: 'pointer',
            opacity: '0.8',
        },
    },
};

export const relationshipsListHeaderStyles = { root: { width: '100%' } };
export const relationshipsListHeaderTextStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size16 } };

export const relationshipsCardErrorStateStyles = {
    container: {
        padding: 0,
        justifyContent: 'normal',
    },
    subtitle: {
        padding: 0,
    },
    icon: {
        marginBottom: 15,
        paddingTop: 5,
    },
    title: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        whiteSpace: 'pre-line',
        textAlign: 'center',
        color: NeutralColors.gray160,
        padding: '0px 0px 15px 0px',
    },
};

export const relationshipsEmptyStateCard = {
    title: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
    },
    container: {
        padding: `16px`,
        height: '70%',
    },
    icon: {
        marginBottom: 20,
    },
};

export const createRelationShipWrapper = { root: { marginLeft: 'auto' } };
