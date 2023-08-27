import { FontSizes } from '@fluentui/react/lib/Styling';
import { ISeparatorStyles } from '@fluentui/react/lib/components/Separator/Separator.types';

export const orSeperatorStyles: ISeparatorStyles = {
    content: {},
    root: { padding: 0, ':before': { display: 'none' } },
};

export const relativeDateInputsWrapperStyles = { root: { flex: 1, minWidth: 'calc(60% - 12px)' } };

export const relativeDateRadioWrapperStyles = { root: { display: 'flex', flexWrap: 'wrap', alignContent: 'center' } };

export const relativeDateAmountStyles = { root: { flex: 1 } };

export const relativeDateStyles = { root: { flex: 3 } };

export const datePickerStyles = { root: { width: 'auto' } };

export const relativeWrapperStyles = { inner: { flexDirection: 'row-reverse', justifyContent: 'flex-end' } };

export const describeRelativeDateStyles = { root: { paddingBlockStart: 4, fontSize: FontSizes.size12 } };
