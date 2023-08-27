import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { IDocumentRequest } from '../../interfaces';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import DocumentCard from '../DocumentCard/DocumentCard';
import { cardsWrapper, documentListStyle } from './DocumentList.style';
import { useId } from '@fluentui/react-hooks/lib/useId';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';

export interface IDocumentListProps {
    documents: IDocumentRequest[];
    onFileView: (document: IDocumentRequest) => void;
    onDocumentDelete: (document: IDocumentRequest, deleteRequest: boolean) => void;
    onFileUpload: (document: IDocumentRequest, file: File) => void;
    disableUpdate?: boolean;
    disableDelete?: boolean;
    showDescription?: boolean;
}

export const DocumentList: FC<IDocumentListProps> = ({
    documents,
    onFileView,
    onDocumentDelete,
    onFileUpload,
    disableUpdate,
    disableDelete,
    showDescription,
}) => {
    const translate = useTranslation(DI_NAMESPACE);
    const srDocumentsListID = useId('srTextForDocumentsList');

    return (
        <Stack styles={documentListStyle} verticalAlign="center" data-testid="cards-section">
            <Stack as="ul" aria-describedby={srDocumentsListID} role="list" horizontal styles={cardsWrapper} data-testid="document-card-row">
                {documents.map(item => (
                    <DocumentCard
                        disableUpdate={disableUpdate}
                        disableDelete={disableDelete}
                        onDocumentDelete={onDocumentDelete}
                        key={item.id}
                        document={item}
                        onFileView={onFileView}
                        onUpload={onFileUpload}
                        showDescription={showDescription}
                    />
                ))}
            </Stack>
            <ScreenReaderText id={srDocumentsListID}>{translate('DOCUMENT_ITEMS_SR_TEXT')}</ScreenReaderText>
        </Stack>
    );
};

export default DocumentList;
