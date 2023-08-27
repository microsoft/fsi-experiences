import { FontSizes, NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '../../../constants/Colors';

export const wizardStepSeparatorStyles = {
    root: {
        height: '36px',
        width: '10px',
        display: 'inline-flex',
        selectors: {
            '::after': {
                width: '2px',
                margin: '2px 0 2px -1px',
                background: COLORS.stepCircleRing,
            },
        },
    },
};

export const wizardStepDescriptionStyles = {
    root: {
        color: NeutralColors.gray130,
        fontSize: FontSizes.size12,
        textAlign: 'start',
        marginTop: '2px',
    },
};

export const wizardStepSubinfoStyles = {
    root: {
        padding: '0px 12px',
    },
};
