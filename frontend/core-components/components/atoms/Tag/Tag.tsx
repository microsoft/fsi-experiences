import React, { FC } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';
import { IStyle } from '@fluentui/react/lib/Styling';
import { defaultTagStyles } from './Tag.style';

export interface TagStyles {
    root?: IStyle;
    text?: IStyle;
}
export interface TagProps {
    text: string;
    styles?: TagStyles;
}

const Tag: FC<TagProps> = ({ text, styles }) => {
    const styleSet = mergeStyleSets(defaultTagStyles, styles);

    return (
        <div className={styleSet.root} data-testid="tag-component">
            <Text className={styleSet.text} data-testid="tag-text">
                {text}
            </Text>
        </div>
    );
};
export default Tag;
