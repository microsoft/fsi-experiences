import React, { FC, useContext, useEffect, useState, useRef } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { IGroup } from '../../../interfaces/Groups';
import { GroupsContext, initialGroupState } from '../contexts/GroupsContext';
import GroupsList from '../GroupsList/GroupsList';
import { IHighlightMessageBarProps } from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar.interface';
import HighlightMessageBar from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import GroupsDialogs from '../GroupsDialogs';
import RelationshipsDialogs from '../../../components/relationships/RelationshipsDialogs';
import {
    backIconStyles,
    groupsPanelWrapper,
    leftPanelRoot,
    leftPanelWrapper,
    loadingWindowStyle,
    mainAppStyles,
    mainDetailsStyle,
    mainDetailsWrapperStyle,
    mainGroupAppMessageBarStyle,
    mainStackStyles,
    navigationStyles,
    navigationTextStyles,
    refDivCss,
    relationshipPanelWrapper,
    rootStyles,
} from './GroupsAndRelationshipsMainApp.style';
import { RelationshipsContext } from '../../../components/relationships/context/RelationshipsContext';
import RelationshipCard from '../../../components/relationships/RelationshipCard/RelationshipCard';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Text } from '@fluentui/react/lib/Text';
import RenderCommonAppComponent from './RenderCommonAppComponent';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import useResponsiveContainer from '@fsi/core-components/dist/context/hooks/useResponsiveContainer';
import { usePrevious } from '@fsi/core-components/dist/hooks/usePrevious/usePrevious';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { useLoggerService } from '@fsi/core-components/dist/context/hooks/useLoggerService';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry';
import { duplicateRelationshipCode } from './GroupAndRelationshipsMainApp.const';
import { FHHiddenMessageBar } from '../../FHHiddenMessageBar/FHHiddenMessageBar';

const rootTokens = { childrenGap: '16px' };
const backTitleTokens = { childrenGap: '8px' };
const maxRetires = 3;

const GroupsAndRelationshipsMainApp: FC = () => {
    const groupsContext = useContext(GroupsContext);
    const relationshipsContext = useContext(RelationshipsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const loggerService = useLoggerService();
    const operationMessageBarRef = useRef<HTMLDivElement>(null);
    const { ref, columns, className, height } = useResponsiveContainer('groups-and-relationships');

    const [modalData, setModalData] = useState<{ isOpen: boolean; group: IGroup; step: number }>({
        isOpen: false,
        group: groupsContext.defaultGroup,
        step: 0,
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState<{
        isDeleting: boolean;
        isLoading: boolean;
        header: string;
        msg: string;
    }>({ isDeleting: false, isLoading: false, header: '', msg: '' });
    const [isRelationshipDialogOpen, setIsRelationshipDialogOpen] = useState<boolean>(false); //For delete or loading
    const [relationshipDialogData, setRelationshipDialogData] = useState<{
        isDeleting: boolean;
        isLoading: boolean;
        header: string;
        msg: string;
    }>({ isDeleting: false, isLoading: false, msg: '', header: '' });
    const [isRelationshipModalOpen, setIsRelationshipModalOpen] = useState<boolean>(false); //For add or update

    const [operationMessageBar, setOperationMessageBar] = useState<IHighlightMessageBarProps | undefined>();
    const [clickedRelationship, setClickedRelationship] = useState<Partial<IRelationship> | undefined>(undefined);
    const [groupRelationshipSwitch, setGroupRelationshipSwitch] = useState<boolean>(true);

    const { initialized, groups } = groupsContext;

    useEffect(() => {
        if (operationMessageBar) {
            operationMessageBarRef.current?.scrollIntoView();
        }
    }, [operationMessageBar]);

    const onGroupSelected = (id: string) => {
        const selectedHh = groupsContext.groups.find(g => g.id === id);

        loggerService.logInfo(GroupsAndRelationshipsMainApp.name, onGroupSelected.name, 'Selected group ' + selectedHh?.id, {
            id: selectedHh?.id,
        });

        if (selectedHh) {
            groupsContext.setSelectedGroup(selectedHh);
            setGroupRelationshipSwitch(true);
        }
    };

    const onRelationshipsSelected = () => {
        groupsContext.setSelectedGroup(initialGroupState);
        loggerService.logInfo(GroupsAndRelationshipsMainApp.name, onRelationshipsSelected.name, 'Selected relationships tab.', {
            relationships: relationshipsContext.relationships.map(relationship => relationship.id),
        });
        setGroupRelationshipSwitch(false);
    };

    const openGroupModal = (groupToOpen: IGroup | null, step: number) => {
        loggerService.logInfo(GroupsAndRelationshipsMainApp.name, openGroupModal.name, 'Opened group modal.', {
            groupId: groupToOpen?.id,
        });
        setModalData({ isOpen: true, group: groupToOpen || groupsContext.defaultGroup, step });
    };

    const updateDialogData = (isDeleting: boolean, isLoading: boolean, header: string, msg: string) => {
        loggerService.logInfo(GroupsAndRelationshipsMainApp.name, updateDialogData.name, 'Setting dialog data.', {
            isDeleting,
            isLoading,
            header,
            msg,
        });
        setDialogData({ isDeleting, isLoading, header, msg });
    };

    const showDeleteAcceptDialog = () => {
        setIsDialogOpen(true);
        updateDialogData(true, false, translate('DELETE_GROUP_CONFIRM_TITLE'), translate('DELETE_GROUP_CONFIRM_TEXT'));
    };

    const showRelationshipDeleteAcceptDialog = () => {
        setIsRelationshipDialogOpen(true);
        setRelationshipDialogData({
            isDeleting: true,
            isLoading: false,
            header: translate('DELETE_RELATIONSHIP_CONFIRM_TITLE'),
            msg: translate('DELETE_RELATIONSHIP_CONFIRM_TEXT'),
        });
    };

    const closeDialog = () => setIsDialogOpen(false);

    const saveGroup = async (initialGroup: IGroup, updatedGroup?: IGroup, retryNumber = 0) => {
        if (!updatedGroup) {
            loggerService.logError(
                GroupsAndRelationshipsMainApp.name,
                saveGroup.name,
                'saveGroup failed - updatedGroup is null.',
                FSIErrorTypes.NullReference,
                undefined,
                { groupId: initialGroup?.id }
            );
            return;
        }

        setIsDialogOpen(true);
        try {
            if (initialGroup.id) {
                loggerService.logInfo(GroupsAndRelationshipsMainApp.name, saveGroup.name, 'Updating group.', {
                    initialGroupId: initialGroup?.id,
                    updatedGroupId: updatedGroup?.id,
                });
                updateDialogData(false, true, translate('UPDATING_GROUP_TITLE'), translate('UPDATING_GROUP_TEXT'));

                await groupsContext.updateGroup(initialGroup, updatedGroup);
            } else {
                loggerService.logInfo(GroupsAndRelationshipsMainApp.name, saveGroup.name, 'Creating group.', {
                    updatedGroupId: updatedGroup?.id,
                });
                updateDialogData(false, true, translate('CREATING_GROUP_TITLE'), translate('CREATING_GROUP_TEXT'));

                await groupsContext.addGroup(updatedGroup);
                setGroupRelationshipSwitch(true);
            }
            setOperationMessageBar({
                messageBarType: MessageBarType.success,
                regular: initialGroup.id ? translate('GROUP_UPDATED') : translate('GROUP_CREATED'),
            });
        } catch (err) {
            const errorHeader = initialGroup.id ? translate('GROUP_FAIL_TO_UPDATE') : translate('GROUP_FAIL_TO_CREATE');

            if (retryNumber < maxRetires) {
                loggerService.logError(
                    GroupsAndRelationshipsMainApp.name,
                    saveGroup.name,
                    `Retry No. ${retryNumber + 1} - saving group`,
                    FSIErrorTypes.ServerError,
                    err,
                    {
                        retryNumber: retryNumber,
                        initialGroupId: initialGroup?.id,
                        updatedGroupId: updatedGroup?.id,
                    }
                );
                const retryFunc = () => saveGroup(initialGroup, updatedGroup, retryNumber + 1);

                setOperationMessageBar({
                    messageBarType: MessageBarType.severeWarning,
                    highlight: errorHeader,
                    linkProps: { onClick: retryFunc, text: `${translate('TRY_AGAIN')}.` },
                });
            } else {
                loggerService.logError(GroupsAndRelationshipsMainApp.name, saveGroup.name, 'Error saving group.', FSIErrorTypes.ServerError, err, {
                    initialGroupId: initialGroup?.id,
                    updatedGroupId: updatedGroup?.id,
                });
                setOperationMessageBar({
                    messageBarType: MessageBarType.severeWarning,
                    highlight: errorHeader,
                    regular: translate('TRY_AGAIN_LATER'),
                });
            }
        }
        closeDialog();
    };

    const deleteGroup = async (group: IGroup, retryNumber = 0) => {
        setIsDialogOpen(true);
        updateDialogData(false, true, translate('DELETING_GROUP_TITLE'), translate('DELETING_GROUP_TEXT'));
        try {
            await groupsContext.deleteGroup(group);
            setOperationMessageBar({
                messageBarType: MessageBarType.success,
                regular: translate('GROUP_DELETED'),
            });
            loggerService.logInfo(GroupsAndRelationshipsMainApp.name, deleteGroup.name, 'Deleting group.', { groupId: group?.id });
        } catch (err) {
            if (retryNumber < maxRetires) {
                loggerService.logError(
                    GroupsAndRelationshipsMainApp.name,
                    deleteGroup.name,
                    `Retry No. ${retryNumber + 1} - deleting group`,
                    FSIErrorTypes.ServerError,
                    err,
                    {
                        groupId: group?.id,
                    }
                );
                const retryFunc = () => deleteGroup(group, retryNumber + 1);

                setOperationMessageBar({
                    messageBarType: MessageBarType.severeWarning,
                    highlight: translate('GROUP_FAIL_TO_DELETE'),
                    linkProps: { onClick: retryFunc, text: `${translate('TRY_AGAIN')}.` },
                });
            } else {
                loggerService.logError(
                    GroupsAndRelationshipsMainApp.name,
                    deleteGroup.name,
                    'Error deleting group.',
                    FSIErrorTypes.ServerError,
                    err,
                    {
                        groupId: group?.id,
                    }
                );
                setOperationMessageBar({
                    messageBarType: MessageBarType.severeWarning,
                    highlight: translate('GROUP_FAIL_TO_DELETE'),
                    regular: translate('TRY_AGAIN_LATER'),
                });
            }
        }
        closeDialog();
    };

    const closeRelationshipDialog = () => setIsRelationshipDialogOpen(false);

    const saveRelationship = async (relationship: IRelationship) => {
        setIsRelationshipDialogOpen(true);
        try {
            if (relationship.id) {
                loggerService.logInfo(GroupsAndRelationshipsMainApp.name, saveRelationship.name, 'Updating relationship.', {
                    relationhipId: relationship?.id,
                });

                setRelationshipDialogData({
                    isDeleting: false,
                    isLoading: true,
                    header: translate('UPDATING_RELATIONSHIP_TITLE'),
                    msg: translate('UPDATING_RELATIONSHIP_TEXT'),
                });
                await relationshipsContext.updateRelationship({
                    id: relationship.id,
                    relationshipType: relationship.relationshipType,
                    contactFrom: relationship.contactFrom,
                    contactTo: relationship.contactTo,
                });
            } else {
                loggerService.logInfo(GroupsAndRelationshipsMainApp.name, saveRelationship.name, 'Creating relationship.', {
                    relationhipId: relationship?.id,
                });

                setRelationshipDialogData({
                    isDeleting: false,
                    isLoading: true,
                    header: translate('CREATING_RELATIONSHIP_TITLE'),
                    msg: translate('CREATING_RELATIONSHIP_TEXT'),
                });
                await relationshipsContext.addRelationship({
                    id: relationship.id,
                    relationshipType: relationship.relationshipType,
                    contactFrom: relationship.contactFrom,
                    contactTo: relationship.contactTo,
                });
                setGroupRelationshipSwitch(false);
            }

            setOperationMessageBar({
                messageBarType: MessageBarType.success,
                regular: relationship.id ? translate('RELATIONSHIP_UPDATED') : translate('RELATIONSHIP_CREATED'),
            });
            setClickedRelationship(undefined);
        } catch (err: any) {
            loggerService.logError(
                GroupsAndRelationshipsMainApp.name,
                saveRelationship.name,
                'Error saving relationship.',
                FSIErrorTypes.ServerError,
                err,
                { relationshipId: relationship?.id }
            );

            if (err.code === duplicateRelationshipCode) {
                setOperationMessageBar({
                    messageBarType: MessageBarType.severeWarning,
                    highlight: translate('ALREADY_EXISTS_RELATIONSHIP'),
                });
            } else {
                const errorHeader = relationship.id ? translate('RELATIONSHIP_FAIL_TO_UPDATE') : translate('RELATIONSHIP_FAIL_TO_CREATE');
                setOperationMessageBar({
                    messageBarType: MessageBarType.severeWarning,
                    highlight: errorHeader,
                    regular: translate('TRY_AGAIN_LATER'),
                });
            }
        }
        closeRelationshipDialog();
    };

    const deleteRelationship = async (id: string) => {
        setIsRelationshipDialogOpen(true);
        try {
            loggerService.logInfo(GroupsAndRelationshipsMainApp.name, deleteRelationship.name, 'Deleting relationship.', {
                relationhipId: id,
            });

            setRelationshipDialogData({ isDeleting: false, isLoading: true, header: translate('DELETING_RELATIONSHIP_TITLE'), msg: '' });
            await relationshipsContext.deleteRelationship(id);
            setOperationMessageBar({
                messageBarType: MessageBarType.success,
                regular: translate('RELATIONSHIP_DELETED'),
            });
            setClickedRelationship(undefined);
        } catch (err) {
            loggerService.logError(
                GroupsAndRelationshipsMainApp.name,
                deleteRelationship.name,
                'Error deleting relationship.',
                FSIErrorTypes.ServerError,
                err,
                { relationshipId: id }
            );

            setOperationMessageBar({
                messageBarType: MessageBarType.severeWarning,
                regular: translate('TRY_AGAIN_LATER'),
                highlight: translate('RELATIONSHIP_FAIL_TO_DELETE'),
            });
        }
        closeRelationshipDialog();
    };

    const removeSelection = () => {
        setGroupRelationshipSwitch(true);
        groupsContext.setSelectedGroup(initialGroupState);
    };

    const updateSelection = () => {
        if (splitLayout) {
            removeSelection();
            return;
        }

        const selected = groupsContext.groups?.find((g: IGroup) => g.id === groupsContext.selectedGroup.id);

        if (selected !== undefined) {
            groupsContext.setSelectedGroup(selected);
        } else if (groupsContext.groups?.length !== 0) {
            groupsContext.setSelectedGroup(groupsContext.groups[0]);
            setGroupRelationshipSwitch(true);
        }
    };

    const relationships = relationshipsContext.relationships;
    const prevRelationships = usePrevious(relationships) || [];

    useEffect(() => {
        if (relationships.length === 0 && prevRelationships.length > 0) {
            updateSelection();
        }
    }, [relationships]);

    const prevGroups = usePrevious(groups) || [];

    useEffect(() => {
        if (groups.length && prevGroups.length > groups.length) {
            updateSelection();
        }
    }, [groups]);

    const splitLayout = !columns || columns <= 6;

    useEffect(() => {
        updateSelection();
    }, [initialized, splitLayout]);

    const isSelectedGroupOrRelationShips = groupsContext.selectedGroup.id !== 'newId' || !groupRelationshipSwitch;
    const fhRequestMetadata = groupRelationshipSwitch
        ? groupsContext.selectedGroup.fhRequestMetadata || groupsContext.groups?.[0]?.fhRequestMetadata
        : {};

    const isSticky = (height || 0) >= 600;

    return (
        <>
            {(groupsContext.loadingState.isLoading || relationshipsContext.loadingState.isLoading) && (
                <div style={loadingWindowStyle} data-testid="group-main-app-loading" />
            )}
            <div ref={ref} style={refDivCss} className={className}>
                <Stack styles={rootStyles(splitLayout)}>
                    <Stack.Item>
                        <FHHiddenMessageBar
                            requestMetadata={fhRequestMetadata || {}}
                            highlightedText={translate('HIDDEN_INFORMATIOM_MAIN')}
                            regularText={translate('HIDDEN_INFORMATIOM_SUB')}
                        />
                    </Stack.Item>
                    <Stack styles={mainAppStyles({ isSticky })} grow>
                        {isSelectedGroupOrRelationShips && (
                            <Stack styles={navigationStyles}>
                                <Stack tokens={backTitleTokens} verticalAlign="center" horizontal>
                                    <IconButton
                                        onClick={removeSelection}
                                        aria-label={translate('BACK_TO_CONNECTION')}
                                        styles={backIconStyles}
                                        iconProps={{ iconName: 'Back' }}
                                    />
                                    <Text styles={navigationTextStyles}>{translate('CONNECTIONS')}</Text>
                                </Stack>
                            </Stack>
                        )}
                        {operationMessageBar && (
                            <HighlightMessageBar
                                {...operationMessageBar}
                                styles={mainGroupAppMessageBarStyle}
                                onDismiss={() => /*istanbul ignore next */ setOperationMessageBar(undefined)}
                                ref={operationMessageBarRef}
                            />
                        )}
                        <Stack horizontal tokens={rootTokens} styles={mainStackStyles(splitLayout)} grow>
                            <Stack styles={leftPanelWrapper(isSelectedGroupOrRelationShips)}>
                                <Stack styles={leftPanelRoot({ splitLayout, isSticky })}>
                                    <Stack styles={groupsPanelWrapper}>
                                        <GroupsList
                                            readonly={groupsContext.readonly}
                                            selectedGroup={groupsContext.selectedGroup}
                                            onGroupSelected={onGroupSelected}
                                            onAddGroupClick={openGroupModal}
                                            onDeleteGroupClick={showDeleteAcceptDialog}
                                        />
                                    </Stack>
                                    <Stack styles={relationshipPanelWrapper}>
                                        <RelationshipCard
                                            readonly={relationshipsContext.readonly}
                                            isSelected={!groupRelationshipSwitch}
                                            onSelected={onRelationshipsSelected}
                                            onAddRelationship={setIsRelationshipModalOpen}
                                            relationships={relationships}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack.Item styles={mainDetailsWrapperStyle(isSelectedGroupOrRelationShips)}>
                                <Stack styles={mainDetailsStyle}>
                                    <GroupsDialogs
                                        setModalData={setModalData}
                                        modalData={modalData}
                                        isDialogOpen={isDialogOpen}
                                        dialogData={dialogData}
                                        saveGroup={saveGroup}
                                        deleteGroup={deleteGroup}
                                        closeDialog={closeDialog}
                                    />
                                    <RelationshipsDialogs
                                        setIsModalOpen={setIsRelationshipModalOpen}
                                        isModalOpen={isRelationshipModalOpen}
                                        dialogData={relationshipDialogData}
                                        saveRelationship={saveRelationship}
                                        deleteRelationship={deleteRelationship}
                                        isDialogOpen={isRelationshipDialogOpen}
                                        setIsDialogOpen={setIsRelationshipDialogOpen}
                                        clickedRelationship={clickedRelationship}
                                        setClickedRelationship={setClickedRelationship}
                                    />
                                    <RenderCommonAppComponent
                                        openGroupModal={openGroupModal}
                                        setIsRelationshipModalOpen={setIsRelationshipModalOpen}
                                        groupRelationshipSwitch={groupRelationshipSwitch}
                                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                                        relationships={relationships}
                                        setClickedRelationship={setClickedRelationship}
                                        onDeleteGroupClick={showDeleteAcceptDialog}
                                    />
                                </Stack>
                            </Stack.Item>
                        </Stack>
                    </Stack>
                </Stack>
            </div>
        </>
    );
};

export default GroupsAndRelationshipsMainApp;
