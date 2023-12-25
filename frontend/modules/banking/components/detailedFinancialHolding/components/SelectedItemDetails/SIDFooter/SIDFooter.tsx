import React, { Component } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Separator } from '@fluentui/react/lib/Separator';
import { SIDFooterDataBox } from '../SIDFooterDataBox/SIDFooterDataBox';
import { ISIDFooterProps } from './SIDFooter.interface';
import { FHDataBoxDetails } from '../../FHDataBox';

export class SIDFooter extends Component<ISIDFooterProps> {
    counter: number;
    constructor(props) {
        super(props);
        this.counter = 0;
    }

    renderRows(list: FHDataBoxDetails[][]) {
        return list.map(rowList => {
            const rowMap = rowList.map(item => <SIDFooterDataBox entity={this.props.entity} key={this.counter++} boxDetails={item} />);

            if (rowMap.length === 0) {
                return (
                    <Stack.Item align="auto" key={this.counter++} data-testid={'footer-seperator'}>
                        <Separator />
                    </Stack.Item>
                );
            }

            return (
                <Stack.Item align="auto" key={this.counter++} data-testid={'footer-main-area'}>
                    <Stack horizontal wrap>
                        {rowMap}
                    </Stack>
                </Stack.Item>
            );
        });
    }

    render() {
        if (!this.props.data) {
            return '';
        }

        return <Stack>{this.renderRows(this.props.data)}</Stack>;
    }
}

export default SIDFooter;
