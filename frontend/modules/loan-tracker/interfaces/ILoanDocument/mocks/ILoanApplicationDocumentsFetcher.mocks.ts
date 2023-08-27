import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { DOCUMENT_STATUSES_TYPES, PENDING_FILE_OPTION_NAME } from '../../../constants/LoanDocument.consts';
import { IAddDocumentData, IDocument, IDocumentFile, ICustomDocument } from '../ILoanDocument';
import { IApplicant } from '../../ILoanApplicant/ILoanApplicant';
import {
    addedDocumentMock,
    documentSrcMock,
    customDocumentsMock,
    loanApplicantsMock,
    mockDocuments,
    statusesMock,
    loanStatusAndStateMock,
} from './ILoanDocument.mocks';
import { ILoanApplicationDocumentsFetcher } from '../ILoanApplicationDocumentsFetcher';
import { ActiveStatusCodesValues, StatesValues } from '../../../constants/LoanStateMap.consts';

export class MockLoanApplicationDocumentsFetcher implements ILoanApplicationDocumentsFetcher {
    public async getDocumentSrc(documentId: string): Promise<IDocumentFile> {
        return documentSrcMock;
    }

    public async addDocument(data: IAddDocumentData): Promise<IDocument> {
        return addedDocumentMock;
    }

    public async getLoanApplicants(): Promise<IApplicant[]> {
        return loanApplicantsMock;
    }

    public async getCustomDocuments(): Promise<ICustomDocument[]> {
        return customDocumentsMock;
    }

    public async removeDocument(documentId: string): Promise<boolean> {
        return true;
    }

    public async acceptDocument(document: IDocument): Promise<IDocument> {
        return await this.updateDocument(document, DOCUMENT_STATUSES_TYPES.Approved);
    }

    public async rejectDocument(document: IDocument): Promise<IDocument> {
        return await this.updateDocument(document, DOCUMENT_STATUSES_TYPES.Rejected);
    }

    public async resetDocument(document: IDocument): Promise<IDocument> {
        return await this.updateDocument(document, DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME]);
    }

    public async uploadDocument(document: IDocument, file: File, oldFileId?: string): Promise<IDocument> {
        return this.updateDocument(document, DOCUMENT_STATUSES_TYPES[PENDING_FILE_OPTION_NAME]);
    }

    private async updateDocument(document: IDocument, status: number): Promise<IDocument> {
        const updatedDocument = { ...document };
        updatedDocument.status = status;
        updatedDocument.lastStatusDate = new Date(Date.now());
        return updatedDocument;
    }

    public async getDocumentStatusesMap(): Promise<{ [code: number]: string }> {
        return statusesMock;
    }

    public async getItems(): Promise<IDocument[]> {
        return mockDocuments;
    }

    public async getLoanStausAndState(): Promise<{ stateCode: StatesValues; statusCode: ActiveStatusCodesValues }> {
        return Promise.resolve(loanStatusAndStateMock);
    }

    public hasDocumentPrivilege(operationType: PrivilegeType): boolean {
        return true;
    }
}

export default MockLoanApplicationDocumentsFetcher;
