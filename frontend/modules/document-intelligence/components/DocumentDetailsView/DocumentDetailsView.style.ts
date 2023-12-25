import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants';

export const documentDetailsViewStyles: IStackStyles = {
    root: {
        height: '100%',
        overflow: 'hidden',
        paddingInline: '24px',
    },
};

export const documentDetailsViewInnerStyles: IStackStyles = {
    root: {
        height: '100%',
        overflow: 'hidden',
        gap: '18px',
    },
};

export const documentDetailsHeaderStyles = {
    root: {
        paddingBlock: '16px',
        '@media(max-width: 600px)': {
            padding: '8px',
        },
    },
};

export const documentDetailsHeaderTextStyles = { root: { fontSize: FontSizes.size20, fontWeight: FontWeights.semibold, color: COLORS.darkGray160 } };

export const documentDetailsHeaderIconProps: IIconProps = { iconName: 'Cancel', styles: { root: { color: COLORS.darkGray160 } } };

export const documentFileContentStyles: IStackStyles = { root: { background: COLORS.lightGray10 } };

export const messageBarErrorStyles: IStackStyles = { root: { marginBlock: '8px' } };

export const loadingPaneStyles = {
    root: {
        alignSelf: 'center',
        width: '360px',
    },
};
