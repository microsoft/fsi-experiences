import React, { createContext, FC, useEffect, useState } from 'react';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import { RelationshipErrorEnum } from '../RelationshipErrorEnum';
import { IRelationshipFetcher } from './../../../interfaces/Relationships/IRelationshipFetcher';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';
import useContactAccessInfo from '@fsi/core-components/dist/hooks/useContactAccessInfo';

/* istanbul ignore next */
export const RelationshipsContext = createContext({
    loadingState: { isLoading: false, msg: '' },
    errorState: RelationshipErrorEnum.NONE,
    relationships: Array<IRelationship>(),
    fetchRelationshipById: (relationshipId: string) => Promise.resolve<IRelationship | undefined>(undefined),
    addRelationship: (relationship: IRelationship) => Promise.resolve<string>(''),
    deleteRelationship: (id: string) => Promise.resolve<void>(undefined),
    updateRelationship: (relationship: IRelationship) => Promise.resolve<void>(undefined),
    mainCustomer: {} as IAbbreviatedContact,
    relationshipTypes: new Map<number, string>(),
    getContacts: /* istanbul ignore next */ (name: string) => Promise.resolve<IAbbreviatedContact[]>([]),
    readonly: undefined as boolean | undefined,
});

export const defaultContact: IAbbreviatedContact = {
    contactId: '0',
    fullName: '',
};

const RelationshipsContextProvider: FC<{ fetcher: IRelationshipFetcher; contactId: string }> = ({ fetcher, children, contactId }) => {
    const [loadingState, setLoadingState] = useState<{ isLoading: boolean; msg: string }>({
        isLoading: true,
        msg: 'Groups and relationships are loading',
    });
    const [errorState, setErrorState] = useState<RelationshipErrorEnum>(RelationshipErrorEnum.NONE);
    const [relationships, setRelationships] = useState<Array<IRelationship>>([]);
    const [relationshipTypes, setRelationshipTypes] = useState<Map<number, string>>(new Map<number, string>());
    const [mainCustomer, setMainCustomer] = useState<IAbbreviatedContact>({} as any);
    const { data } = useContactAccessInfo({ entityId: contactId, fetcher });

    useEffect(() => {
        initMainCustomer();
        initPicklists();
        initRelationships();
    }, []);

    const initMainCustomer = async () => {
        const customer = await fetcher.getMainCustomerDetails();
        setMainCustomer(customer);
    };

    const initPicklists = async () => {
        const relationshipTypes = await fetcher.getRelationshipTypesMap();
        //disallow the option choosing Principal or Power of attorney for bankers from UI
        relationshipTypes.delete(104800012);
        relationshipTypes.delete(104800013);
        setRelationshipTypes(relationshipTypes);
    };

    const initRelationships = async () => {
        try {
            const res = await fetcher.getCustomerRelationships();
            setErrorState(RelationshipErrorEnum.NONE);
            setRelationships(res);
        } catch (err) {
            setErrorState(RelationshipErrorEnum.RELATIONSHIP_INIT);
        } finally {
            setLoadingState({ isLoading: false, msg: '' });
        }
    };

    const fetchRelationshipById = async (relationshipId: string): Promise<IRelationship> => {
        try {
            const relationship = await fetcher.fetchRelationshipById(relationshipId);
            return relationship;
        } catch (err) {
            setErrorState(RelationshipErrorEnum.RELATIONSHIP_GET);
            throw err;
        }
    };

    const handleRelationshipCRUD = async (func, msg: string): Promise<any> => {
        setLoadingState({ isLoading: true, msg });
        try {
            const id = await func();
            initRelationships();
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(RelationshipErrorEnum.NONE);
            return id;
        } catch (err) {
            setLoadingState({ isLoading: false, msg: '' });
            setErrorState(RelationshipErrorEnum.RELATIONSHIP_CRUD);
            throw err;
        }
    };

    const addRelationship = async (relationship: IRelationship): Promise<string> => {
        return await handleRelationshipCRUD(() => fetcher.addRelationship(relationship), 'Adding relationship');
    };

    const deleteRelationship = async (id: string): Promise<void> => {
        await handleRelationshipCRUD(() => fetcher.deleteRelationship(id), 'Deleting relationship');
    };

    const updateRelationship = async (relationship: IRelationship): Promise<void> => {
        await handleRelationshipCRUD(() => fetcher.updateRelationship(relationship), 'Updating relationship');
    };

    const getContacts = async (name: string): Promise<IAbbreviatedContact[]> => await fetcher.getRelevantContacts(name);

    return (
        <RelationshipsContext.Provider
            value={{
                loadingState,
                errorState,
                relationshipTypes,
                relationships,
                fetchRelationshipById,
                addRelationship,
                updateRelationship,
                deleteRelationship,
                mainCustomer,
                getContacts,
                readonly: !data?.write,
            }}
        >
            {children}
        </RelationshipsContext.Provider>
    );
};

export default RelationshipsContextProvider;
