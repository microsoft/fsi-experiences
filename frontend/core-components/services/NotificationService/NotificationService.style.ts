import { COLORS } from '../../constants/Colors';

export const notificationIconProps = (themePrimary: string) => {
    return {
        success: {
            iconName: 'Completed',
            styles: {
                root: {
                    color: COLORS.successIcon,
                },
            },
        },
        info: {
            iconName: 'Info',
            styles: {
                root: {
                    color: `${themePrimary}`,
                },
            },
        },
        error: {
            iconName: 'ErrorBadge',
            styles: {
                root: {
                    color: COLORS.red,
                },
            },
        },
    };
};
