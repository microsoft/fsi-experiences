/* istanbul ignore file */
import cloneDeep from 'lodash/cloneDeep';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';
import { getRelationshipsMock, relationshipsTypesMap } from '../../interfaces/Relationships/mocks/IRelationship.mock';
import { RelationshipErrorEnum } from './RelationshipErrorEnum';
import { IRelationship } from '../../interfaces/Relationships/IRelationship';

const fullMock = getRelationshipsMock();
const myRelationship = fullMock[0];

const RelationshipsContextMock = {
    value: {
        loadingState: { isLoading: false, msg: '' },
        errorState: RelationshipErrorEnum.NONE,
        relationships: fullMock,
        fetchRelationshipById: (relationshipId: string) => Promise.resolve<IRelationship | undefined>(undefined),
        addRelationship: (relationship: IRelationship) => Promise.resolve<string>(''),
        deleteRelationship: (id: string) => Promise.resolve<void>(undefined),
        updateRelationship: (relationship: IRelationship) => Promise.resolve<void>(undefined),
        mainCustomer: { ...myRelationship.contactFrom },
        relationshipTypes: relationshipsTypesMap,
        getContacts: /* istanbul ignore next */ (name: string) => Promise.resolve<IAbbreviatedContact[]>([]),
        readonly: false,
    },
};

const getRelationshipsContextMock = () => cloneDeep(RelationshipsContextMock);
export default getRelationshipsContextMock;
