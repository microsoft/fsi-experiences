import { IAddDocumentData, IDocument, IDocumentFile, ICustomDocument } from './ILoanDocument';
import { IApplicant } from '../ILoanApplicant/ILoanApplicant';
import { ActiveStatusCodesValues, StatesValues } from '../../constants/LoanStateMap.consts';

export interface ILoanApplicationDocumentsFetcher {
    getItems(): Promise<IDocument[]>;
    getDocumentSrc(documentId: string): Promise<IDocumentFile>;
    removeDocument(documentId: string): Promise<boolean>;
    getDocumentStatusesMap(): Promise<{ [code: number]: string }>;
    addDocument(data: IAddDocumentData): Promise<IDocument>;
    getLoanApplicants(): Promise<IApplicant[]>;
    getCustomDocuments(): Promise<ICustomDocument[]>;
    acceptDocument(document: IDocument): Promise<IDocument>;
    rejectDocument(document: IDocument): Promise<IDocument>;
    resetDocument(document: IDocument): Promise<IDocument>;
    uploadDocument(document: IDocument, file: File, oldFileId?: string): Promise<IDocument>;
    resetDocument(document: IDocument): Promise<IDocument>;
    getLoanStausAndState(): Promise<{ stateCode: StatesValues; statusCode: ActiveStatusCodesValues }>;
    hasDocumentPrivilege(operation: number): boolean;
}
