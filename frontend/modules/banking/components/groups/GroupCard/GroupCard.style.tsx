import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { IFacepileStyles } from '@fluentui/react/lib/components/Facepile/Facepile.types';
import { groupsSmallContainerSelector } from '../GroupsAndRelationshipsMainApp/GroupsAndRelationshipsMainApp.style';
import { maxSixColumnsGroupsSelector } from '../GroupsAndRelationshipsApp.const';

export const mainStackStyle: IStackStyles = {
    root: {
        background: COLORS.white,
        width: '100%',
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

const commonPersonaBeforeStyle = {
    position: 'absolute',
    content: "''",
    borderBottom: `1px solid ${COLORS.lightGray}`,
    width: '24px',
    right: '100%',
    bottom: '60%',
    marginRight: '8px',
    borderLeft: `1px solid ${COLORS.lightGray}`,
    height: '29px',
};
export const facepileStyles: Partial<IFacepileStyles> = {
    root: {
        marginLeft: 52,
        paddingBottom: '12px',
        position: 'relative',
        '&::before': {
            ...commonPersonaBeforeStyle,
        },

        [groupsSmallContainerSelector]: {
            marginLeft: 0,
        },
    },
};

export const groupCardTableHeaderStyle = {
    root: {
        paddingLeft: '52px',
        width: '100%',
        [groupsSmallContainerSelector]: {
            paddingLeft: 0,
            '.group-member-header': {
                width: 150,
            },
        },
    },
};

export const groupCardTableHeaderTextStyle = {
    root: {
        textAlign: 'start',
        color: COLORS.darkGray,
        fontWeight: FontWeights.semibold,
        fontSize: FontSizes.size12,

        '&.group-member-header': {
            width: 190,
        },
    },
};
export const groupCardIconStyle = { root: { fontSize: '16px' } };

export const groupsPersonaStyles: Partial<IFacepileStyles> = {
    root: {
        marginLeft: '52px',
        width: 190,
        position: 'relative',
        '&::before': {
            ...commonPersonaBeforeStyle,
            height: '50px',
        },
        [groupsSmallContainerSelector]: {
            marginLeft: 0,
            width: 150,
            '.ms-Persona-details': {
                width: 100,
            },
        },
        '.primary-member & .ms-TooltipHost': {
            fontSize: FontSizes.size14,
            fontWeight: FontWeights.semibold,
        },
        '.ms-Persona-details': {
            flex: 1,
        },
        '.ms-Persona-details:hover': {
            textDecoration: 'underline',
        },
        '.ms-Persona': {
            width: 190,
        },
    },
    member: {
        flex: 1,
        overflow: 'hidden',
    },
    members: { margin: 0 },
    itemButton: { minWidth: 0 },
};

export const groupCardShortDetailsStyles = {
    root: {
        [groupsSmallContainerSelector]: {
            padding: 0,
            '.group-details-bar-icon': {
                display: 'none',
            },
            '.group-details-bar-text': {
                paddingLeft: 0,
            },
        },
    },
};
export const closedCardStyles = (isSelected: boolean): IStackStyles => ({
    root: {
        display: isSelected ? 'none' : 'flex',
        [maxSixColumnsGroupsSelector]: {
            display: 'flex',
        },
    },
});

export const openedCardStyles = (isSelected: boolean): IStackStyles => ({
    root: {
        display: isSelected ? 'flex' : 'none',
        [maxSixColumnsGroupsSelector]: {
            display: 'none',
        },
    },
});

export const groupSeperatorStyles = {
    root: {
        padding: '0px 0px',
        height: '0px',
        marginLeft: '48px',
        [groupsSmallContainerSelector]: {
            marginLeft: 0,
        },
    },
};

export const cardMemberRootStyles = { root: { maxWidth: '100%' } };
