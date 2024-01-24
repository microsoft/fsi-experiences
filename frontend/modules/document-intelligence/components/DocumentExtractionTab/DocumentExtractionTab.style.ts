import { NeutralColors } from '@fluentui/react/lib/Theme';
import { IStackStyles, IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';

export const loadingStyles = { root: { height: '100%', justifyContent: 'center' } };

export const wrapperStyles: IStackStyles = {
    root: {
        padding: '12px 16px',
        background: NeutralColors.gray10,
        height: '100%',
        overflow: 'auto',
    },
};

export const wrapperTokens: IStackTokens = { childrenGap: 18 };
