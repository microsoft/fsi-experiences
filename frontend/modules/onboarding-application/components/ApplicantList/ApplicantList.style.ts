import { FontSizes, FontWeights } from '@fluentui/theme';

export const widgetStyles = {
    root: {
        borderRadius: 2,
        boxShadow: ' 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        background: 'white',
        flex: 1,
        flexDirection: 'row',
    },
};

export const getWidgetStylesByStates = (needFullPage = false) => {
    return {
        root: {
            ...widgetStyles.root,
            height: needFullPage ? '100%' : 'auto',
        },
    };
};

export const errorProps = {
    styles: {
        title: {
            fontSize: FontSizes.size14,
            fontWeight: FontWeights.semibold,
            lineHeight: '16px',
        },
        subtitle: {
            padding: `8px 0px 0px`,
            lineHeight: '16px',
            fontSize: FontSizes.size12,
        },
        container: {
            flex: 1,
            padding: '14px',
        },
    },
};
