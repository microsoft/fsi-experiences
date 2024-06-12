import React from 'react';
import { act, render } from '@testing-library/react';
import { GroupsContext } from './contexts/GroupsContext';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import getGroupsContextMock from './MockGroupContext';
import GroupsMainApp from './GroupsMainApp';

const GroupsContextMock = getGroupsContextMock();
let emptyStateParams, groupMainAppComponentParams, groupDialogParams, groupListComponentParams, wizardParams, openGroupModal;

jest.mock('./LoadingComponent', () => params => <div data-testid="loading-state" />);

jest.mock('@fsi/core-components/dist/components/containers/Wizard/Wizard', () => params => {
    wizardParams = params;
    return <div data-testid="group-wizard" />;
});
jest.mock('./GroupsList/GroupsList', () => params => {
    groupListComponentParams = params;
    return <div data-testid="group-list-component" />;
});
jest.mock('./AsyncOperationsDialog', () => params => {
    groupDialogParams = params;
    return <div data-testid={`${params.isOpen ? 'group-dialog-open' : 'group-dialog-close'}`} />;
});
jest.mock('./GroupMainDetails/GroupMainDetails', () => params => {
    groupMainAppComponentParams = params;
    return <div data-testid="group-main-app-component" />;
});
jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => {
    return {
        EmptyState: params => {
            emptyStateParams = params;
            return <div data-testid="empty-state"></div>;
        },
    };
});

const onDeleteGroupClick = jest.fn();

describe('group app main component', () => {
    beforeAll(() => {
        openGroupModal = jest.fn();
    });
    beforeEach(() => {
        onDeleteGroupClick.mockReset();
    });

    afterAll(() => {
        jest.unmock('./GroupsList/GroupsList');
        jest.unmock('@fsi/core-components/dist/components/containers/Wizard/Wizard');
        jest.unmock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState');
        jest.unmock('./AsyncOperationsDialog');
        jest.unmock('./LoadingComponent');
        jest.unmock('./GroupMainDetails/GroupMainDetails');
    });

    afterEach(() => {
        emptyStateParams = undefined;
        groupMainAppComponentParams = undefined;
        groupDialogParams = undefined;
        groupListComponentParams = undefined;
        wizardParams = undefined;
    });

    it('should render main app component - loading state', () => {
        const currContext = getGroupsContextMock();
        currContext.value.loadingState.isLoading = true;
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(getByTestId('loading-state')).toBeVisible();
    });

    it('should render main app component - not in loading state', () => {
        const currContext = getGroupsContextMock();
        currContext.value.loadingState.isLoading = false;
        const { queryByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(queryByTestId('loading-state')).toBeNull();
    });

    it('should render main app component - main component', () => {
        const { getByTestId } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(groupMainAppComponentParams.group).toEqual(GroupsContextMock.value.selectedGroup);
        expect(getByTestId('group-main-app-component')).toBeVisible();
    });

    it('should render main app component - empty state', () => {
        const currContext = getGroupsContextMock();
        currContext.value.groups = [];
        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(emptyStateParams.icon).toEqual(IMAGE_SRC.create);
        expect(getByTestId('empty-state')).toBeVisible();
    });

    it('should render main app component - empty state callToAction engage', async () => {
        const currContext = getGroupsContextMock();
        currContext.value.groups = [];
        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(emptyStateParams.icon).toEqual(IMAGE_SRC.create);
        expect(getByTestId('empty-state')).toBeVisible();
        act(() => emptyStateParams.callsToAction[0].callback());
        expect(openGroupModal).toHaveBeenCalledTimes(1);
    });

    it('should render main component - isPrimary true', () => {
        const currContext = getGroupsContextMock();
        currContext.value.selectedGroup = currContext.value.groups[0];
        currContext.value.selectedGroup.members[0].IsPrimaryGroup = true;
        currContext.value.mainCustomer = currContext.value.selectedGroup.members[0].customer;

        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(groupMainAppComponentParams.isPrimary).toBeTruthy();
        expect(getByTestId('group-main-app-component')).toBeVisible();
    });

    it('should render main component - isPrimary false', () => {
        const currContext = getGroupsContextMock();
        currContext.value.selectedGroup = currContext.value.groups[0];
        currContext.value.selectedGroup.members[0].IsPrimaryGroup = false;
        currContext.value.mainCustomer = currContext.value.selectedGroup.members[0].customer;

        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(groupMainAppComponentParams.isPrimary).toBeFalsy();
        expect(getByTestId('group-main-app-component')).toBeVisible();
    });

    it('should render main component - no main member - isPrimary false', () => {
        const currContext = getGroupsContextMock();
        currContext.value.selectedGroup = currContext.value.groups[0];
        currContext.value.selectedGroup.members[0].IsPrimaryGroup = false;
        currContext.value.mainCustomer = { ...currContext.value.selectedGroup.members[0].customer, id: 'mock' };

        const { getByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupsMainApp onDeleteGroupClick={onDeleteGroupClick} openGroupModal={openGroupModal} />
            </GroupsContext.Provider>
        );

        expect(groupMainAppComponentParams.isPrimary).toBeFalsy();
        expect(getByTestId('group-main-app-component')).toBeVisible();
    });
});
