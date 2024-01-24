import { ITextFieldProps, TextField } from '@fluentui/react/lib/TextField';
import React, { FC, useEffect, useState, useRef, forwardRef, useCallback } from 'react';
import { textFieldEditModeStyles, textFieldReadModeStyles } from './EditableText.style';
import { LabelWithEditAndTag } from './LabelWithEditAndTag';
import { useId } from '@fluentui/react-hooks';
import { mergeStyleSets } from '@fluentui/react';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { EditableTextProps } from './EditableText.interface';

export const EditableText: FC<EditableTextProps> = forwardRef(
    ({ selfEdit, readOnly, labelTagProps, placeholder, onDoneEditing, labelStyles, iconStyles, onEditModeChange, ...props }, parentRef) => {
        const inputRef = useRef<HTMLInputElement>();
        const editButtonRef = useRef<HTMLButtonElement>();
        const [inEditMode, setInEditMode] = useState(!readOnly);

        const openEditMode = () => {
            setInEditMode(true);
            onEditModeChange?.(true);
        };

        const onSave = () => {
            setInEditMode(false);
            onDoneEditing?.((inputRef.current as HTMLInputElement)?.value);
        };

        const {
            palette: { themePrimary },
        } = useTheme();

        const inputId = useId('fsi-self-edit--input', props.id);

        const textEditModeStyles = {
            fieldGroup: {
                ...textFieldEditModeStyles.fieldGroup,
                selectors: {
                    '::after': {
                        borderRadius: '4px',
                        border: `1px solid ${themePrimary}`,
                    },
                },
            },
        };

        useEffect(() => {
            inEditMode && selfEdit && (inputRef.current as HTMLInputElement)?.focus();
        }, [inEditMode]);

        useEffect(() => {
            setInEditMode(!readOnly);
        }, [readOnly]);

        const onRenderLabel = (inputProps?: ITextFieldProps) => {
            return (
                <LabelWithEditAndTag
                    text={inputProps?.label as string}
                    required={inputProps?.required}
                    withEditButton={selfEdit}
                    editMode={!inputProps?.readOnly}
                    onEditClick={inputProps?.readOnly ? openEditMode : onSave}
                    tagProps={labelTagProps}
                    inputId={inputId}
                    // eslint-disable-next-line
                    // @ts-ignore
                    ref={editButtonRef}
                    styles={labelStyles}
                    iconStyles={iconStyles}
                />
            );
        };

        const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;

            onSave();
            setTimeout(() => (editButtonRef?.current as HTMLButtonElement)?.focus(), 0);
        };

        const styles = mergeStyleSets(inEditMode ? textEditModeStyles : textFieldReadModeStyles, props.styles);

        /* istanbul ignore next */
        const updateRef = useCallback(
            (ref: HTMLInputElement) => {
                inputRef.current = ref;

                if (parentRef) {
                    if (typeof parentRef === 'object') {
                        parentRef.current = ref;
                    } else if (typeof parentRef === 'function') {
                        parentRef(ref);
                    }
                }
            },
            [parentRef]
        );

        return (
            <TextField
                onRenderLabel={onRenderLabel}
                {...props}
                id={inputId}
                readOnly={!inEditMode}
                styles={styles}
                data-testid="editable-text"
                placeholder={inEditMode ? placeholder || '' : '-'}
                // eslint-disable-next-line
                // @ts-ignore
                ref={updateRef}
                onKeyDown={selfEdit ? onKeyDown : props.onKeyDown}
            />
        );
    }
);
