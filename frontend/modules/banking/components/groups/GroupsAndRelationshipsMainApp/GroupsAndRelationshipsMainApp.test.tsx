import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import getRelationshipsContextMock from '../../../components/relationships/MockRelationshipContext';
import getGroupsContextMock, { myGroup } from '../MockGroupContext';
import { GroupsContext, initialGroupState } from '../contexts/GroupsContext';
import { RelationshipsContext } from '../../../components/relationships/context/RelationshipsContext';
import GroupsAndRelationshipsMainApp from './GroupsAndRelationshipsMainApp';
import groupsTexts from '@fsi/core-components/dist/assets/strings/GroupsControl/GroupsControl.1033.json';
import commonTexts from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { DEFAULT_COLUMN_WIDTH } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';

const RelationshipsContextMock = getRelationshipsContextMock();
const GroupsContextMock = getGroupsContextMock();

let groupsMainAppParams,
    relationshipsMainAppParams,
    emptyStateParams,
    groupsListParams,
    relationshipsCardParams,
    groupsDialogsParams,
    relationshipsDialogsParams,
    messageBarParams;

jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => params => {
    emptyStateParams = params;
    return <div data-testid="empty-state"></div>;
});

jest.mock('../GroupsMainApp', () => params => {
    groupsMainAppParams = params;
    return <div data-testid="groups-main-app"></div>;
});

jest.mock('../../relationships/RelationshipsMainApp', () => params => {
    relationshipsMainAppParams = params;
    return <div data-testid="relationships-main-app"></div>;
});

jest.mock('../GroupsList/GroupsList', () => params => {
    groupsListParams = params;
    return <div data-testid="groups-list"></div>;
});

jest.mock('../../relationships/RelationshipCard/RelationshipCard', () => params => {
    relationshipsCardParams = params;
    return <div data-testid="relationship-card"></div>;
});

jest.mock('../../relationships/RelationshipsDialogs', () => params => {
    relationshipsDialogsParams = params;
    return <div data-testid="relationships-dialogs"></div>;
});

jest.mock('@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar', () => params => {
    messageBarParams = params;
    const testId = params ? 'message-bar' : 'disabled-bar';
    return <div data-testid={testId}></div>;
});

jest.mock('../GroupsDialogs', () => params => {
    groupsDialogsParams = params;
    return <div data-testid="groups-dialogs"></div>;
});
let resizeDetector;

jest.mock('react-resize-detector', () => {
    resizeDetector = jest.fn();
    return {
        useResizeDetector: resizeDetector,
    };
});

jest.mock('../LoadingComponent', () => () => <div data-testid="loading-state" />);

describe('relationship dialogs main component', () => {
    beforeEach(() => {
        resizeDetector.mockReturnValue({ width: DEFAULT_COLUMN_WIDTH * 7, height: 910 });
    });

    afterEach(() => {
        groupsMainAppParams = undefined;
        relationshipsMainAppParams = undefined;
        emptyStateParams = undefined;
        groupsListParams = undefined;
        relationshipsCardParams = undefined;
        groupsDialogsParams = undefined;
        relationshipsDialogsParams = undefined;
        messageBarParams = undefined;
    });

    it('groups should reset selected to initialData when becoming 6 columns', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const onGroupSelected = jest.fn();
        groupsCurrContext.value.setSelectedGroup = onGroupSelected;

        const { rerender } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );
        resizeDetector.mockReturnValue({ width: DEFAULT_COLUMN_WIDTH * 5, height: 910 });
        expect(onGroupSelected).toBeCalledWith(myGroup);

        rerender(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );
        expect(onGroupSelected).toBeCalledWith(initialGroupState);
    });

    it('should render main app component - loading state', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = true;
        groupsCurrContext.value.loadingState.isLoading = true;

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>{<GroupsAndRelationshipsMainApp />}</RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('loading-state')).toBeVisible();
    });

    it('should render main app component - not in loading state', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = false;
        groupsCurrContext.value.loadingState.isLoading = false;

        const { queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(queryByTestId('loading-state')).toBeNull();
    });

    it('should render main app component - empty state callToAction engage group add', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = false;
        groupsCurrContext.value.loadingState.isLoading = false;
        relationshipsCurrContext.value.relationships = [];
        groupsCurrContext.value.groups = [];

        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('empty-state')).toBeVisible();
        act(() => {
            emptyStateParams.callsToAction[0].callback();
        });

        expect(getByTestId('groups-dialogs')).toBeVisible();
    });

    it('should render main app component - empty state callToAction engage relationship add', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = false;
        groupsCurrContext.value.loadingState.isLoading = false;
        relationshipsCurrContext.value.relationships = [];
        groupsCurrContext.value.groups = [];

        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('empty-state')).toBeVisible();
        act(() => {
            emptyStateParams.callsToAction[1].callback();
        });
        expect(getByTestId('relationships-dialogs')).toBeVisible();
    });

    it('should render groups main app on right side', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.relationships = [];

        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('groups-main-app')).toBeVisible();
    });

    it('should render relationships main app on right side when groups is empty', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        groupsCurrContext.value.groups = [];

        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('relationships-main-app')).toBeVisible();
    });

    it('should switch to relationship view', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();

        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => relationshipsCardParams.onSelected());
        expect(getByTestId('relationships-main-app')).toBeVisible();
    });

    it('show relationship delete message', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => relationshipsCardParams.onSelected());
        expect(getByTestId('relationships-main-app')).toBeVisible();
        act(() => relationshipsMainAppParams.showRelationshipDeleteAcceptDialog());
        expect(relationshipsDialogsParams.isDialogOpen).toBeTruthy();
    });

    it('deleteGroup call and call delete', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        groupsCurrContext.value.deleteGroup = deleteFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onDeleteGroupClick());
        expect(groupsDialogsParams.isDialogOpen).toBeTruthy();
        await act(() => groupsDialogsParams.deleteGroup());
        expect(deleteFn).toHaveBeenCalledTimes(1);
    });

    it('deleteRelationship call and call delete', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        relationshipsCurrContext.value.deleteRelationship = deleteFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        await act(() => relationshipsDialogsParams.deleteRelationship());
        expect(deleteFn).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(messageBarParams.regular).toEqual(groupsTexts.RELATIONSHIP_DELETED));
    });

    it('deleteGroup call and call delete throw exception', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        deleteFn.mockRejectedValue('mock error');
        groupsCurrContext.value.deleteGroup = deleteFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onDeleteGroupClick());
        expect(getByTestId('groups-dialogs')).toBeVisible();
        await act(() => groupsDialogsParams.deleteGroup());
        expect(deleteFn).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(messageBarParams.highlight).toEqual(groupsTexts.GROUP_FAIL_TO_DELETE));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();
    });

    it('deleteGroup call and call delete throw exception - retry and delete group', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        deleteFn.mockRejectedValue('mock error');
        groupsCurrContext.value.deleteGroup = deleteFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onDeleteGroupClick());
        expect(getByTestId('groups-dialogs')).toBeVisible();
        await act(() => groupsDialogsParams.deleteGroup());
        expect(deleteFn).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(messageBarParams.highlight).toEqual(groupsTexts.GROUP_FAIL_TO_DELETE));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();

        act(() => groupsListParams.onDeleteGroupClick());
        expect(groupsDialogsParams.isDialogOpen).toBeTruthy();
        await act(() => groupsDialogsParams.deleteGroup());
    });

    it('deleteGroup call and call delete throw exception  3 times - no retry allowed', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        deleteFn.mockRejectedValue('mock error');
        groupsCurrContext.value.deleteGroup = deleteFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onDeleteGroupClick());
        expect(getByTestId('groups-dialogs')).toBeVisible();
        await act(() => groupsDialogsParams.deleteGroup());
        expect(deleteFn).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(messageBarParams.highlight).toEqual(groupsTexts.GROUP_FAIL_TO_DELETE));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();

        await act(() => messageBarParams.linkProps.onClick());
        await act(() => messageBarParams.linkProps.onClick());
        await act(() => messageBarParams.linkProps.onClick());
        expect(messageBarParams.regular).toEqual(groupsTexts.TRY_AGAIN_LATER);
    });

    it('deleteRelationship call and call delete throw exception', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        deleteFn.mockRejectedValue('mock error');
        relationshipsCurrContext.value.deleteRelationship = deleteFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        await act(() => relationshipsDialogsParams.deleteRelationship());
        expect(getByTestId('relationships-dialogs')).toBeVisible();
        expect(deleteFn).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(messageBarParams.highlight).toEqual(groupsTexts.RELATIONSHIP_FAIL_TO_DELETE));
        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
    });

    it('deleteGroup call and dismiss', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const deleteFn = jest.fn();
        groupsCurrContext.value.deleteGroup = deleteFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onDeleteGroupClick());
        expect(getByTestId('groups-dialogs')).toBeVisible();
        act(() => groupsDialogsParams.closeDialog());
        expect(deleteFn).toHaveBeenCalledTimes(0);
    });

    it('deleteGroup to empty array should switch view to relationships', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        groupsCurrContext.value.groups = groupsCurrContext.value.groups.slice(0, 1);
        const deleteFn = jest.fn().mockImplementation(() => (groupsCurrContext.value.groups = []));
        groupsCurrContext.value.deleteGroup = deleteFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onDeleteGroupClick());
        await act(() => groupsDialogsParams.deleteGroup(groupsCurrContext.value.groups[0]));
        await waitFor(() => expect(getByTestId('relationships-main-app')).toBeVisible());
    });

    it('deleteRelationship to empty array should switch view to relationships', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.relationships = relationshipsCurrContext.value.relationships.slice(0, 1);
        const deleteFn = jest.fn();
        relationshipsCurrContext.value.deleteRelationship = deleteFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => relationshipsDialogsParams.deleteRelationship());
        await waitFor(() => expect(getByTestId('groups-main-app')).toBeVisible());
    });

    it('wizard save - open modal and save undef group', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        groupsCurrContext.value.groups[0].id = '';

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(groupsDialogsParams.modalData.isOpen).toBeTruthy();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();
    });

    it('wizard save - open modal and save relationship', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.relationships[0].id = '';

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        await act(() => relationshipsDialogsParams.saveRelationship(relationshipsCurrContext.value.relationships[0]));
        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
    });

    it('wizard save - open modal and update group', async () => {
        const updateFn = jest.fn();
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        groupsCurrContext.value.updateGroup = updateFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(GroupsContextMock.value.groups[0], GroupsContextMock.value.groups[0]));
        expect(updateFn).toHaveBeenCalledTimes(1);
        expect(messageBarParams.regular).toEqual(groupsTexts.GROUP_UPDATED);
    });

    it('wizard save - open modal and update group throw exception - retry and create new group', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const updateFn = jest.fn();
        groupsCurrContext.value.groups[0].id = '';

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(groupsDialogsParams.modalData.isOpen).toBeTruthy();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();

        groupsCurrContext.value.updateGroup = updateFn;
        await act(() => groupsDialogsParams.saveGroup(GroupsContextMock.value.groups[0], GroupsContextMock.value.groups[0]));
        expect(messageBarParams.regular).toEqual(groupsTexts.GROUP_UPDATED);
    });

    it('wizard save - open modal and update group throw exception 3 times - no retry allowed', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const updateFn = jest.fn();
        updateFn.mockRejectedValue('mock error');
        groupsCurrContext.value.updateGroup = updateFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(groupsDialogsParams.modalData.isOpen).toBeTruthy();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();

        await act(() => messageBarParams.linkProps.onClick());
        await act(() => messageBarParams.linkProps.onClick());
        await act(() => messageBarParams.linkProps.onClick());
        expect(messageBarParams.regular).toEqual(groupsTexts.TRY_AGAIN_LATER);
    });

    it('wizard save - open modal and update group return', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(GroupsContextMock.value.groups[0], undefined));
        expect(messageBarParams).toBeUndefined();
    });

    it('wizard save - update relationship', async () => {
        const updateFn = jest.fn();
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.updateRelationship = updateFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
        await act(() => relationshipsDialogsParams.saveRelationship(RelationshipsContextMock.value.relationships[0]));
        expect(updateFn).toHaveBeenCalledTimes(1);
        expect(messageBarParams.regular).toEqual(groupsTexts.RELATIONSHIP_UPDATED);
    });

    it('wizard create - open modal and create new group', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const createFn = jest.fn();
        groupsCurrContext.value.groups[0].id = '';
        groupsCurrContext.value.addGroup = createFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(createFn).toHaveBeenCalledTimes(1);
        expect(messageBarParams.regular).toEqual(groupsTexts.GROUP_CREATED);
    });

    it('wizard create - open modal and create new group throw exception', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const createFn = jest.fn();
        createFn.mockRejectedValue('mock error');
        groupsCurrContext.value.groups[0].id = '';
        groupsCurrContext.value.addGroup = createFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();
        expect(messageBarParams.highlight).toEqual(groupsTexts.GROUP_FAIL_TO_CREATE);
        expect(messageBarParams.linkProps.text).toEqual(`${commonTexts.TRY_AGAIN}.`);
    });

    it('wizard create - open modal and create new group throw exception - retry and create new group', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const createFn = jest.fn();
        createFn.mockRejectedValueOnce('mock error');
        groupsCurrContext.value.groups[0].id = '';
        groupsCurrContext.value.addGroup = createFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();

        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(messageBarParams.regular).toEqual(groupsTexts.GROUP_CREATED);
    });

    it('wizard create - open modal and create new group throw exception 3 times - no retry allowed', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const createFn = jest.fn();
        createFn.mockRejectedValue('mock error');
        groupsCurrContext.value.groups[0].id = '';
        groupsCurrContext.value.addGroup = createFn;

        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        await act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(groupsCurrContext.value.groups[0], groupsCurrContext.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();

        await act(() => messageBarParams.linkProps.onClick());
        await act(() => messageBarParams.linkProps.onClick());
        await act(() => messageBarParams.linkProps.onClick());
        expect(messageBarParams.regular).toEqual(groupsTexts.TRY_AGAIN_LATER);
    });

    it('wizard create - create new relationship throw exception', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const createFn = jest.fn();
        createFn.mockRejectedValue('mock error');
        relationshipsCurrContext.value.relationships[0].id = '';
        relationshipsCurrContext.value.addRelationship = createFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
        await act(() => relationshipsDialogsParams.saveRelationship(relationshipsCurrContext.value.relationships[0]));
        expect(createFn).toHaveBeenCalledTimes(1);
        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
        expect(messageBarParams.highlight).toEqual(groupsTexts.RELATIONSHIP_FAIL_TO_CREATE);
    });

    it('wizard save - open modal and update throw exception', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const updateFn = jest.fn();
        updateFn.mockRejectedValue('mock error');
        groupsCurrContext.value.updateGroup = updateFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(groupsDialogsParams.modalData.isOpen).toBeFalsy();
        act(() => groupsListParams.onAddGroupClick(GroupsContextMock.value.groups[0], 0));
        expect(getByTestId('groups-dialogs')).toBeInTheDocument();
        await act(() => groupsDialogsParams.saveGroup(GroupsContextMock.value.groups[0], GroupsContextMock.value.groups[0]));
        expect(groupsDialogsParams.isDialogOpen).toBeFalsy();
        expect(messageBarParams.highlight).toEqual(groupsTexts.GROUP_FAIL_TO_UPDATE);
    });

    it('wizard save - update relationship throw exception', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const updateFn = jest.fn();
        updateFn.mockRejectedValue('mock error');
        relationshipsCurrContext.value.updateRelationship = updateFn;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...GroupsContextMock}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
        await act(() => relationshipsDialogsParams.saveRelationship(RelationshipsContextMock.value.relationships[0]));
        expect(updateFn).toHaveBeenCalledTimes(1);
        expect(relationshipsDialogsParams.isDialogOpen).toBeFalsy();
        expect(messageBarParams.highlight).toEqual(groupsTexts.RELATIONSHIP_FAIL_TO_UPDATE);
    });

    it('group list component - onGroupSelected with id', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const onGroupSelected = jest.fn();
        groupsCurrContext.value.setSelectedGroup = onGroupSelected;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        groupsListParams.onGroupSelected(groupsCurrContext.value.groups[0].id);
        expect(onGroupSelected).toHaveBeenCalledTimes(1);
    });

    it('group list component - onGroupSelected without id', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const onGroupSelected = jest.fn();
        groupsCurrContext.value.setSelectedGroup = onGroupSelected;
        const { getByTestId, getByText } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        groupsListParams.onGroupSelected('');
        expect(onGroupSelected).toHaveBeenCalledTimes(0);
    });

    it('should select first group after deleting all relationships', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const onGroupSelected = jest.fn();
        groupsCurrContext.value.setSelectedGroup = onGroupSelected;

        const { rerender } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        relationshipsCurrContext.value.relationships = [];

        rerender(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(onGroupSelected).toBeCalledWith(groupsCurrContext.value.groups[0]);
    });

    it('should select first group after deleting group', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        const onGroupSelected = jest.fn();
        groupsCurrContext.value.setSelectedGroup = onGroupSelected;

        const { rerender } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        const leftGroup = groupsCurrContext.value.groups[1];
        groupsCurrContext.value.groups = [leftGroup];

        rerender(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <GroupsAndRelationshipsMainApp />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(onGroupSelected).toBeCalledWith(leftGroup);
    });
});
