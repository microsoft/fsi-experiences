import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { COLORS } from './Colors';

export const INDICATOR_TYPE_MAP = {
    timeSensitive: { color: 'none', icon: 'clock', messageBarType: MessageBarType.warning, iconAriaLabel: 'ARIA_LABEL_TIME_SENSITIVE' },
    warning: { color: COLORS.red, icon: 'warning', messageBarType: MessageBarType.severeWarning, iconAriaLabel: 'ARIA_LABEL_WARNING' },
    fyi: { color: COLORS.blue, icon: 'info', messageBarType: MessageBarType.info, iconAriaLabel: 'ARIA_LABEL_INFO' },
};
