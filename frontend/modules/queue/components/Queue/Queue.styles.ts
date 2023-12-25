import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { QUEUE_STATUS } from '../../constants/Queue.const';

export const widgetStyles = { root: { flex: 1, maxWidth: '327px' } };

export const searchStyles = {
    searchbox: {
        border: `1px solid ${COLORS.lightGray83}`,
        minHeight: '43px',
        borderStartEndRadius: 0,
        borderEndEndRadius: 0,
        '&:not(:focus):not(:focus-visible):not(:hover):not(.is-active)': {
            borderInlineEndWidth: 0,
        },
    },
};

export const getQueueListStyles = (themeColor: string) => {
    return {
        queueListGroupHeader: {
            paddingInlineEnd: '22px',
        },
        queueListRow: {
            '--outline-color': themeColor,
            ':hover': {
                cursor: 'pointer',
            },
        },
    };
};

export const timeStyles = { overflow: 'hidden', textOverflow: 'ellipsis' };

const TAG_STYLES = {
    [QUEUE_STATUS.APPROVED]: {
        '--tag-end-border-color': COLORS.midGreen,
        '--tag-end-background': COLORS.lightGreen,
        '--tag-end-color': COLORS.darkGreen27,
    },
    [QUEUE_STATUS.REJECTED]: {
        '--tag-end-border-color': COLORS.lightRed89,
        '--tag-end-background': COLORS.lightRed97,
        '--tag-end-color': COLORS.darkRed42,
    },
};

export const DATA_LAYOUT = {
    COMPACT: 'compact',
};

export const getQueueCardStyles = ({ status }: { status: keyof typeof QUEUE_STATUS }) => {
    return {
        card: {
            paddingBlock: '9px',
            paddingInline: '8px 22px',
            border: 0,
            ...TAG_STYLES[status],
            [`&[data-layout="${DATA_LAYOUT.COMPACT}"]`]: {
                gridTemplateRows: 'none',
            },
            '&:hover': {
                background: 'none',
            },
        },
    };
};
