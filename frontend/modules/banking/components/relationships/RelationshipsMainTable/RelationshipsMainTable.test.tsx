import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import RelationshipsMainTable from './RelationshipsMainTable';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import { getRelationshipsMock } from '../../../interfaces/Relationships/mocks/IRelationship.mock';
import getRelationshipsContextMock from './../MockRelationshipContext';
import { RelationshipsContext } from '../context/RelationshipsContext';
import relationshipTexts from '@fsi/core-components/dist/assets/strings/Relationship/Relationship.1033.json';

let relationships: IRelationship[], setIsModalOpen, showRelationshipDeleteAcceptDialog, setClickedRelationship, emptyStateParams, isCompactMode;

describe('relationship dialogs main component', () => {
    beforeEach(() => {
        relationships = getRelationshipsMock();
        isCompactMode = false;
    });

    beforeAll(() => {
        setIsModalOpen = jest.fn();
        showRelationshipDeleteAcceptDialog = jest.fn();
        setClickedRelationship = jest.fn();
    });

    afterEach(() => {
        emptyStateParams = undefined;
        setIsModalOpen = jest.fn();
        showRelationshipDeleteAcceptDialog = jest.fn();
        setClickedRelationship = jest.fn();
    });

    it('should render main component table', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = relationships;

        const { getAllByTestId, getByText } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainTable
                    relationships={relationships}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        expect(getAllByTestId('clickable-persona')).toHaveLength(2);
        expect(getAllByTestId('relationship-type-value')).toHaveLength(2);
        expect(getAllByTestId(/relationship-update-/i)).toHaveLength(2);
        expect(getAllByTestId(/relationship-delete-/i)).toHaveLength(2);
        expect(getByText(relationshipTexts.RELATIONSHIP_TYPE_COLUMN_NAME)).toBeVisible();
        expect(getByText(relationshipTexts.CONTACT_COLUMN_NAME)).toBeVisible();
    });

    it('responsive - should render main component table compacted', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = relationships;

        const { getAllByTestId, getByText, queryByText, queryAllByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainTable
                    relationships={relationships}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                    isCompactMode={true}
                />
            </RelationshipsContext.Provider>
        );

        expect(getAllByTestId('clickable-persona')).toHaveLength(2);
        expect(queryAllByTestId('relationship-type-value')).toHaveLength(0);
        expect(getAllByTestId(/relationship-update-/i)).toHaveLength(2);
        expect(getAllByTestId(/relationship-delete-/i)).toHaveLength(2);
        expect(queryByText(relationshipTexts.RELATIONSHIP_TYPE_COLUMN_NAME)).toBeNull();
        expect(getByText(relationshipTexts.CONTACT_COLUMN_NAME)).toBeVisible();
    });

    it('should update relationship', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [relationships[0]];

        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainTable
                    relationships={[relationships[0]]}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        const updateButton = getByTestId(/relationship-update-/i);
        fireEvent.click(updateButton);
        expect(setClickedRelationship).toHaveBeenCalledWith(relationships[0]);
        expect(setIsModalOpen).toHaveBeenCalledTimes(1);
    });

    it('should be readonly table', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [relationships[0]];

        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainTable
                    relationships={[relationships[0]]}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                    readonly
                />
            </RelationshipsContext.Provider>
        );

        const deleteButton = getByTestId(/relationship-delete-/i);
        fireEvent.click(deleteButton);
        expect(setClickedRelationship).not.toBeCalled();
    });

    it('should delete relationship', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [relationships[0]];

        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipsMainTable
                    relationships={[relationships[0]]}
                    setIsModalOpen={setIsModalOpen}
                    showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    setClickedRelationship={setClickedRelationship}
                />
            </RelationshipsContext.Provider>
        );

        const deleteButton = getByTestId(/relationship-delete-/i);
        fireEvent.click(deleteButton);
        expect(setClickedRelationship).toHaveBeenCalledWith(relationships[0]);
        expect(showRelationshipDeleteAcceptDialog).toHaveBeenCalledTimes(1);
    });

    // eslint-disable-next-line jest/no-commented-out-tests
    // it('should not show add / delete buttons', () => {
    //     const currContext = getRelationshipsContextMock()
    //     currContext.value.relationships = [relationships[0]];

    //     const { getByTestId, getAllByRole } = render(
    //         <RelationshipsContext.Provider {...currContext}>
    //             <RelationshipsMainTable relationships={[relationships[0]]} setIsModalOpen={setIsModalOpen} showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog} setClickedRelationship={setClickedRelationship} />
    //         </RelationshipsContext.Provider>
    //     )

    //     const updateBtn = getByTestId(`relationship-update-${relationships[0].id}`)
    //     const deleteBtn = getByTestId(`relationship-delete-${relationships[0].id}`)

    //     expect(updateBtn).not.toBeVisible()
    //     expect(deleteBtn).not.toBeVisible()
    //     userEvent.hover(updateBtn);
    //     waitFor(() => expect(updateBtn).toBeVisible())
    //     waitFor(() => expect(deleteBtn).toBeVisible())
    // })
});
