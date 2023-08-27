import { Link } from '@fluentui/react/lib/components/Link/Link';
import { MessageBar } from '@fluentui/react/lib/components/MessageBar/MessageBar';
import { Text } from '@fluentui/react/lib/Text';
import React, { FC, forwardRef } from 'react';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';
import type { IHighlightMessageBarProps } from './HighlightMessageBar.interface';
import { highlightMessageBarStyles, messageBarStyles } from './HighlightMessageBar.style';

const HighlightMessageBar: FC<IHighlightMessageBarProps> = forwardRef(({ styles = messageBarStyles, linkProps, ...props }, ref) => {
    const { text: linkText, ...restLink } = linkProps || {};
    const translate = useTranslation(namespaces.COMMON);
    return (
        <MessageBar ref={ref} styles={styles} {...props} dismissButtonAriaLabel={translate('CLOSE')}>
            <Text styles={highlightMessageBarStyles}>{props.highlight}</Text> {props.regular}
            {linkText && <Link {...restLink}>{linkText}</Link>}
        </MessageBar>
    );
});

export default HighlightMessageBar;
