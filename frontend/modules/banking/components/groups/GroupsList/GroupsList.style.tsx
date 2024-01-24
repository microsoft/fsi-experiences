import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';
import { maxSixColumnsGroupsSelector } from '../GroupsAndRelationshipsApp.const';
import { groupsSmallContainerSelector } from '../GroupsAndRelationshipsMainApp/GroupsAndRelationshipsMainApp.style';

export const groupsListContainerStyles = {
    root: {
        height: '100%',
        width: 415,
        paddingLeft: 21,
        [groupsSmallContainerSelector]: {
            paddingLeft: 0,
            width: 290,
            '.groups-line::before': {
                display: 'none',
            },
            '.group-card::before': {
                display: 'none',
            },
        },

        '.groups-line': {
            position: 'relative',
        },

        '.groups-line::before': {
            position: 'absolute',
            content: "''",
            borderLeft: '1px solid #8A8886',
            width: '20px',
            right: '100%',
            top: '-332px',
            marginRight: '18px',
            height: '350px',
        },

        '.group-card': {
            position: 'relative',
        },
        '.group-card::before': {
            position: 'absolute',
            content: "''",
            borderBottom: '1px solid #8A8886',
            borderLeft: '1px solid #8A8886',
            width: '20px',
            right: '100%',
            top: '-332px',
            marginRight: '18px',
            height: '344px',
        },
        [maxSixColumnsGroupsSelector]: {
            width: 'auto',
        },
    },
};

export const groupsListHeaderStyles = { root: { width: '100%' } };
export const groupsListHeaderTextStyles = { root: { fontWeight: FontWeights.semibold, fontSize: FontSizes.size16 } };

export const groupsListErrorStateStyles = {
    container: {
        padding: 0,
        justifyContent: 'normal',
    },
    subtitle: {
        padding: 0,
    },
    icon: {
        marginBottom: 10,
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

export const groupsEmptyStateCard = {
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

export const groupsListStyle: IStackStyles = {
    root: {
        width: '100%',
        marginBottom: '21px',
        overflow: 'auto',

        [maxSixColumnsGroupsSelector]: {
            overflow: 'initial',
        },
    },
};
