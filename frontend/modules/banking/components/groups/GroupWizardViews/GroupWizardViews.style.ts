import { IStackStyles } from '@fluentui/react/lib/Stack';
import { maxFourCloumns, maxSixCloumns, maxTwoCloumns } from '@fsi/core-components/dist/utilities/responsive/mediaQueries';

const createPaddingWithStaticBlockStart = padding => `20px ${padding}px ${padding}px ${padding}px`;

export const rootStyles: IStackStyles = {
    root: {
        padding: createPaddingWithStaticBlockStart(32),
        overflow: 'auto',
        [maxSixCloumns]: { padding: createPaddingWithStaticBlockStart(24) },
        [maxFourCloumns]: { overflow: 'initial' },
        [maxTwoCloumns]: { padding: createPaddingWithStaticBlockStart(16) },
    },
};
