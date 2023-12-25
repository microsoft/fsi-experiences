import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { IconButton } from '@fluentui/react/lib/Button';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import React, { FC, forwardRef } from 'react';
import { labelTokens, labelStyles, tagStyles, labelEditIconStyles, selfEditIconStyles } from './EditableText.style';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { useId } from '@fluentui/react-hooks';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import Tag from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { LabelWithEditAndTagProps } from './EditableText.interface';

export const LabelWithEditAndTag: FC<LabelWithEditAndTagProps> = forwardRef(
    ({ editMode, inputId, tagProps, text, withEditButton, onEditClick, iconStyles, ...props }, editButtonRef) => {
        const iconProps = {
            iconName: editMode ? 'Accept' : 'Edit',
            styles: selfEditIconStyles,
        };

        const screenReaderTextId = useId('fsi-self-edit--screen-reader-text');
        const labelId = useId('fsi-self-edit--label');
        const t = useTranslation();
        const diTranslate = useTranslation(DI_NAMESPACE);

        return (
            <Stack horizontal verticalAlign="center" tokens={labelTokens}>
                <Stack tokens={labelTokens} horizontal verticalAlign="center">
                    <Label
                        {...props}
                        id={labelId}
                        className="fsi-self-edit--input--label"
                        htmlFor={inputId}
                        styles={mergeStyleSets(labelStyles, props.styles)}
                    >
                        <OverflowText text={text} overflowModeSelf />
                    </Label>
                    {withEditButton && (
                        <>
                            <IconButton
                                ariaLabel={t(editMode ? 'SAVE' : 'EDIT')}
                                title={t(editMode ? 'SAVE' : 'EDIT')}
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore eslint-disable
                                elementRef={editButtonRef}
                                iconProps={iconProps}
                                onClick={onEditClick}
                                styles={iconStyles || labelEditIconStyles}
                                aria-describedby={`${screenReaderTextId} ${labelId}`}
                                data-testid="label-edit-icon-btn"
                                aria-controls={inputId}
                            />
                            <ScreenReaderText id={screenReaderTextId}>
                                {diTranslate(
                                    editMode ? 'DOC_EXTRACT_INPUT_FIELD_SAVE_DESCRIPTION_ARIA' : 'DOC_EXTRACT_INPUT_FIELD_EDIT_DESCRIPTION_ARIA'
                                )}
                            </ScreenReaderText>
                        </>
                    )}
                </Stack>
                {tagProps?.text && !editMode && <Tag {...tagProps} styles={mergeStyleSets(tagStyles, tagProps.styles)} />}
            </Stack>
        );
    }
);
