import React, { CSSProperties, useMemo } from 'react';
import { IDocumentsFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { DocumentIntelligenceWrapper } from '@fsi/document-intelligence/DocumentIntelligenceWrapper';
import { DocumentIntelligence } from '@fsi/document-intelligence/DocumentIntelligence';
import { extractEntityId } from '@fsi/pcf-common/utilities/extractEntityId';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { extractContextualFlags } from '@fsi/pcf-common/utilities/extractContextualConfig';
import { DOCUMENT_INTELLIGENCE_FLAGS, DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS } from '@fsi/document-intelligence/constants/DocumentIntelligence.const';
import { DOCUMENT_TABLES } from '../fetchers/DocumentIntelligence.const';

export const extractEntityDocumentConfig = context => ({
    flags: extractContextualFlags(context, Object.values(DOCUMENT_INTELLIGENCE_FLAGS), DOCUMENT_INTELLIGENCE_FLAGS_DEFAULTS),
});
export interface DocumentIntelligenceProps extends PCFContainerProps {
    fetcher: IDocumentsFetcher;
    newDocumentFormId?: string | null;
}

const mainGridStyle: CSSProperties = { position: 'absolute', inset: 0 };
export const DocumentIntelligenceContainer: React.FC<DocumentIntelligenceProps> = (props: DocumentIntelligenceProps) => {
    const { context, fetcher, newDocumentFormId } = props;
    const contextId = extractEntityId(context.parameters?.contextId);
    const config = extractEntityDocumentConfig(context);

    const isInDocMainGrid = context.page?.entityTypeName === DOCUMENT_TABLES.DOCUMENT_REQUEST;
    const style = isInDocMainGrid ? mainGridStyle : undefined;
    return (
        context && (
            <PCFContainer containerStyle={style} context={context} config={config} withCurrencies={false}>
                <DocumentIntelligenceWrapper>
                    <DocumentIntelligence fetcher={fetcher} contextId={contextId} newDocumentFormId={newDocumentFormId} />
                </DocumentIntelligenceWrapper>
            </PCFContainer>
        )
    );
};
export default DocumentIntelligenceContainer;
