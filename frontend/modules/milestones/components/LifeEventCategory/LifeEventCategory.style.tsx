import { CSSProperties } from 'react';
import { NeutralColors } from '@fluentui/theme/lib/colors/FluentColors';
import { ITextStyles } from '@fluentui/react/lib/components/Text/Text.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { fadeInAnimation } from '@fsi/core-components/dist/styles/Animations.style';

export const lifeEventCategoryStyles: IStackStyles = {
    root: {
        boxSizing: 'border-box',
        animationName: fadeInAnimation,
        animationDuration: '0.3s',
        minWidth: '156px',
        height: '110px',
        boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
        padding: 12,
        marginBottom: 12,
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '2px',
        transition: 'all 0.5s',
        '&:hover': {
            boxShadow: '0px 1.2px 3.6px rgba(0, 0, 0, 0.1), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)',
        },
    },
};

export const focusCategoryIndicatorStyle: CSSProperties = {
    position: 'absolute',
    right: '4px',
    top: '4px',
    marginTop: 0,
    zIndex: 100,
};

export const eventsText: ITextStyles = {
    root: {
        fontSize: 12,
        color: NeutralColors.gray130,
        lineHeight: 16,
    },
};
