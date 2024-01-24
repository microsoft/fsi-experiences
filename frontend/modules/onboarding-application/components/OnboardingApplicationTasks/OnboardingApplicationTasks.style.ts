import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';

export const rootStyles: IStackStyles = {
    root: {
        padding: 16,
        backgroundColor: COLORS.loanTrackerBackground,
        overflow: 'auto',
        height: '100%',
    },
};

export const contentStyles = {
    root: {
        width: '100%',
        gap: 15,
    },
};

export const ToastNotificationStyles = { root: { '.ms-MessageBar-dismissSingleLine': { paddingBlockStart: '3px' } } };
