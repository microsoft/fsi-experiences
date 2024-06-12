import React from 'react';
import { act, render } from '@testing-library/react';
import getRelationshipsContextMock from '../../../components/relationships/MockRelationshipContext';
import getGroupsContextMock from '../MockGroupContext';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import { GroupsContext } from '../contexts/GroupsContext';
import { RelationshipsContext } from '../../../components/relationships/context/RelationshipsContext';
import RenderCommonAppComponent from './RenderCommonAppComponent';
import { getRelationshipsMock } from '../../../interfaces/Relationships/mocks/IRelationship.mock';
import { GroupErrorEnum } from '../GroupErrorEnum';
import { RelationshipErrorEnum } from '../../../components/relationships';

let groupsMainAppParams,
    relationshipsMainAppParams,
    emptyStateParams,
    openGroupModal,
    setIsRelationshipModalOpen,
    groupRelationshipSwitch,
    showRelationshipDeleteAcceptDialog,
    relationships,
    setClickedRelationship;

jest.mock('@fsi/core-components/dist/components/atoms/EmptyState/EmptyState', () => params => {
    emptyStateParams = params;
    return <div data-testid="empty-state"></div>;
});

jest.mock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState', () => params => <div data-testid="error-state"></div>);

jest.mock('../GroupsMainApp', () => params => {
    groupsMainAppParams = params;
    return <div data-testid="groups-main-app"></div>;
});

jest.mock('../../relationships/RelationshipsMainApp', () => params => {
    relationshipsMainAppParams = params;
    return <div data-testid="relationships-main-app"></div>;
});

jest.mock('../LoadingComponent', () => () => <div data-testid="loading-state" />);

const onDeleteGroupClick = jest.fn();

describe('relationship dialogs main component', () => {
    beforeEach(() => {
        openGroupModal = jest.fn();
        setIsRelationshipModalOpen = jest.fn();
        groupRelationshipSwitch = true;
        showRelationshipDeleteAcceptDialog = jest.fn();
        relationships = getRelationshipsMock();
        setClickedRelationship = jest.fn();
        onDeleteGroupClick.mockReset();
    });

    afterEach(() => {
        groupsMainAppParams = undefined;
        relationshipsMainAppParams = undefined;
        emptyStateParams = undefined;
    });

    it('should render main app component - loading state', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = true;
        groupsCurrContext.value.loadingState.isLoading = true;

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    {
                        <RenderCommonAppComponent
                            onDeleteGroupClick={onDeleteGroupClick}
                            openGroupModal={openGroupModal}
                            setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                            groupRelationshipSwitch={groupRelationshipSwitch}
                            showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                            relationships={relationships}
                            setClickedRelationship={setClickedRelationship}
                        />
                    }
                </RelationshipsContext.Provider>
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
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(queryByTestId('loading-state')).toBeNull();
    });

    it('should render main app component - error state', () => {
        const groupsCurrContext = getGroupsContextMock();
        groupsCurrContext.value.errorState = GroupErrorEnum.GROUPS_GET;
        groupsCurrContext.value.groups = [];
        const relationshipsCurrContext = getRelationshipsContextMock();
        relationshipsCurrContext.value.errorState = RelationshipErrorEnum.RELATIONSHIP_INIT;
        relationshipsCurrContext.value.relationships = [];

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );
        expect(getByTestId('error-state')).toBeVisible();
    });

    it('should render main app component - empty state', () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.relationships = [];
        groupsCurrContext.value.groups = [];

        const { getByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(emptyStateParams.icon).toEqual(IMAGE_SRC.create);
        expect(getByTestId('empty-state')).toBeVisible();
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
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('empty-state')).toBeVisible();
        act(() => {
            emptyStateParams.callsToAction[0].callback();
        });
        expect(openGroupModal).toHaveBeenCalledTimes(1);
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
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('empty-state')).toBeVisible();
        act(() => {
            emptyStateParams.callsToAction[1].callback();
        });
        expect(setIsRelationshipModalOpen).toHaveBeenCalledTimes(1);
    });

    it('should render main app component - add group disabled due to readonly', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = false;
        groupsCurrContext.value.loadingState.isLoading = false;
        groupsCurrContext.value.readonly = true;
        groupsCurrContext.value.groups = [];
        relationshipsCurrContext.value.relationships = [];

        render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(emptyStateParams.callsToAction[0].disabled).toEqual(true);
    });

    it('should render main app component - add relationship disabled due to readonly', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.loadingState.isLoading = false;
        groupsCurrContext.value.loadingState.isLoading = false;
        relationshipsCurrContext.value.readonly = true;
        groupsCurrContext.value.groups = [];
        relationshipsCurrContext.value.relationships = [];

        render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(emptyStateParams.callsToAction[1].disabled).toEqual(true);
        expect(emptyStateParams.callsToAction[0].disabled).toEqual(false);
    });

    it('should render groups main app on right side', async () => {
        const relationshipsCurrContext = getRelationshipsContextMock();
        const groupsCurrContext = getGroupsContextMock();
        relationshipsCurrContext.value.relationships = [];

        const { getByTestId, queryByTestId } = render(
            <GroupsContext.Provider {...groupsCurrContext}>
                <RelationshipsContext.Provider {...relationshipsCurrContext}>
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
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
                    <RenderCommonAppComponent
                        onDeleteGroupClick={onDeleteGroupClick}
                        openGroupModal={openGroupModal}
                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                        groupRelationshipSwitch={groupRelationshipSwitch}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                    />
                </RelationshipsContext.Provider>
            </GroupsContext.Provider>
        );

        expect(getByTestId('relationships-main-app')).toBeVisible();
    });
});
