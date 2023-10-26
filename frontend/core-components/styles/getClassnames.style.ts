import { IStyle, mergeStyleSets } from '@fluentui/react/lib/Styling';

export const getClassNames = (...styles: IStyle[]) => {
    return mergeStyleSets(...styles);
};
