export interface ICustomDocument {
    id: string;
    name: string;
    description: string;
}

export interface IDocument {
    id: string;
    name: string;
    description: string;
    status: number;
    lastStatusDate: Date;
    ownerName: string;
    ownerRole: string;
    isPrimary: boolean;
}

export interface IAddDocumentData {
    id: string;
    name: string;
    role: string;
    customDocument: ICustomDocument;
    isPrimary: boolean;
}

export interface IDocumentFile {
    fileId: string;
    src: string;
}
