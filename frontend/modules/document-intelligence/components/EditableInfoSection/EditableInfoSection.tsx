import { Stack } from '@fluentui/react/lib/components/Stack';
import { Text } from '@fluentui/react/lib/components/Text';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { mergeStyles } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/components/Button';
import {
    cancelBtnProps,
    dividerStyles,
    editBtnProps,
    resetBtnProps,
    saveBtnProps,
    tooltipStyles,
    sectionHeaderStyles,
    subHeaderStyles,
} from './EditableInfoSection.style';
import { InfoCallout } from '@fsi/core-components/dist/components/atoms/InfoCallout/InfoCallout';
import { DirectionalHint } from '@fluentui/react/lib/components/Callout';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useId } from '@fluentui/react-hooks';
import { EditableFields, IDocumentFieldProps } from './EditableFields';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { EditableInfoSectionProps } from './EditableInfoSection.interface';
import { tagStyles } from '../EditableText/EditableText.style';
import Tag from '@fsi/core-components/dist/components/atoms/Tag/Tag';

export const EditableInfoSection: FC<EditableInfoSectionProps> = ({
    editMode,
    toggleEditMode,
    fields,
    styles,
    header,
    onSave,
    onReset,
    sectionId,
    onCancel,
    needFocusOnEditBtn,
    editFieldsDisabled,
}) => {
    const t = useTranslation();
    const diTranslate = useTranslation(DI_NAMESPACE);
    const formHeaderId = useId('editable-form');
    const formSubHeaderId = useId('editable-form-sub-header');
    const fieldControlsId = useId('editable-form-controls');
    const cancelScreenReaderTextId = useId('cancel-screenreader-text');
    const resetScreenReaderTextId = useId('reset-screenreader-text');
    const submitScreenReaderTextId = useId('submit-screenreader-text');
    const submitBtnRef = useRef<HTMLButtonElement>();

    const arialLabelCancelBtn = diTranslate('DOCUMENT_EXTRACTED_INFO_CANCEL_LABEL_ARIA', { section: header.title });
    const arialLabelResetBtn = diTranslate('DOCUMENT_EXTRACTED_INFO_RESET_LABEL_ARIA', { section: header.title });
    const arialLabelSubmitBtn = editMode
        ? diTranslate('DOCUMENT_EXTRACTED_INFO_SAVE_LABEL_ARIA', { section: header.title })
        : diTranslate('DOCUMENT_EXTRACTED_INFO_EDIT_LABEL_ARIA', { section: header.title });

    const changeModeAndFocus = useCallback(
        async handler => {
            try {
                await handler?.();
            } finally {
                toggleEditMode(false);
                submitBtnRef.current?.focus();
            }
        },
        [toggleEditMode]
    );
    const onCancelHandler = useCallback(() => {
        changeModeAndFocus(onCancel);
    }, [changeModeAndFocus, onCancel]);

    const onSaveHandler = useCallback(() => {
        changeModeAndFocus(onSave);
    }, [onSave, changeModeAndFocus]);

    const editButtonDisabled: boolean = useMemo(
        () => editFieldsDisabled || fields.every((field: IDocumentFieldProps) => field.readOnly),
        [fields, editFieldsDisabled]
    );

    useEffect(() => {
        needFocusOnEditBtn && submitBtnRef.current?.focus();
    }, [needFocusOnEditBtn]);

    return (
        <form className={mergeStyles(styles?.root)} id={sectionId} data-testid={sectionId} aria-labelledby={formHeaderId}>
            <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                <Stack horizontal verticalAlign="center">
                    <Text as="h3" styles={{ root: mergeStyles(sectionHeaderStyles, styles?.header) }} id={formHeaderId}>
                        {header.title}
                    </Text>
                    {header.infoCallout && (
                        <InfoCallout
                            hintDirection={header.infoCallout.direction || DirectionalHint.topCenter}
                            iconAriaLabel={header.infoCallout.ariaLabel}
                            calloutStyles={tooltipStyles}
                        >
                            {header.infoCallout.content}
                        </InfoCallout>
                    )}
                </Stack>
                <div>
                    {editMode && (
                        <>
                            <IconButton
                                iconProps={cancelBtnProps}
                                title={arialLabelCancelBtn}
                                ariaLabel={arialLabelCancelBtn}
                                onClick={onCancelHandler}
                                data-testid="cancel-btn"
                                aria-controls={fieldControlsId}
                                aria-describedby={`${cancelScreenReaderTextId} ${formHeaderId}`}
                            />
                            <ScreenReaderText id={cancelScreenReaderTextId}>{t('CANCEL')}</ScreenReaderText>
                            <IconButton
                                data-testid="reset-btn"
                                iconProps={resetBtnProps}
                                title={arialLabelResetBtn}
                                ariaLabel={t('RESET')}
                                onClick={onReset}
                                aria-controls={fieldControlsId}
                                aria-describedby={`${resetScreenReaderTextId} ${formHeaderId}`}
                            />
                            <ScreenReaderText id={resetScreenReaderTextId}>{t('RESET')}</ScreenReaderText>
                        </>
                    )}
                    <IconButton
                        iconProps={editMode ? saveBtnProps : editBtnProps}
                        ariaLabel={t(editMode ? 'SAVE' : 'EDIT')}
                        title={arialLabelSubmitBtn}
                        onClick={editMode ? onSaveHandler : () => toggleEditMode(true)}
                        data-testid="submit-btn"
                        aria-controls={fieldControlsId}
                        aria-describedby={`${cancelScreenReaderTextId} ${formHeaderId}`}
                        aria-expanded={editMode}
                        disabled={editButtonDisabled}
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore eslint-disable
                        elementRef={submitBtnRef}
                    />
                    <ScreenReaderText id={submitScreenReaderTextId}>
                        {t(editMode ? 'EDIT_DESCRIPTION_ARIA' : 'SAVE_DESCRIPTION_ARIA')}
                    </ScreenReaderText>
                </div>
            </Stack>
            {header.subHeader && (
                <Stack horizontal verticalAlign="center">
                    <Text title={header.subHeader.hoverTitle} styles={{ root: subHeaderStyles }} id={formSubHeaderId}>
                        {header.subHeader.title}
                    </Text>
                    <Tag text={header.subHeader.tagText} styles={tagStyles} />
                </Stack>
            )}
            <Divider styles={dividerStyles} />
            <EditableFields fields={fields} editMode={editMode} id={fieldControlsId} />
        </form>
    );
};
