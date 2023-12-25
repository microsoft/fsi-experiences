import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { GroupsContext } from '../contexts/GroupsContext';
import getGroupsContextMock from '../MockGroupContext';
import getGroupContextMock from '../MockGroupContext';
import cloneDeep from 'lodash/cloneDeep';
import { GroupErrorEnum } from '../GroupErrorEnum';
import GroupsList from './GroupsList';
import { RelationshipsContext } from '../../../components/relationships/context/RelationshipsContext';
import getRelationshipsContextMock from '../../../components/relationships/MockRelationshipContext';

let currCardParams;

jest.mock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState', () => params => <div data-testid="error-state"></div>);

jest.mock('../GroupCard/GroupCard', () => cardParams => {
    currCardParams.push(cardParams);
    return <div data-testid="card-mock"></div>;
});

let emptyStateParams;
jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => {
    return {
        EmptyState: params => {
            emptyStateParams = params;
            return <div data-testid="empty-state"></div>;
        },
    };
});

describe('Group list component', () => {
    beforeEach(() => {
        currCardParams = [];
    });
    afterAll(() => {
        jest.unmock('../GroupCard/GroupCard');
    });

    it('should render group list component', () => {
        const { getByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-list-component')).toBeVisible();
    });

    it('should render group card components as the size of the mock', () => {
        const { getAllByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );

        expect(getAllByTestId(/card-mock/i).length).toEqual(fullMock.groupsArray.length);
    });

    it('should render main app component - error state', () => {
        const currContext = getGroupsContextMock();
        currContext.value.groups = [];
        currContext.value.errorState = GroupErrorEnum.GROUPS_GET;
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );
        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render disabled add group when error state', () => {
        const currContext = getGroupsContextMock();
        currContext.value.groups = [];
        currContext.value.errorState = GroupErrorEnum.GROUPS_GET;
        const { getByRole } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );
        const button = getByRole('button');
        expect(button).toBeDisabled();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should render empty state card', () => {
        const currContext = getRelationshipsContextMock();
        const groupsContext = getGroupsContextMock();
        groupsContext.value.groups = [];
        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsContext}>
                <RelationshipsContext.Provider {...currContext}>
                    <GroupsList {...params} />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );
        const button = getByTestId('empty-state');
    });

    it('should not render group card components (empty state)', () => {
        const currContext = cloneDeep(groupContextMock);
        currContext.value.groups = [];
        const { queryAllByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );

        expect(queryAllByTestId(/card-mock/i).length).toEqual(0);
    });

    it('is primary should be true', () => {
        const currContext = cloneDeep(groupContextMock);
        currContext.value.groups = [myGroup];
        currContext.value.mainCustomer = myGroup.members.find(m => m.IsPrimaryGroup)!.customer;
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-list-component')).toBeVisible();
        expect(currCardParams[0].isPrimary).toBeTruthy();
    });

    it('is primary should be false', () => {
        const currContext = cloneDeep(groupContextMock);
        currContext.value.groups = [myGroup];
        currContext.value.mainCustomer = myGroup.members.find(m => !m.IsPrimaryGroup)!.customer;
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-list-component')).toBeVisible();
        expect(currCardParams[0].isPrimary).toBeFalsy();
    });

    it('is primary should be false since no main customer exists', () => {
        const currContext = cloneDeep(groupContextMock);
        currContext.value.groups = [myGroup];
        currContext.value.mainCustomer = { ...myGroup.members[0].customer, id: 'mock' };
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsList {...params} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-list-component')).toBeVisible();
        expect(currCardParams[0].isPrimary).toBeFalsy();
    });

    // eslint-disable-next-line jest/expect-expect
    it('should call onAddGroupClick', done => {
        const currParams = { ...params, onAddGroupClick: () => done() };
        const { getByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupsList {...currParams} />
            </GroupsContext.Provider>
        );

        const addButton = getByTestId('group-list-component-add-group-button');
        fireEvent.click(addButton);
    });

    it('should call onGroupSelected', done => {
        const currParams = { ...params, onGroupSelected: () => done() };
        const { getByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupsList {...currParams} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('group-list-component')).toBeVisible();
        currCardParams[0].onSelected();
    });

    const fullMock = getFullMock();
    const myGroup = fullMock.groupsArray[0];
    const params = {
        selectedGroup: myGroup,
        onGroupSelected: id => {},
        onAddGroupClick: (group, step) => {},
        onDeleteGroupClick: group => {},
    };

    const groupContextMock = getGroupContextMock();
});
