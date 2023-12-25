import React from 'react';
import { IDocumentDetailsFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { DocumentIntelligenceDetails } from '@fsi/document-intelligence/components/DocumentIntelligenceDetails/DocumentIntelligenceDetails';
import { DocumentIntelligenceWrapper } from '@fsi/document-intelligence/DocumentIntelligenceWrapper';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { extractContextualFlags } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { DOCUMENT_INTELLIGENCE_FLAGS, DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS } from '@fsi/document-intelligence/constants/DocumentIntelligence.const';

export const extractEntityDocumentConfig = context => ({
    flags: extractContextualFlags(context, Object.values(DOCUMENT_INTELLIGENCE_FLAGS), DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS),
});
export interface DocumentIntelligenceProps extends PCFContainerProps {
    fetcher: IDocumentDetailsFetcher;
}

export const DocumentIntelligenceContainer: React.FC<DocumentIntelligenceProps> = (props: DocumentIntelligenceProps) => {
    const { context, fetcher } = props;
    const documentId = extractEntityId(context.parameters?.documentId);
    const config = extractEntityDocumentConfig(context);
    return (
        context && (
            <PCFContainer context={context} config={config} withCurrencies={false}>
                <DocumentIntelligenceWrapper>
                    <DocumentIntelligenceDetails fetcher={fetcher} documentId={documentId} />
                </DocumentIntelligenceWrapper>
            </PCFContainer>
        )
    );
};
export default DocumentIntelligenceContainer;
