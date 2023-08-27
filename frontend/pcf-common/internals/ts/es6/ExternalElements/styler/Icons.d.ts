/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
/// <reference types="react" />
import { IIconOptions } from '@fluentui/react/lib/Styling';
export declare const BAFIcons: {
    [key: string]: string | JSX.Element;
};
export declare const BAFIconOptions: Partial<IIconOptions>;
export declare const icons: (iconSubset?: {
    [key: string]: string | JSX.Element;
}, iconOptions?: Partial<IIconOptions>) => void;
