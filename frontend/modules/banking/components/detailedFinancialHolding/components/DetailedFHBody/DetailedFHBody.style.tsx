import { IPivotStyleProps, IPivotStyles } from '@fluentui/react/lib/components/Pivot/Pivot.types';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export const detailedFHBodyLoadingStyle = {
    padding: '15px 0px',
};
export const detailedFHBodyPivotStyles: IStyleFunctionOrObject<IPivotStyleProps, IPivotStyles> = {
    root: {
        display: 'flex',
        justifyContent: 'left',
        padding: '0px 10px',
    },
    itemContainer: {
        flex: 1,
    },
};

export const detailedFHBodyPivotItemStyles = mergeStyles({
    height: '100%',
});

export const detailedFHBodyPivotWrapperStyles = mergeStyles({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
});
