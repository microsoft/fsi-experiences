import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const widgetStyles = { root: { flex: 1, flexDirection: 'row' } };

export const dividerStyles = {
    root: {
        // Change background only when high-contrast is off, otherwise use the default FluentUI styles
        '@media screen and not (-ms-high-contrast: active), not (forced-colors: active)': {
            '::after': { background: COLORS.lightGray83 },
        },
        zIndex: 0,
    },
};

export const modelFormContainerStyles = { display: 'flex', flex: 3, borderBlockStart: `1px solid ${COLORS.lightGray83}` };
