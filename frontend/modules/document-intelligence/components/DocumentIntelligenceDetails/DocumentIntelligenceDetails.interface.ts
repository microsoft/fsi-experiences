import { IDocumentDetailsFetcher } from '../../interfaces/IDocumentsFetcher';
export interface IDocumentIntelligenceDetailsProps {
    fetcher: IDocumentDetailsFetcher;
    documentId: string;
}
