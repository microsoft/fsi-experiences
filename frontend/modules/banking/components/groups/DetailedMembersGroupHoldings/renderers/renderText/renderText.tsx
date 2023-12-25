import React, { FC } from 'react';
import { ITextStyles, Text } from '@fluentui/react/lib/Text';
import { fhTextStyles } from './renderText.style';

interface IrenderText {
    styles?: ITextStyles;
    text: string;
    name: string;
}

const renderText: FC<IrenderText> = ({ styles = fhTextStyles, text, name }) => (
    <Text styles={styles} data-testid={`group-detailed-holdings-row-cell-${name}`}>
        {text}
    </Text>
);

export default renderText;
