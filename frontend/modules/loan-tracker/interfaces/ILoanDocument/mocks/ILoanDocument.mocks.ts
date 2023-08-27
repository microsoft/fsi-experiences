import { ACTIVE_STATUS_CODES, STATES } from '../../../constants/LoanStateMap.consts';
import { IDocument, IDocumentFile } from '../ILoanDocument';

export const mockDocuments: IDocument[] = [
    {
        id: '1',
        name: 'document 1',
        description: 'my first document',
        status: 104800004,
        lastStatusDate: new Date(Date.now()),
        ownerName: 'owner 1',
        ownerRole: 'Borrower',
        isPrimary: true,
    },
    {
        id: '2',
        name: 'document 2',
        description: 'my second document',
        status: 104800003,
        lastStatusDate: new Date(Date.now()),
        ownerName: 'owner 2',
        ownerRole: 'Co-Signer',
        isPrimary: false,
    },
    {
        id: '3',
        name: 'document 3',
        description: 'my third document',
        status: 104800000,
        lastStatusDate: new Date(Date.now()),
        ownerName: 'owner 3',
        ownerRole: 'Co-Signer',
        isPrimary: false,
    },
    {
        id: '4',
        name: 'document 4',
        description: 'my fourth document',
        status: 104800001,
        lastStatusDate: new Date(Date.now()),
        ownerName: 'owner 4',
        ownerRole: 'Co-Signer',
        isPrimary: false,
    },
];

export const addedDocumentMock: IDocument = {
    id: '8',
    name: 'added document',
    description: '',
    status: 104800000,
    lastStatusDate: new Date(Date.now()),
    ownerName: 'owner 4',
    ownerRole: 'Co-Signer',
    isPrimary: false,
};

export const addDocumentDataMock = {
    id: '9',
    name: 'new',
    role: 'Primary Applicant',
    isPrimary: true,
    customDocument: {
        id: '1',
        name: 'Id',
        description: 'description',
    },
};

export const sectionName = 'Files';

export const fileToUploadMock = new File([], 'file');

export const documentSrcMock: IDocumentFile = { fileId: '', src: 'src' };

export const loanApplicantsMock: { id: string; name: string; role: string; isPrimary: boolean }[] = [
    {
        id: '1',
        name: 'Son Goku',
        role: 'Primary - Applicant',
        isPrimary: true,
    },
    {
        id: '2',
        name: 'Yugi Moto',
        role: 'Co-Signer',
        isPrimary: false,
    },
];

export const statusesMock = {
    104800004: 'Rejected',
    104800003: 'Approved',
    104800000: 'Missing File',
    104800001: 'Pending Review',
};

export const applicantsMock = [
    { id: '1', name: 'Carole Baskin', role: 'Primary applicant', isPrimary: true },
    { id: '2', name: 'Matt Daimond', role: 'Secondary applicant', isPrimary: false },
    { id: '3', name: 'Sam Skinner', role: 'Principal', isPrimary: false },
    { id: '4', name: 'Stewie Griffin', role: 'Editor In Chief', isPrimary: false },
];

export const customDocumentsMock = [
    { id: '1', name: 'Passport', description: 'Desc 1' },
    { id: '2', name: 'Driving License', description: 'Desc 2' },
    { id: '3', name: 'Birth Certificate', description: 'Desc 3' },
    { id: '4', name: 'Contract', description: 'Desc 4' },
];

export const loanStatusAndStateMock = { stateCode: STATES.Active, statusCode: ACTIVE_STATUS_CODES.Draft };
