import { FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';
import { MEDIA_QUERY_BREAKPOINT_SMALL } from '../../../constants/StyleSelectors.consts';
import { CLOSE_LIST_ATTR } from './LoanApplicationList.const';

export const LoanApplicationListWidth = '350px';

export const LoanApplicationListStyles = {
    root: {
        width: '100%',
        height: '100%',
        paddingBottom: '23px',
        transition: 'visibility 0.01s, transform 0.5s 0.1s ease-out',
        transform: 'translateX(0vw)',
        visibility: 'visible',
        backgroundColor: NeutralColors.white,
        [`&[${CLOSE_LIST_ATTR}]`]: {
            transform: 'translateX(-150vw)',
            visibility: 'hidden',
            transition: 'transform 0.5s ease-out, visibility 0s 0.6s',
            [`@media screen and (min-width: ${MEDIA_QUERY_BREAKPOINT_SMALL})`]: {
                transition: 'none',
                transform: 'translateX(0vw)',
                visibility: 'visible',
            },
        },
        [`@media screen and (min-width: ${MEDIA_QUERY_BREAKPOINT_SMALL})`]: {
            transition: 'none',
            width: LoanApplicationListWidth,
        },
    },
};

export const ListGroupHeaderStyles = {
    root: {
        height: '32px',
        borderBottom: `1px solid ${NeutralColors.gray40}`,
    },
    title: {
        fontSize: '14px',
    },
    expand: {
        height: '20px',
        width: '20px',
        marginLeft: '16px',
    },
    groupHeaderContainer: {
        height: '32px',
        backgroundColor: NeutralColors.gray10,
        fontWeight: FontWeights.regular,
    },
};

export const ScrollableListStyles: any = {
    root: {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: 'inherit',
        '@media screen and (max-width: 500px)': {
            minHeight: '130px',
        },
    },
};
