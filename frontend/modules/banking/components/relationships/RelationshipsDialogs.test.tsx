import React from 'react';
import { act, render } from '@testing-library/react';
import { IRelationship } from '../../interfaces/Relationships/IRelationship';
import { getRelationshipsMock } from '../../interfaces/Relationships/mocks/IRelationship.mock';
import { RelationshipsContext } from './context/RelationshipsContext';
import getRelationshipsContextMock from './MockRelationshipContext';
import RelationshipsDialogs from './RelationshipsDialogs';

const RelationshipsContextMock = getRelationshipsContextMock();
let dialogParams, asyncDialogParams;
let dialogData: { isDeleting: boolean; isLoading: boolean; header: string; msg: string },
    isDialogOpen: boolean,
    setIsDialogOpen,
    setIsModalOpen,
    isModalOpen: boolean,
    clickedRelationship: Partial<IRelationship> | undefined,
    setClickedRelationship,
    saveRelationship: (relationship: any) => Promise<void>,
    deleteRelationship: (id: string) => Promise<void>;

jest.mock('./EditRelationshipDialog/EditRelationshipDialog', () => params => {
    dialogParams = params;
    return <div data-testid={`${params.visible ? 'relationship-dialog-open' : 'relationship-dialog-close'}`} />;
});

jest.mock('../groups/AsyncOperationsDialog', () => params => {
    asyncDialogParams = params;
    return (
        <div data-testid={`${params.isOpen ? 'relationship-async-dialog-open' : 'relationship-async-dialog-close'}`}>
            {...params.header} {...params.text}
        </div>
    );
});

describe('relationship dialogs main component', () => {
    beforeEach(() => {
        dialogData = {
            isDeleting: false,
            isLoading: false,
            header: '',
            msg: '',
        };
        isDialogOpen = false;
        isModalOpen = false;
        clickedRelationship = getRelationshipsMock()[0];
    });

    beforeAll(() => {
        saveRelationship = jest.fn();
        deleteRelationship = jest.fn();
        setIsDialogOpen = jest.fn();
        setIsModalOpen = jest.fn();
        setClickedRelationship = jest.fn();
    });

    afterAll(() => {
        jest.unmock('./EditRelationshipDialog/EditRelationshipDialog');
        jest.unmock('../groups/AsyncOperationsDialog');
    });

    afterEach(() => {
        dialogParams = undefined;
        asyncDialogParams = undefined;
    });

    it('dialog close', () => {
        const { queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(queryByTestId('relationship-dialog-close')).toBeVisible();
    });

    it('dialog open', () => {
        const { queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={true}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(queryByTestId('relationship-dialog-open')).toBeVisible();
    });

    it('async dialog close', () => {
        const { queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(queryByTestId('relationship-async-dialog-close')).toBeVisible();
    });

    it('async dialog open', () => {
        const { queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={true}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(queryByTestId('relationship-async-dialog-open')).toBeVisible();
    });

    it('Dialog loading', () => {
        dialogData = { header: 'Some header', msg: 'Some msg', isDeleting: false, isLoading: true };
        isDialogOpen = true;
        const { getByText } = render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={true}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(getByText('Some header Some msg')).toBeVisible();
    });

    it('deleteRelationship call', async () => {
        dialogData.isDeleting = true;
        render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={true}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        act(() => asyncDialogParams.onDeleteClick());
        expect(deleteRelationship).toHaveBeenCalledTimes(1);
    });

    it('addRelationship call', async () => {
        render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={true}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        act(() => dialogParams.saveRelationship());
        expect(saveRelationship).toHaveBeenCalledTimes(1);
    });

    it('Dismiss dialog call', async () => {
        render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={true}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        act(() => dialogParams.onDialogDismiss());
        expect(setIsModalOpen).toHaveBeenCalledTimes(1);
    });

    it('dismiss async dialog call', async () => {
        render(
            <RelationshipsContext.Provider {...RelationshipsContextMock}>
                <RelationshipsDialogs
                    dialogData={dialogData}
                    isDialogOpen={true}
                    setIsDialogOpen={setIsDialogOpen}
                    setIsModalOpen={setIsModalOpen}
                    isModalOpen={isModalOpen}
                    clickedRelationship={clickedRelationship}
                    setClickedRelationship={setClickedRelationship}
                    saveRelationship={saveRelationship}
                    deleteRelationship={deleteRelationship}
                />
            </RelationshipsContext.Provider>
        );

        act(() => asyncDialogParams.onDismiss());
        expect(setIsModalOpen).toHaveBeenCalledTimes(1);
    });
});
