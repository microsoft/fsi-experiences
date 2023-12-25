import React, { FC } from 'react';
import { Alignment, Stack } from '@fluentui/react/lib/Stack';
import { contentStackStyles, getTitleWrapperStyles, headerBox, titleStringStyles } from './SectionHeader.styles';
import Divider from '../Divider/Divider';
import { ITextStyles } from '@fluentui/react/lib/Text';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { OverflowText } from '../OverflowText/OverflowText';
import { ISeparatorStyles } from '@fluentui/react/lib/components/Separator/Separator.types';
export interface SectionHeaderProps {
    titleString: string;
    horizontalAlign?: Alignment;
    styles?: ITextStyles;
    headingLevel?: number;
    id?: string;
    dividerStyles?: Partial<ISeparatorStyles>;
    hideTitle?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = props => {
    const { titleString, children, styles, horizontalAlign = 'space-between', headingLevel = 2, id, dividerStyles, hideTitle } = props;

    const titleTextStyles = mergeStyleSets(titleStringStyles, styles);
    const titleWrapperStyles = getTitleWrapperStyles(hideTitle);

    return (
        <Stack verticalAlign="start" styles={headerBox}>
            <Stack horizontalAlign={horizontalAlign} horizontal styles={contentStackStyles}>
                {titleString && (
                    <Stack role="heading" aria-level={headingLevel} id={id} horizontal verticalAlign="center" styles={titleWrapperStyles}>
                        <OverflowText styles={titleTextStyles} text={titleString} overflowModeSelf />
                    </Stack>
                )}
                {children}
            </Stack>
            <Divider styles={dividerStyles} />
        </Stack>
    );
};
