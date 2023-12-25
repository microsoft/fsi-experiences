import React, { AriaAttributes, FC, ReactNode } from 'react';
import { IStackStyles, Stack } from '@fluentui/react/lib/components/Stack';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { iconStyles } from './TasksGroupCollapse.style';

export interface ITasksGroupCollapseProps {
    styles?: IStackStyles;
    disabled?: boolean;
    isOpen?: boolean;
    content: ReactNode;
    iconButtonStyles?: IIconStyles;
    contentWrapperStyles?: IStackStyles;
    iconAria?: AriaAttributes;
    headerAria?: AriaAttributes;
    headerRole?: string;
    onToggleIsOpen: (isOpen) => void;
}

const TasksGroupCollapse: FC<ITasksGroupCollapseProps> = ({
    children,
    content,
    styles,
    iconButtonStyles,
    contentWrapperStyles,
    iconAria,
    disabled,
    headerAria,
    headerRole,
    onToggleIsOpen,
    isOpen,
}) => {
    const iconName = isOpen ? 'ChevronDown' : 'ChevronRight';

    return (
        <Stack styles={styles}>
            <Stack role={headerRole} horizontal verticalAlign="center" {...headerAria}>
                <IconButton
                    disabled={disabled}
                    data-testid="tasks-group-collapse-icon"
                    onClick={() => onToggleIsOpen(!isOpen)}
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

export default TasksGroupCollapse;
