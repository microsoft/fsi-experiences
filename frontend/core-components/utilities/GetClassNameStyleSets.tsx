import { mergeStyleSets } from '@fluentui/react/lib/Styling';

type GetClassNameStyleSetsProps<TStyleSet> = {
    baseClassName: string;
    styles: TStyleSet;
    customClassNames?: string;
    underlinedClass?: string;
};

export function getClassNameStyleSets<TStyleSet>({
    baseClassName,
    styles,
    customClassNames,
    underlinedClass,
}: GetClassNameStyleSetsProps<TStyleSet>) {
    let customClasses = customClassNames ? ` ${customClassNames}` : '';

    if (underlinedClass) {
        customClasses += ' ' + underlinedClass;
    }

    return mergeStyleSets({
        [baseClassName]: [customClasses, styles],
    });
}
