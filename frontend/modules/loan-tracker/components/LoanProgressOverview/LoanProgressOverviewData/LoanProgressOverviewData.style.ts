import { ISeparatorStyleProps, ISeparatorStyles } from '@fluentui/react/lib/components/Separator/Separator.types';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { summaryDataStyles } from '../../../styles/Common.style';

export const dividerStyles: IStyleFunctionOrObject<ISeparatorStyleProps, ISeparatorStyles> | undefined = {
    root: {
        position: 'absolute',
        insetInlineStart: 0,
        width: '100%',
        zIndex: 1,
    },
};

export const LoanProgressOverviewDataStyles: IStackStyles = mergeStyleSets(summaryDataStyles, {
    root: {
        padding: '16px 12px',
    },
});
