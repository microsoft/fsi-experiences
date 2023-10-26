import React, { FC, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { ICollapseProps } from './Collapse.interface';
import { iconStyles } from './Collapse.style';

const Collapse: FC<ICollapseProps> = ({
    children,
    content,
    styles,
    iconButtonStyles,
    contentWrapperStyles,
    iconAria,
    disabled,
    defaultOpen = false,
    headerAria,
    headerRole,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const iconName = isOpen ? 'ChevronDown' : 'ChevronRight';
    const toggleIsOpen = () => setIsOpen(prevIsOpen => !prevIsOpen);

    return (
        <Stack styles={styles}>
            <Stack role={headerRole} horizontal verticalAlign="center" {...headerAria}>
                <IconButton
                    disabled={disabled}
                    data-testid="collapse-icon"
                    onClick={toggleIsOpen}
                    styles={iconButtonStyles}
                    iconProps={{ iconName, styles: iconStyles }}
                    aria-expanded={isOpen}
                    {...iconAria}
                />
                {content}
            </Stack>
            <Stack styles={contentWrapperStyles}>{isOpen && children}</Stack>
        </Stack>
    );
};

export default Collapse;
