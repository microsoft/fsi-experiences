import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { getRelationshipsMock } from '../../../interfaces/Relationships/mocks/IRelationship.mock';
import getGroupsContextMock from '../../../components/groups/MockGroupContext';
import getRelationshipsContextMock from './../MockRelationshipContext';
import { GroupsContext } from '../../../components/groups/contexts';
import { RelationshipsContext } from '../context';
import { RelationshipErrorEnum } from '../RelationshipErrorEnum';
import RelationshipCard from './RelationshipCard';

const RelationhipContextMock = getRelationshipsContextMock();

jest.mock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState', () => params => <div data-testid="error-state"></div>);

jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => params => <div data-testid="empty-state"></div>);

describe('relationship card component', () => {
    let relationships, isSelected, onSelected, onAddRelationship;

    beforeEach(() => {
        relationships = getRelationshipsMock();
        isSelected = true;
    });

    beforeAll(() => {
        onSelected = jest.fn().mockImplementation(() => (isSelected = true));
        onAddRelationship = jest.fn();
    });

    it('Should render relationship card', () => {
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <RelationshipCard
                    onSelected={onSelected}
                    isSelected={isSelected}
                    onAddRelationship={onAddRelationship}
                    relationships={relationships}
                />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('relationship-card-component')).toBeVisible();
        expect(getByTestId('relationship-card-facepile-wrapper')).toBeVisible();
    });

    it('should render main app component - error state', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [];
        currContext.value.errorState = RelationshipErrorEnum.RELATIONSHIP_INIT;
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipCard onSelected={onSelected} isSelected={isSelected} onAddRelationship={onAddRelationship} relationships={[]} />
            </RelationshipsContext.Provider>
        );
        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render disabled add group when error state', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [];
        currContext.value.errorState = RelationshipErrorEnum.RELATIONSHIP_INIT;
        const { getByRole } = render(
            <RelationshipsContext.Provider {...currContext}>
                <RelationshipCard onSelected={onSelected} isSelected={isSelected} onAddRelationship={onAddRelationship} relationships={[]} />
            </RelationshipsContext.Provider>
        );
        const button = getByRole('button');
        expect(button).toBeDisabled();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render empty state card', () => {
        const currContext = getRelationshipsContextMock();
        currContext.value.relationships = [];
        const groupsContext = getGroupsContextMock();
        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsContext}>
                <RelationshipsContext.Provider {...currContext}>
                    <RelationshipCard onSelected={onSelected} isSelected={isSelected} onAddRelationship={onAddRelationship} relationships={[]} />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );
        const button = getByTestId('empty-state');
    });

    it('Should render relationship card with selected class', () => {
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <RelationshipCard
                    onSelected={onSelected}
                    isSelected={isSelected}
                    onAddRelationship={onAddRelationship}
                    relationships={relationships}
                />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('relationship-card-facepile-wrapper')).toHaveClass('group-selected');
    });

    it('Should render readonly', () => {
        const { getByTestId, queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <RelationshipCard readonly onSelected={onSelected} isSelected={isSelected} onAddRelationship={onAddRelationship} relationships={[]} />
            </RelationshipsContext.Provider>
        );

        const button = getByTestId('relationship-list-add-button');
        fireEvent.click(button);

        expect(onAddRelationship).not.toBeCalled();
    });

    it('Should render relationship card with length 0', () => {
        const { getByTestId, queryByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <RelationshipCard onSelected={onSelected} isSelected={isSelected} onAddRelationship={onAddRelationship} relationships={[]} />
            </RelationshipsContext.Provider>
        );

        expect(getByTestId('relationship-list-add-button')).toBeVisible();
        expect(queryByTestId('relationship-card-facepile-wrapper')).toBeNull();

        const button = getByTestId('relationship-list-add-button');
        fireEvent.click(button);
        expect(onAddRelationship).toHaveBeenCalledTimes(1);
    });

    it('Should render relationship card 2', () => {
        isSelected = false;
        const { getByTestId } = render(
            <RelationshipsContext.Provider {...RelationhipContextMock}>
                <RelationshipCard
                    onSelected={onSelected}
                    isSelected={isSelected}
                    onAddRelationship={onAddRelationship}
                    relationships={relationships}
                />
            </RelationshipsContext.Provider>
        );

        const button = getByTestId('relationship-card-facepile-wrapper');
        expect(button).toBeVisible();
        fireEvent.click(button);
        expect(isSelected).toBe(true);
    });
});
