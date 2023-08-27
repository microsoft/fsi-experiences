import { NeutralColors } from '@fluentui/react/lib/Theme';
import { COLORS } from '@fsi/core-components/dist/constants';

export const wrapperStyles = {
    root: {
        background: COLORS.white,
        height: 'auto',
        minHeight: 'fit-content',
        '@media screen and (min-width: 1000px)': {
            minWidth: 345,
            borderInline: `1px solid ${NeutralColors.gray40}`,
        },
    },
};

export const responsiveApplicantListStyles = {
    root: {
        width: 320,
        '@media screen and (max-width: 480px)': {
            minWidth: 189,
        },
    },
    dropdownItem: { padding: '23px 8px' },
    dropdownItemSelected: { padding: '23px 8px' },
};

export const responsiveApplicantListStackStyles = {
    root: {
        padding: '16px',
        borderBlockEnd: `1px solid ${NeutralColors.gray20}`,
    },
};
