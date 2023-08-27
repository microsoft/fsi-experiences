import { NeutralColors } from '@fluentui/react/lib/Theme';

export const TopicCardStyle = {
    root: {
        backgroundColor: 'inherit',
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        borderRadius: '2px',
        color: NeutralColors.gray160,
        margin: '0 32px 16px 0',
    },
    labelWrapper: {
        height: '62px',
        maxWidth: '336px',
        width: '336px',
        textAlign: 'left',
        margin: '12px 0',
    },
    innerField: {
        padding: '0px',
        textAlign: 'left',
    },
    field: {
        padding: '12px',
        alignItems: 'flex-start',
        borderWidth: '2px',
        selectors: {
            '::before': {
                border: 'none',
                backgroundColor: 'transparent',
            },
            '::after': {
                border: 'none',
            },
        },
    },
};
