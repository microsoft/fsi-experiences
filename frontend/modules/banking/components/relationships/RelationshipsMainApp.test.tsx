import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { IRelationship } from '../../interfaces/Relationships/IRelationship';
import { getRelationshipsMock } from '../../interfaces/Relationships/mocks/IRelationship.mock';
import { RelationshipsContext } from './context/RelationshipsContext';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import RelationshipsMainApp from './RelationshipsMainApp';
import getRelationshipsContextMock from './MockRelationshipContext';

let relationships: IRelationship[], setIsModalOpen, showRelationshipDeleteAcceptDialog, setClickedRelationship, emptyStateParams;

jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => {
    return {
        EmptyState: params => {
            emptyStateParams = params;
            return <div data-testid="empty-state"></div>;
        },
    };
});

jest.mock('../groups/LoadingComponent', () => () => <div data-testid="loading-state" />);

describe('relationship dialogs main component', () => {
    beforeEach(() => {
        relationships = getRelationshipsMock();
    });

    beforeAll(() => {
        setIsModalOpen = jest.fn();
        showRelationshipDeleteAcceptDialog = jest.fn();
        setClickedRelationship = jest.fn();
    });

    afterAll(() => {
        jest.unmock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState');
        jest.unmock('../groups/LoadingComponent');
    });

    afterEach(() => {
        emptyStateParams = undefined;
        setIsModalOpen = jest.fn();
    });

    it('should render main app component - loading state', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.loadingState.isLoading = true;
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainApp
                    relationships={relationships}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('loading-state')).toBeVisible();
    });

    it('should render main app component - not in loading state', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.loadingState.isLoading = false;
        const { queryByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainApp
                    relationships={relationships}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(queryByTestId('loading-state')).toBeNull();
    });

    it('should render main app component - empty state', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [];
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainApp
                    relationships={[]}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(emptyStateParams.icon).toEqual(IMAGE_SRC.create);
        expect(getByTestId('empty-state')).toBeVisible();
    });

    it('should render main app component - empty state callToAction engage', async () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [];
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainApp
                    relationships={[]}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('empty-state')).toBeVisible();
        act(() => emptyStateParams.callsToAction[0].callback());
        expect(setIsModalOpen).toHaveBeenCalledTimes(1);
    });

    it('should render main component - check add relationship button', () => {
        const currContext = getRelationshipsContextMock();

        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainApp
                    relationships={relationships}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        const addButton = getByTestId('relationship-add-button');
        fireEvent.click(addButton);
        expect(setClickedRelationship).toHaveBeenCalledWith(undefined);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });

    it('should render main component - check add relationship button 2', () => {
        const currContext = getRelationshipsContextMock();

        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainApp
                    relationships={relationships}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        const addButton = getByTestId('relationship-add-button');
        fireEvent.click(addButton);
        expect(setClickedRelationship).toHaveBeenCalledWith(undefined);
        expect(setIsModalOpen).toHaveBeenCalledWith(true);
    });
});
