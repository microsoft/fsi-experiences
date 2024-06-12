import React, { Component } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { FontWeights, FontSizes } from '@fluentui/theme/lib/fonts/FluentFonts';
import { dataBoxStyles } from './SIDFooterDataBox.style';
import { ISIDFooterDataBoxProps } from './SIDFooterDataBox.interface';
import FHDataBox from '../../FHDataBox/FHDataBox';

export class SIDFooterDataBox extends Component<ISIDFooterDataBoxProps> {
    public static defaultProps = {
        fontSize: FontSizes.size16,
    };

    render() {
        const { isExtended } = this.props;
        const styles = { root: { fontSize: this.props.fontSize, fontWeight: FontWeights.regular } };
        return (
            <Stack.Item styles={dataBoxStyles({ isExtended })} align="auto" data-testid={`footer-sid-databox`}>
                <FHDataBox entity={this.props.entity} boxDetails={this.props.boxDetails} styles={styles} />
            </Stack.Item>
        );
    }
}

export default SIDFooterDataBox;
