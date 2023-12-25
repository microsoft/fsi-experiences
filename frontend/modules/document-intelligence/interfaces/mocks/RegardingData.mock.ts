import { IDocumentRegarding } from '../IDocumentRegarding';

export const regardingPrimaryMock: IDocumentRegarding = {
    name: 'Monica Thomson',
    isPrimary: true,
    role: 'Owner',
    id: 'sub-id1',
};

export const coOwnerRegardingMock: IDocumentRegarding = {
    name: 'Monica Thomson',
    role: 'Co-Owner',
    id: 'sub-id2',
};

export const noRoleRegardingMock: IDocumentRegarding = {
    name: 'Monica Thomson',
    id: 'sub-id3',
};
