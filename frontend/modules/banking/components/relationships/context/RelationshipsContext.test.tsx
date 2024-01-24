/* eslint-disable jest/no-try-expect */
/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import RelationshipsContextProviderTest from './RelationshipsContext';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import RelationshipsContextChildMock, { MOCKED_RELATIONSHIP_CONTEXT_TEXT } from './RelationshipsContextChild.mock';
import { getRelationshipsMock } from '../../../interfaces/Relationships/mocks/IRelationship.mock';
import { RelationshipErrorEnum } from '../RelationshipErrorEnum';
import { mockFetcherWithCustomer } from '../../../interfaces/Relationships/mocks/MockRelationshipFetcher';

const RelationshipsContextProvider = ProviderWrapper(RelationshipsContextProviderTest);
describe('test relationships context', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('should render relationship context', async () => {
        const currContext: { [key: string]: any } = {};
        const { findByText } = render(
            <RelationshipsContextProvider {...params}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value).not.toBeNull();
    });

    it('should return the main customer', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, getMainCustomerDetails: jest.fn().mockResolvedValue(fullMock[0].contactFrom) };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.mainCustomer).toEqual(fullMock[0].contactFrom);
    });

    it('should return the picklist', async () => {
        const currContext: { [key: string]: any } = {};
        const mockRelationshipTypeMap = new Map<number, string>([[1, '1']]);
        const currFetcher = { ...mockFetcher, getRelationshipTypesMap: jest.fn().mockResolvedValue(mockRelationshipTypeMap) };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        const pickLists = currContext.value.relationshipTypes;
        expect(pickLists).toEqual(mockRelationshipTypeMap);
    });

    it('should return the relationships from init', async () => {
        const currContext: { [key: string]: any } = {};

        const { findByText } = render(
            <RelationshipsContextProvider {...params}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        await waitFor(() => {
            expect(currContext.value.relationships).toEqual(fullMock);
        });
    });

    it('should set error when init relationships fail', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, getCustomerRelationships: jest.fn().mockRejectedValue(new Error()) };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual([]);
        expect(currContext.value.errorState).toEqual(RelationshipErrorEnum.RELATIONSHIP_INIT);
    });

    it('run addRelationship', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getCustomerRelationships: jest.fn().mockResolvedValue([fullMock[0]]),
            addRelationship: jest.fn().mockResolvedValue(fullMock[1].id),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual([fullMock[0]]);
        const relationshipToAdd = { ...fullMock[1] };
        await act(async () => await currContext.value.addRelationship(relationshipToAdd));
        expect(currFetcher.addRelationship).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run addRelationship cause exception', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getCustomerRelationships: jest.fn().mockResolvedValue([fullMock[0]]),
            addRelationship: jest.fn().mockRejectedValue(new Error()),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual([fullMock[0]]);
        const relationshipToAdd = { ...fullMock[1] };
        try {
            await act(async () => await currContext.value.addRelationship(relationshipToAdd));
        } catch (err) {
            await waitFor(() => expect(currFetcher.addRelationship).toHaveBeenCalledTimes(1));
            expect(currContext.value.errorState).toEqual(RelationshipErrorEnum.RELATIONSHIP_CRUD);
        }
    });

    it('run deleteRelationship', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getRelationshipsMock();
        const currFetcher = {
            ...mockFetcher,
            getCustomerRelationships: jest.fn().mockResolvedValue(currMock),
            deleteRelationship: jest.fn().mockResolvedValue(currMock[1].id),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual(currMock);
        const relationshipToDelete = currMock[0];
        await act(async () => await currContext.value.deleteRelationship(relationshipToDelete.id));
        expect(currFetcher.deleteRelationship).toHaveBeenCalledTimes(1);
        expect(currFetcher.deleteRelationship.mock.calls[0][0]).toEqual(relationshipToDelete.id);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run deleteRelationship - throw exception', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getRelationshipsMock();
        const currFetcher = {
            ...mockFetcher,
            getCustomerRelationships: jest.fn().mockResolvedValue(currMock),
            deleteRelationship: jest.fn().mockRejectedValue(new Error()),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual(currMock);
        const groupToDelete = currMock[0];
        try {
            await act(async () => await currContext.value.deleteRelationship(groupToDelete.id));
        } catch (err) {
            // Empty catch statement
        }

        expect(currFetcher.deleteRelationship).toHaveBeenCalledTimes(1);
        expect(currContext.value.errorState).toEqual(RelationshipErrorEnum.RELATIONSHIP_CRUD);
    });

    it('run updateRelationship', async () => {
        const currContext: { [key: string]: any } = {};
        const currMock = getRelationshipsMock();
        const currFetcher = { ...mockFetcher, getCustomerRelationships: jest.fn().mockResolvedValue(currMock), updateRelationship: jest.fn() };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual(currMock);
        const relationshipToUpdate = currMock[0];
        await act(async () => await act(async () => await currContext.value.updateRelationship(relationshipToUpdate)));
        expect(currFetcher.updateRelationship).toHaveBeenCalledTimes(1);
        expect(currFetcher.updateRelationship.mock.calls[0][0]).toEqual(relationshipToUpdate);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('run updateRelationship cause exception', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = {
            ...mockFetcher,
            getCustomerRelationships: jest.fn().mockResolvedValue(fullMock),
            updateRelationship: jest.fn().mockRejectedValue(new Error()),
        };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.relationships).toEqual(fullMock);
        const relationshipToUpdate = { ...fullMock[1] };
        try {
            await act(async () => await currContext.value.updateRelationship(relationshipToUpdate));
        } catch (err) {
            await waitFor(() => expect(currFetcher.updateRelationship).toHaveBeenCalledTimes(1));
            expect(currContext.value.errorState).toEqual(RelationshipErrorEnum.RELATIONSHIP_CRUD);
        }
    });

    it('run getContacts', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, getCustomerRelationships: jest.fn().mockResolvedValue(fullMock), getRelevantContacts: jest.fn() };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        currFetcher.getRelevantContacts.mockReset();
        currContext.value.getContacts();
        expect(currFetcher.getRelevantContacts).toHaveBeenCalledTimes(1);
    });

    it('run fetchRelationshipById', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, fetchRelationshipById: jest.fn().mockResolvedValue(fullMock[0]) };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        const relationshipToFetch = { ...fullMock[0] };
        await act(async () => await currContext.value.fetchRelationshipById(relationshipToFetch.id));
        expect(currFetcher.fetchRelationshipById).toHaveBeenCalledTimes(1);
        expect(currFetcher.fetchRelationshipById.mock.calls[0][0]).toEqual(relationshipToFetch.id);
        expect(currContext.value.errorState).toBeFalsy();
    });

    it('throw from fetchRelationshipById', async () => {
        const currContext: { [key: string]: any } = {};
        const currFetcher = { ...mockFetcher, fetchRelationshipById: jest.fn().mockResolvedValue(new Error()) };
        const currParams = { ...params, fetcher: currFetcher };
        const { findByText } = render(
            <RelationshipsContextProvider {...currParams}>
                <RelationshipsContextChildMock context={currContext} />
            </RelationshipsContextProvider>
        );

        expect(await findByText(MOCKED_RELATIONSHIP_CONTEXT_TEXT)).toBeVisible();
        const relationshipToFetch = { ...fullMock[0] };
        try {
            await act(async () => await currContext.value.fetchRelationshipById(relationshipToFetch.id));
        } catch (err) {
            await waitFor(() => expect(currFetcher.fetchRelationshipById).toHaveBeenCalledTimes(1));
            expect(currContext.value.errorState).toEqual(RelationshipErrorEnum.RELATIONSHIP_GET);
        }
    });

    const mockFetcher = {
        ...mockFetcherWithCustomer,
        fetchRelationshipById: jest.fn(),
        addRelationship: jest.fn(),
        deleteRelationship: jest.fn(),
        updateRelationship: jest.fn(),
        getRelationshipTypesMap: jest.fn().mockResolvedValue(new Map<number, string>()),
        getRelevantContacts: jest.fn(),
    };

    const fullMock = getRelationshipsMock();

    const params = {
        fetcher: mockFetcher,
        providers: {},
    };
});
