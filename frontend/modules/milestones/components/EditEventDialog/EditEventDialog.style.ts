import { ILabelStyles } from '@fluentui/react/lib/components/Label/Label.types';
import { CSSProperties } from 'react';

export const dateButtonStyle: CSSProperties = {
    width: '100%',
    alignContent: 'start',
};

export const editEventModalStyle = {
    main: {
        selectors: {
            ['@media (min-width: 480px)']: {
                maxWidth: 493,
                width: 493,
            },
        },
    },
};

export const labelStyles: ILabelStyles = { root: { paddingBlockStart: '4px' } };
