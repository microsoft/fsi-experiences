import { IIconProps } from '@fluentui/react/lib/components/Icon/Icon.types';
import { NeutralColors } from '@fluentui/react/lib/Theme';
import { IButtonStyles } from '@fluentui/react/lib/components/Button/Button.types';

export const addIcon = (themePrimary: string): IIconProps => ({ iconName: 'Add', styles: { root: { color: themePrimary } } });

export const addEventStyle: IButtonStyles = {
    root: {
        margin: '0 10px',
        color: NeutralColors.gray160,
    },
};
