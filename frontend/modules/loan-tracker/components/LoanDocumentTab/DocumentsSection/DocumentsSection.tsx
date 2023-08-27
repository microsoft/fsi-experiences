import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { IButton, IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Spinner } from '@fluentui/react/lib/components/Spinner/Spinner';
import { IDocument } from '../../../interfaces/ILoanDocument/ILoanDocument';
import { useTranslation, namespaces } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DocumentsContext } from '../../../contexts/Documents/Documents.context';
import DocumentCard from '../DocumentCard/DocumentCard';
import {
    cardsWrapper,
    headerRowStyles,
    iconButtonDisabledStyle,
    iconButtonStyle,
    loadingTextStyle,
    lockedSectionTitleStyle,
    openedListStyle,
    rootStyles,
    sectionTitleStye,
} from './DocumentsSection.style';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider/Divider';
import { useId } from '@fluentui/react-hooks/lib/useId';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { AddDocumentButton } from './AddDocumentButton';

export interface IDocumentsSectionProps {
    documents: IDocument[];
    title: string;
    onAddDocument?: (cardSectionRef: IButton | null) => void;
    addDocumentDisabled?: boolean;
    onDocumentViewerOpen: (cardSectionRef: IButton | null) => void;
    onDocumentDelete: (documentId: string, isMissingFile: boolean, cardSectionRef: IButton | null) => void;
    onFileUpload: (document: IDocument, file: File, cardSectionRef?: IButton | null) => void;
}

interface ILoanApplicationMainViewProps {
    documents: IDocument[];
    onFileView: (document: IDocument) => void;
    onDocumentDelete: (documentId: string, isMissingFile: boolean) => void;
    onFileUpload: (document: IDocument, file: File) => void;
}

const LoanApplicationMainView: FC<ILoanApplicationMainViewProps> = ({ documents, onFileView, onDocumentDelete, onFileUpload }) => {
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const documentsContext = useContext(DocumentsContext);
    const srDocumentsListID = useId('srTextForDocumentsList');

    const renderView = documentsContext.isLoading ? (
        <Stack tokens={{ childrenGap: '14.5px' }} horizontalAlign="center" data-testid="connecting-view">
            <Text styles={loadingTextStyle}>{translate('LOADING')}</Text>
            <Spinner styles={{ root: { width: '100%' } }} />
        </Stack>
    ) : (
        <>
            <Stack as="ul" aria-describedby={srDocumentsListID} role="list" horizontal styles={cardsWrapper} data-testid="document-card-row">
                {documents.map(item => (
                    <DocumentCard onDelete={onDocumentDelete} key={item.id} document={item} onFileView={onFileView} onUpload={onFileUpload} />
                ))}
            </Stack>
            <ScreenReaderText id={srDocumentsListID}>{translate('DOCUMENT_ITEMS_SR_TEXT')}</ScreenReaderText>
        </>
    );
    return (
        <Stack styles={openedListStyle} verticalAlign="center" data-testid="cards-section">
            {renderView}
        </Stack>
    );
};

export const DocumentsSection: FC<IDocumentsSectionProps> = ({
    documents,
    title,
    onAddDocument,
    addDocumentDisabled,
    onDocumentViewerOpen,
    onDocumentDelete,
    onFileUpload,
}) => {
    const documentsContext = useContext(DocumentsContext);
    const translate = useTranslation(namespaces.LOAN_APPLICATION_FILES_CONTROL);
    const [isDocumentsGroupOpened, setIsDocumentsGroupOpened] = useState<boolean>(true);
    const sectionRef = useRef<IButton>(null);

    const documentHeaderTextID = useId('documentHeaderText');
    const srDocumentHeaderTextID = useId('srDocumentHeaderText');

    const disabled = documents.length === 0;

    useEffect(() => {
        setIsDocumentsGroupOpened(!disabled);
    }, [disabled]);

    /* istanbul ignore next */
    const onFileView = async (document: IDocument) => {
        documentsContext.setSelectedDocument({ ...document });
        onDocumentViewerOpen(sectionRef.current);
    };

    const documentDelete = useCallback(
        (documentId: string, isMissingFile: boolean) => onDocumentDelete(documentId, isMissingFile, sectionRef.current),
        [onDocumentDelete]
    );

    const fileUpload = useCallback((document: IDocument, file: File) => onFileUpload(document, file, sectionRef.current), [onFileUpload]);

    const toggleIsDocumentsGroupOpened = () => !disabled && setIsDocumentsGroupOpened(prevState => !prevState);

    const addDocument = useCallback(() => onAddDocument && onAddDocument(sectionRef.current), [onAddDocument]);

    return (
        <Stack styles={rootStyles}>
            <Stack>
                <Stack
                    styles={headerRowStyles}
                    role="region"
                    aria-live="polite"
                    horizontal
                    horizontalAlign="space-between"
                    verticalAlign="center"
                    aria-labelledby={`${documentHeaderTextID} ${srDocumentHeaderTextID}`}
                >
                    <Stack horizontal tokens={{ childrenGap: '22px' }} verticalAlign="center">
                        <IconButton
                            tabIndex={0}
                            componentRef={sectionRef}
                            data-testid="documents-group"
                            aria-disabled={disabled}
                            aria-expanded={isDocumentsGroupOpened}
                            aria-labelledby={`${documentHeaderTextID} ${srDocumentHeaderTextID}`}
                            styles={disabled ? iconButtonDisabledStyle : iconButtonStyle}
                            iconProps={{ iconName: isDocumentsGroupOpened ? 'ChevronDown' : 'ChevronRight' }}
                            onClick={toggleIsDocumentsGroupOpened}
                        />
                        <Text
                            styles={disabled ? lockedSectionTitleStyle : sectionTitleStye}
                            data-testid="section-header"
                            id={documentHeaderTextID}
                        >{`${title} (${documents.length})`}</Text>
                        <ScreenReaderText id={srDocumentHeaderTextID}>
                            {documents.length === 1 ? translate('DOCUMENT_ITEM_SR_TEXT') : translate('DOCUMENT_ITEMS_SR_TEXT')}
                        </ScreenReaderText>
                    </Stack>
                    {onAddDocument && <AddDocumentButton addDocumentDisabled={addDocumentDisabled} addDocument={addDocument} />}
                </Stack>
                <Divider />
            </Stack>
            {isDocumentsGroupOpened && (
                <LoanApplicationMainView onDocumentDelete={documentDelete} documents={documents} onFileView={onFileView} onFileUpload={fileUpload} />
            )}
        </Stack>
    );
};

export default DocumentsSection;
