import { mergeStyles } from '@fluentui/react/lib/Styling';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { DocumentStatusesIcons } from '../../../constants/LoanDocument.consts';
import { FontSizes, FontWeights } from '@fluentui/theme/lib/fonts/FluentFonts';

export const mainViewerStyle = {
    root: {
        height: '100%',
    },
};

export const headerIconStyle = (status: number) => {
    return {
        color: DocumentStatusesIcons[status].color,
        fontSize: '32px',
    };
};

export const footerStyles = {
    root: {
        padding: '14px 24px',
        '@media(max-width: 600px)': {
            padding: '7px 24px',
        },
    },
};

export const headerStyles = {
    root: {
        padding: '16px',
        '@media(max-width: 600px)': {
            padding: '8px',
        },
    },
};

export const documentContainerStyle = {
    root: {
        backgroundColor: COLORS.instrumentGrey,
        height: '100%',
    },
};

export const documentIframeContainerStyle = mergeStyles({
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
});

export const documentViewerContainerErrorStyle = {
    subtitle: {
        '@media(max-width: 600px)': {
            paddingBlockEnd: '10px',
        },
    },
    icon: {
        ['& .ms-Image']: {
            display: 'flex',
            justifyContent: 'center',
            ['& IMG']: {
                width: 'clamp(100px, 50vmin, 200px)',
                maxWidth: '100%',
            },
        },
    },
};

export const documentFrameStlye = mergeStyles({
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    position: 'absolute',
});

export const cancelIconProps = {
    iconName: 'Cancel',
};

export const uploadIconProps = (primaryColor: string) => ({
    iconName: 'Upload',
    color: primaryColor,
});

export const resetIconProps = (primaryColor: string) => ({
    iconName: 'RevToggleKey',
    color: primaryColor,
});

export const headerTextStyles = { root: { fontSize: FontSizes.size20, fontWeight: FontWeights.semibold } };
