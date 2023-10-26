import { mergeStyleSets } from '@fluentui/react/lib/Styling';

const BASE_DIVIDER_CLASS_NAME = 'msfsi-divider';

export function getClassName(customClassName?: string) {
    const mergedStyles = mergeStyleSets({
        [BASE_DIVIDER_CLASS_NAME]: [customClassName, { padding: '0px', fontSize: '0px', height: 'initial' }],
    });

    return mergedStyles[BASE_DIVIDER_CLASS_NAME];
}
