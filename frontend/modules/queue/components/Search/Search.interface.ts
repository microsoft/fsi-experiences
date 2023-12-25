import { AriaAttributes } from 'react';
import { ISearchBoxProps, ISearchBoxStyles } from '@fluentui/react/lib/components/SearchBox/SearchBox.types';
import { IStyle } from '@fluentui/react/lib/Styling';

export interface ISearchStyles extends ISearchBoxStyles {
    wrapper?: IStyle;
    searchbox?: IStyle;
}

export interface ISearchProps extends ISearchBoxProps {
    wrapperAriaAttributes: AriaAttributes;
    id?;
    wrapperRole?: string;
    styles?: ISearchStyles;
}
