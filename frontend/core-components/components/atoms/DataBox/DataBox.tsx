import React, { Component } from 'react';
import { IDataBoxProps } from './DataBox.interface';
import { footerStyle, getBoxLabelStyles, valueStyle, wrapperStyles } from './DataBox.style';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';

export class DataBox extends Component<IDataBoxProps> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { boxDetails, styles, stackTokens, valueRender, footerRender, children } = this.props;

        const { label, value = 'N/A', footer, labelColor } = boxDetails;

        const labelWithColorStyle = getBoxLabelStyles(labelColor);
        const valueWithFontStyle = mergeStyleSets(valueStyle, styles);

        return (
            <Stack styles={wrapperStyles} data-testid={`databox-container-${label}`} tokens={stackTokens || {}}>
                <Text styles={labelWithColorStyle} title={label} data-testid={`databox-label-${label}`}>
                    {label}
                </Text>
                {children ? (
                    children
                ) : (
                    <Text styles={valueWithFontStyle} data-testid={`databox-value-${value}`}>
                        {valueRender ? valueRender(value) : value}
                    </Text>
                )}

                {footer && (
                    <Text styles={footerStyle} data-testid={`databox-footer-${footer}`}>
                        {footerRender ? footerRender(footer) : footer}
                    </Text>
                )}
            </Stack>
        );
    }
}

export default DataBox;
