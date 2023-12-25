import { ReactNode } from 'react';
import { IStyle } from '@fluentui/react/lib/Styling';
import { DirectionalHint } from '@fluentui/react/lib/components/Callout';
import { EditableFieldsProps } from './EditableFields';

export interface SectionHeaderProps {
    title: string;
    infoCallout?: {
        direction?: DirectionalHint;
        content: string | ReactNode;
        ariaLabel: string;
    };
    subHeader?: {
        title: string;
        tagText: string;
        hoverTitle?: string;
    };
}

export interface EditableInfoSectionProps extends EditableFieldsProps {
    header: SectionHeaderProps;
    styles?: {
        root?: IStyle;
        header?: IStyle;
    };
    toggleEditMode: (value: boolean) => void;
    onReset?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    sectionId?: string;
    needFocusOnEditBtn?: boolean;
    editFieldsDisabled?: boolean;
}
