/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
/// <reference types="react" />
import { IIconOptions, IPartialTheme } from '@fluentui/react/lib/Styling';
export interface StylerProps {
    theme?: IPartialTheme;
    themeOverrides?: Partial<IPartialTheme>;
    iconSubset?: {
        [key: string]: string | JSX.Element;
    };
    iconOptions?: Partial<IIconOptions>;
    scopedSettings?: any;
}
