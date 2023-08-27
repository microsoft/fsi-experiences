/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */
import * as React from 'react';
import { StylerProps } from './Styler.types';
export { BusinessAppStyles } from './BusinessAppStyles';
export { TeamsStyles } from './TeamsStyles';
export { FabricDarkStyles } from './FabricDarkStyles';
export declare class Styler extends React.Component<StylerProps> {
    static defaultProps: {
        theme: import("@fluentui/react/lib/Styling").IPartialTheme;
        themeOverrides: {};
    };
    constructor(props: StylerProps);
    render: () => JSX.Element;
}
