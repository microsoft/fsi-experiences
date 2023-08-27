import React, { FC, useCallback, useContext, useMemo, useRef } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { FontIcon } from '@fluentui/react/lib/components/Icon';
import { Text } from '@fluentui/react/lib/Text';
import {
    DocumentStatusesIcons,
    DOCUMENT_STATUSES_TYPES,
    MISSING_FILE_OPTION_NAME,
    PENDING_FILE_OPTION_NAME,
    DocumentsFileFormats,
    DocumentsBigScreenSize,
} from '../../../constants/LoanDocument.consts';
import { IDocument } from '../../../interfaces/ILoanDocument/ILoanDocument';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { ActionButton, CommandButton } from '@fluentui/react/lib/components/Button';
import Tag from '@fsi/core-components/dist/components/atoms/Tag/Tag';
import { ITooltipProps, TooltipHost } from '@fluentui/react/lib/components/Tooltip';
import {
    cardButtonStyle,
    cardDescriptionTextStyle,
    cardDescriptionTooltipStyle,
    cardDescriptionTooltipTextStyle,
    cardDetailsHeaderToolTipStyles,
    cardDetailsTextStyle,
    cardDetailsToolTipStyles,
    cardHeaderStyles,
    cardHeaderTokens,
    cardMoreDataWithFooterStyles,
    cardRoleStyle,
    detailsTextStyle,
    menuInputUploadButtonStyle,
    missingFileStyle,
    moreButtonStyles,
    regularCardStyle,
    seperatorStyles,
} from './DocumentCard.style';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DocumentsContext } from '../../../contexts/Documents/Documents.context';
import { FileUploadField } from '@fsi/core-components/dist/components/atoms/FileUploadField';
import { IContextualMenuProps } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { useId } from '@fluentui/react-hooks/lib/useId';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { menuIconProps } from './DocumentCard.const';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { DateTime } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime';
import { DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime/DateTime.interface';
import useMediaQueryListener from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

export interface IDocumentCardProps {
    document: IDocument;
    onDelete: (documentId: string, isMissingFile: boolean) => void;
    onFileView: (document: IDocument) => void;
    onUpload: (document: IDocument, file: File) => void;
}

const CardHeader: FC<{ document: IDocument }> = ({ document }) => {
    return (
        <Stack horizontal tokens={cardHeaderTokens} verticalAlign="center" styles={cardHeaderStyles} aria-hidden="true">
            <FontIcon
                data-testid="status-icon"
                iconName={DocumentStatusesIcons[document.status].icon}
                style={{ color: DocumentStatusesIcons[document.status].color, fontSize: 'inherit' }}
            />
            <Text styles={{ root: { fontSize: FontSizes.size14, fontWeight: FontWeights.semibold } }}>{document.name}</Text>
        </Stack>
    );
};

const CardDescription: FC<{ document: IDocument }> = ({ document }) => {
    if (!document.description) return <br />;

    const cardDescriptionTooltipHostID = useId('cardDescriptionTooltip');

    return (
        <TooltipHost
            content={
                <Text aria-hidden="true" styles={cardDescriptionTooltipTextStyle}>
                    {document.description}
                </Text>
            }
            id={cardDescriptionTooltipHostID}
            styles={cardDescriptionTooltipStyle}
        >
            <div className={detailsTextStyle} aria-describedby={cardDescriptionTooltipHostID}>
                <Text styles={cardDescriptionTextStyle} data-testid="description-text">
                    {document.description}
                </Text>
            </div>
        </TooltipHost>
    );
};

interface ICardFooterProps {
    document: IDocument;
    onDocumentDelete: (documentId: string, isMissingFile: boolean) => void;
    onFileView: (document: IDocument) => void;
    onUpload: (document: IDocument, file: File) => void;
    hasDocumentPrivilege: (operation: PrivilegeType) => boolean;
}

const CardFooter: FC<ICardFooterProps> = ({ document, onFileView, onDocumentDelete, onUpload, hasDocumentPrivilege }) => {
    const {
        palette: { themePrimary },
    } = useTheme();

    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const cardFileUploadID = useId('cardFileUpload');
    const actionButtonID = `upload-button-${cardFileUploadID}`;
    const commandButtonRef = useRef<HTMLButtonElement>(null);
    const inputFile = useRef<HTMLInputElement>(null);

    const isSmallScreen = useMediaQueryListener(`screen and (max-width: ${DocumentsBigScreenSize})`);

    const editDocumentDisabled = !hasDocumentPrivilege(PrivilegeType.Write);
    const deleteDocumentDisabled = !hasDocumentPrivilege(PrivilegeType.Delete);

    const onChangeFile = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();
            const file = event.target.files?.[0];
            if (file) {
                onUpload(document, file);
                event.target.value = '';
            }
        },
        [document, onUpload]
    );

    const StatusToButtons = useMemo(() => {
        return {
            [DOCUMENT_STATUSES_TYPES.Approved]: <ReviewFileFooter document={document} onFileView={onFileView} />,
            [DOCUMENT_STATUSES_TYPES.Rejected]: <RejectFileFooter document={document} onFileView={onFileView} />,
            [DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME]]: <ReviewFileFooter document={document} onFileView={onFileView} />,
            [DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]]: (
                <MissingFileFooter document={document} onUpload={onUpload} editDocumentDisabled={editDocumentDisabled} />
            ),
        };
    }, [document]);

    const cardMenuProps: IContextualMenuProps = useMemo(() => {
        const isMissingFileStatus = document.status === DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME];

        const menuProps: IContextualMenuProps = {
            items: [
                {
                    key: 'removeDocument',
                    text:
                        document.status === DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]
                            ? translate('REMOVE_REQUEST_BUTTON_TEXT')
                            : translate('REMOVE_DOCUMENT_BUTTON_TEXT'),
                    iconProps: { iconName: 'Delete', color: themePrimary },
                    onClick: () => onDocumentDelete(document.id, document.status === DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]),
                    disabled: deleteDocumentDisabled,
                },
            ],
        };

        if (isSmallScreen && isMissingFileStatus) {
            menuProps.items.unshift({
                key: 'uploadDocument',
                text: translate('UPLOAD_DOCUMENT_MENU_ITEM_BUTTON'),
                iconProps: { iconName: 'Upload', styles: { root: { color: themePrimary } } },
                onClick: () => inputFile?.current?.click(),
                disabled: editDocumentDisabled,
            });
        }

        if (isSmallScreen && !isMissingFileStatus) {
            menuProps.items.unshift({
                key: 'reviewDocument',
                text: translate('REVIEW_DOCUMENT_MENU_ITEM_BUTTON'),
                iconProps: { iconName: 'OpenInNewWindow', styles: { root: { color: themePrimary } } },
                onClick: () => onFileView(document),
            });
        }

        return menuProps;
    }, [document, onFileView, onDocumentDelete, onUpload, isSmallScreen]);

    function onAfterMenuDismiss() {
        commandButtonRef.current?.focus();
    }

    return (
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center" styles={moreButtonStyles}>
            {StatusToButtons[document.status]}
            <input
                type="file"
                accept={DocumentsFileFormats?.map(extension => `.${extension}`).join(',')}
                aria-labelledby={actionButtonID}
                id={cardFileUploadID}
                data-testid="input-file-small-screen"
                ref={inputFile}
                className={menuInputUploadButtonStyle}
                onChange={onChangeFile}
            />
            <CommandButton
                menuIconProps={menuIconProps}
                menuProps={cardMenuProps}
                ariaDescription={translate('MORE_ACTIONS')}
                data-testid="more-button"
                onAfterMenuDismiss={onAfterMenuDismiss}
                elementRef={commandButtonRef}
            />
        </Stack>
    );
};

const ReviewFileFooter: FC<{ document: IDocument; onFileView: (document: IDocument) => void }> = ({ document, onFileView }) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const {
        palette: { themePrimary },
    } = useTheme();

    return (
        <ActionButton onClick={() => onFileView(document)} styles={cardButtonStyle(themePrimary)} data-testid="review-button">
            {translate('REVIEW')}
        </ActionButton>
    );
};

const RejectFileFooter: FC<{ document: IDocument; onFileView: (document: IDocument) => void }> = ({ document, onFileView }) => {
    return (
        <Stack horizontal tokens={{ childrenGap: '16px' }} verticalAlign="center">
            <ReviewFileFooter document={document} onFileView={onFileView} />
        </Stack>
    );
};

const MissingFileFooter: FC<{ document: IDocument; onUpload: (document: IDocument, file: File) => void; editDocumentDisabled: boolean }> = ({
    document,
    onUpload,
    editDocumentDisabled,
}) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const cardFileUploadID = useId('cardFileUpload');
    const {
        palette: { themePrimary },
    } = useTheme();

    /* istanbul ignore next */
    const onFileUpload = async (file: File) => {
        onUpload(document, file);
    };

    return (
        <Stack horizontal tokens={{ childrenGap: '16px' }} verticalAlign="center">
            <FileUploadField
                styles={cardButtonStyle(themePrimary)}
                id={cardFileUploadID}
                disabled={editDocumentDisabled}
                onUpload={onFileUpload}
                supportedFileFormats={DocumentsFileFormats}
            >
                {translate('UPLOAD')}
            </FileUploadField>
        </Stack>
    );
};

export const DocumentCard: FC<IDocumentCardProps> = ({ document, onDelete, onFileView, onUpload }) => {
    const documentsContext = useContext(DocumentsContext);
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const srTextForDocumentCardID = useId('srTextForDocumentCard');

    const isSmallScreen = useMediaQueryListener(`screen and (max-width: ${DocumentsBigScreenSize})`);

    const StatusWithDate = useMemo(() => {
        if (document.status !== DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME]) {
            const status = documentsContext.documentStatuses[document.status];
            return (
                <>
                    {`${status}: `}
                    <DateTime
                        styles={cardDetailsTextStyle}
                        quickFormat={DateTimePredefinedFormat.DefaultDateWithTime}
                        date={document.lastStatusDate}
                    />
                </>
            );
        }
    }, [document]);

    const tooltipProps: ITooltipProps = useMemo(
        () => ({
            onRenderContent: () => (
                <Stack tokens={{ childrenGap: 3 }}>
                    {document.description}
                    {document.status !== DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME] && (
                        <Text data-testid="details-text" styles={cardDetailsToolTipStyles}>
                            {`${documentsContext.documentStatuses[document.status]}: `}
                            <DateTime
                                styles={cardDetailsToolTipStyles}
                                quickFormat={DateTimePredefinedFormat.DefaultDateWithTime}
                                date={document.lastStatusDate}
                            />
                        </Text>
                    )}
                </Stack>
            ),
        }),
        [document, documentsContext.documentStatuses]
    );

    return (
        <Stack
            as="li"
            tabIndex={0}
            role="listitem"
            styles={document.status === DOCUMENT_STATUSES_TYPES[MISSING_FILE_OPTION_NAME] ? missingFileStyle : regularCardStyle}
        >
            <ScreenReaderText id={srTextForDocumentCardID}>{`${translate('DOCUMENT_ITEM_SR_TEXT')} ${document.name}`}</ScreenReaderText>
            {isSmallScreen ? (
                <TooltipHost tooltipProps={tooltipProps} styles={cardDetailsHeaderToolTipStyles}>
                    <CardHeader document={document} />
                </TooltipHost>
            ) : (
                <CardHeader document={document} />
            )}
            <CardDescription document={document} />
            <Stack tokens={{ childrenGap: 8 }} styles={cardMoreDataWithFooterStyles}>
                <Text data-testid="details-text" styles={cardDetailsTextStyle}>
                    {StatusWithDate || <br />}
                </Text>
                <Tag
                    text={`${document.ownerName} (${document.isPrimary ? translate('PRIMARY_APPLICANT') : document.ownerRole})`}
                    styles={cardRoleStyle}
                />
                <Separator styles={seperatorStyles} />
                <CardFooter
                    document={document}
                    onDocumentDelete={onDelete}
                    onFileView={onFileView}
                    onUpload={onUpload}
                    hasDocumentPrivilege={documentsContext.hasDocumentPrivilege}
                />
            </Stack>
        </Stack>
    );
};

export default DocumentCard;
