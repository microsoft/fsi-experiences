import React, { FC, useCallback, useMemo } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { NeutralColors } from '@fluentui/theme/lib/colors/';
import { PreferredContactMethod } from '../../../enums/PreferredContactMethod';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { FontSizes } from '@fluentui/react/lib/Theme';

interface CommunicationItemProps {
    contactMethod: PreferredContactMethod;
    iconName: string;
    isPreferred: boolean;
    text?: string;
}
export const nonPreferredColor = NeutralColors.gray160;

export const CommunicationItem: FC<CommunicationItemProps> = props => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const getIconColor = useCallback(
        (isPreferred: boolean) => {
            if (isPreferred) return themePrimary;
            return nonPreferredColor;
        },
        [themePrimary]
    );

    const { contactMethod, iconName, isPreferred, text } = props;

    const iconStyle = useMemo(() => {
        return {
            root: {
                color: getIconColor(isPreferred),
                cursor: 'default',
                fontSize: FontSizes.size16,
            },
        };
    }, [contactMethod, isPreferred]);

    return <Icon title={text} aria-label={text} styles={iconStyle} iconName={iconName} data-testid="communication-icon" />;
};

export default CommunicationItem;
