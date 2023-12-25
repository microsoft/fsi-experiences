import { CSSProperties } from 'react';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { maxFourCloumns, maxSixCloumns } from '@fsi/core-components/dist/utilities/responsive/mediaQueries';

export const modalStyles = {
    root: { height: '100%' },
    main: {
        minWidth: 760,
        width: '75%',
        height: '70%',
        '.ms-Modal-scrollableContent': {
            height: '100%',
        },
        '@media(max-width: 1280px)': {
            width: '100%',
        },
        [maxSixCloumns]: {
            maxWidth: '100%',
            minWidth: '100%',
            maxHeight: '100%',
            width: '100%',
            height: '100%',
        },
    },
};

export const mainViewContentStyles: IStackStyles = {
    root: {
        overflow: 'auto',
        [maxFourCloumns]: {
            overflow: 'initial',
            flexDirection: 'column',
        },
    },
};

export const rootStyle: CSSProperties = { display: 'flex', flexDirection: 'column', height: '100%' };

export const contentStyles: IStackStyles = {
    root: {
        overflow: 'hidden',
        [maxFourCloumns]: {
            overflow: 'visible',
        },
    },
};
