import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Separator } from '@fluentui/react/lib/Separator';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Stack } from '@fluentui/react/lib/Stack';
import { DetailsList } from '@fluentui/react/lib/DetailsList';
import { IBasePickerProps, BasePickerListBelow, IBasePickerSuggestionsProps } from '@fluentui/react/lib/Pickers';
import { IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { GroupsContext } from '../../contexts/GroupsContext';
import { SelectionMode } from '@fluentui/utilities/lib/selection/Selection.types';
import { IGroupMember, IGroup, IGroupContact } from '../../../../interfaces/Groups';
import { RolesTypes, defaultRolesTypes } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { IColumn } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { IDropdownOption } from '@fluentui/react/lib/components/Dropdown/Dropdown.types';
import { UpdateMessageBarFunction } from '@fsi/core-components/dist/components/atoms/WizardStep/WizardStep.interface';
import { detailsListStyles } from '@fsi/core-components/dist/styles/DetailsList.style';
import { rootStyles } from '../GroupWizardViews.style';
import { SharedColors } from '@fluentui/react/lib/Theme';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { TooltipHost } from '@fluentui/react/lib/components/Tooltip/TooltipHost';
import { useId } from '@fluentui/react-hooks/lib/useId';
import {
    groupMembertooltipHostStyle,
    calloutProps,
    groupMembersTextStyle,
    groupMembersSeparatorStyles,
    groupMembersPickerStyles,
    primaryTextStyles,
} from './GroupMembersComponent.style';
import { onRenderMemberName, onRenderRule, onRenderPrimaryMember } from './renderers';

export interface IGroupMembersComponentProps {
    group: IGroup;
    originalPrimaryMember: string;
    onUpdateMessageBar: UpdateMessageBarFunction;
    onDataChanged: (data: { field: string; val: any }[]) => void;
    responsiveColumns?: number;
}

export interface IMemberPickerProps extends IBasePickerProps<IGroupContact> {}
class MemberPicker extends BasePickerListBelow<IGroupContact, IMemberPickerProps> {}

export const GroupMembersComponent: FC<IGroupMembersComponentProps> = ({
    group,
    originalPrimaryMember,
    onDataChanged,
    onUpdateMessageBar,
    responsiveColumns = 12,
}) => {
    // This key is because fluent behaviour see: https://dev.azure.com/dynamicscrm/Solutions/_workitems/edit/2575150/
    const [uniqueKey, setKey] = useState(0);
    const groupsContext = useContext(GroupsContext);
    const translate = useTranslation(namespaces.GROUPS_CONTROL);
    const primaryMemberColumnName: any = useMemo(
        () => (
            <Stack id="is-primary-member" horizontal styles={primaryTextStyles}>
                {translate('PRIMARY_MEMBER')}&nbsp;<div style={{ color: SharedColors.red20 }}>*</div>
            </Stack>
        ),
        [translate]
    );

    const [mostRecentlyUsed, setMostRecentlyUsed] = useState<IGroupContact[]>([]);

    const suggestionProps: IBasePickerSuggestionsProps = useMemo(
        () => ({
            suggestionsHeaderText: translate('SUGGESTED_PEOPLE'),
            noResultsFoundText: translate('NO_RESULT_FOUND'),
        }),
        [translate]
    );
    const pickerCalloutProps = useMemo(
        () => ({
            onDismiss: ev => {
                setKey(prevKey => prevKey + 1);
            },
        }),
        [setKey]
    );

    const onMemberDelete = useCallback(
        (item: IGroupMember) => {
            const indexToRemove = group.members.findIndex(m => m.id === item.id);
            const updatedArray = [...group.members];
            if (indexToRemove !== -1) {
                updatedArray.splice(indexToRemove, 1);
                const retData: { field: string; val: any }[] = [];
                retData.push({ field: 'members', val: updatedArray });

                if (group.primaryMember === group.members[indexToRemove].id) {
                    retData.push({ field: 'primaryMember', val: '' });
                }

                onDataChanged(retData);
            }
        },
        [group, onDataChanged]
    );

    const onRoleChanged = useCallback(
        (member: IGroupMember, newRole: any) => {
            const gm = group.members.find(m => m.id === member.id);
            if (gm) {
                gm.role = newRole;
                onDataChanged([{ field: 'members', val: [...group.members] }]);
            }
        },
        [onDataChanged, group]
    );

    const updateMessageBar = useCallback(
        (primaryMember: string) => {
            if (!primaryMember) {
                onUpdateMessageBar(MessageBarType.severeWarning, {
                    bold: translate('PRIMARY_MEMBER_REMOVED'),
                    regular: translate('PRIMARY_MEMBER_REMOVED_SUB_TEXT'),
                });
                return;
            }
            if (group.id && primaryMember !== originalPrimaryMember) {
                onUpdateMessageBar(MessageBarType.warning, {
                    bold: translate('PRIMARY_MEMBER_CHANGED'),
                    regular: translate('PRIMARY_MEMBER_ADDRESS'),
                });
                return;
            }
            onUpdateMessageBar(MessageBarType.info, { bold: translate('ADD_MEMBER'), regular: translate('PRIMARY_MEMBER_INFO') });
        },
        [group.id, originalPrimaryMember, onUpdateMessageBar, translate]
    );

    useEffect(() => {
        updateMessageBar(group.primaryMember);
    }, [group.primaryMember, updateMessageBar]);

    const onFilterChanged = async (filterText: string, currentPersonas?: IGroupContact[], limitResults?: number): Promise<IGroupContact[]> => {
        if (group.members.length === 0 || !filterText) {
            return [];
        }

        let result = await groupsContext.getContacts(filterText);
        result = result.filter(persona => !isGroupContainsPersona(persona));
        result = limitResults ? result.slice(0, limitResults) : result;
        return result;
    };

    const returnMostRecentlyUsed = (currentPersonas?: IGroupContact[]): IGroupContact[] | Promise<IGroupContact[]> => {
        // mostRecentlyUsed is not in use yet, ignoring coverage
        /* istanbul ignore next */
        return mostRecentlyUsed?.filter(persona => !isGroupContainsPersona(persona)) || [];
    };

    const isGroupContainsPersona = (persona: IGroupContact) => {
        /* istanbul ignore if */
        if (!group.members.length) {
            return false;
        }
        return group.members.some(item => item.customer.id === persona.id);
    };

    const getTextFromItem = (persona: IGroupContact): string => persona.name;

    const options: IDropdownOption[] = useMemo(() => {
        const pickListOptions: IDropdownOption[] = Array.from(groupsContext.pickLists.groupMemberTypes.keys())
            .filter(k => {
                return (RolesTypes[group.type] ?? defaultRolesTypes)?.has(k);
            })
            .map(k => {
                const text = groupsContext.pickLists.groupMemberTypes.get(k);
                const option: IDropdownOption = {
                    key: k,
                    text: text ? text : '',
                    ariaLabel: text ? text : '',
                };
                return option;
            });

        return pickListOptions;
    }, [group, groupsContext.pickLists]);

    const onPrimaryMemberChanged = useCallback((item: IGroupMember) => onDataChanged([{ field: 'primaryMember', val: item.id }]), [onDataChanged]);

    const toolTipId = useId('indicator-tooltip');

    const deleteColumn = useMemo(
        () => ({
            key: 'delete',
            name: '',
            fieldName: 'delete',
            isIconOnly: true,
            minWidth: 40,
            maxWidth: 40,
            data: 'string',
            onRender: (item: IGroupMember) => {
                const isGroupPrimaryMember = item.customer.id === groupsContext.mainCustomer.id;
                return (
                    <TooltipHost
                        calloutProps={calloutProps}
                        id={toolTipId}
                        content={isGroupPrimaryMember ? translate('TRASH_CAN_DISABLED_TOOL_TIP') : translate('TRASH_CAN_ACTIVE_TOOL_TIP')}
                        data-testid="member-delete-tooltip"
                        styles={groupMembertooltipHostStyle}
                    >
                        <IconButton
                            data-testid={`group-member-delete-${item.id}`}
                            disabled={isGroupPrimaryMember}
                            iconProps={{ iconName: 'Delete', 'aria-hidden': true }}
                            aria-label={translate('DELETE')}
                            title={translate('EDIT')}
                            onClick={() => onMemberDelete(item)}
                        />
                    </TooltipHost>
                );
            },
        }),
        [groupsContext.mainCustomer, toolTipId, translate, onMemberDelete]
    );
    const columnsOfMinSevenResponsiveColumns: IColumn[] = useMemo(
        () => [
            {
                key: 'memberName',
                name: translate('MEMBER_NAME'),
                fieldName: 'memberName',
                minWidth: 130,
                maxWidth: 327,
                data: 'string',
                onRender: onRenderMemberName,
            },
            {
                key: 'primaryMember',
                name: primaryMemberColumnName,
                fieldName: 'primaryMember',
                minWidth: 130,
                maxWidth: 130,
                data: 'bool',
                onRender: onRenderPrimaryMember({ onPrimaryMemberChanged, group }),
            },
            {
                key: 'role',
                name: translate('GROUPS_CARD_ROLE'),
                fieldName: 'role',
                minWidth: 160,
                maxWidth: 300,
                data: 'string',
                onRender: onRenderRule({ onRoleChanged, translate, options }),
            },
            deleteColumn,
        ],
        [translate, primaryMemberColumnName, onPrimaryMemberChanged, group, onRoleChanged, options, deleteColumn]
    );

    const columnsOfMinThreeResponsiveColumns: IColumn[] = useMemo(
        () => [
            {
                key: 'memberNameAndRole',
                name: translate('MEMBER_NAME_AND_ROLE'),
                minWidth: 149,
                maxWidth: 327,
                onRender: (item: IGroupMember) => (
                    <Stack tokens={{ childrenGap: 18 }}>
                        {onRenderMemberName(item)}
                        {onRenderRule({ options, translate, onRoleChanged })(item)}
                    </Stack>
                ),
            },
            {
                key: 'primaryMember',
                name: primaryMemberColumnName,
                fieldName: 'primaryMember',
                minWidth: 130,
                data: 'bool',
                onRender: onRenderPrimaryMember({ group, onPrimaryMemberChanged }),
            },
            deleteColumn,
        ],
        [translate, primaryMemberColumnName, group, onPrimaryMemberChanged, deleteColumn, options, onRoleChanged]
    );

    const columnsOfMinOneResponsiveColumns: IColumn[] = useMemo(
        () => [
            {
                key: 'memberNameAndRole',
                name: translate('MEMBER_NAME_AND_ROLE'),
                minWidth: 160,
                maxWidth: 327,
                onRender: (item: IGroupMember) => (
                    <Stack tokens={{ childrenGap: 18 }}>
                        {onRenderMemberName(item)}
                        {onRenderRule({ options, translate, onRoleChanged })(item)}
                        <Stack horizontal tokens={{ childrenGap: 24 }} verticalAlign="center">
                            {primaryMemberColumnName}
                            {onRenderPrimaryMember({ group, onPrimaryMemberChanged })(item)}
                        </Stack>
                    </Stack>
                ),
            },
            deleteColumn,
        ],
        [translate, deleteColumn, options, onRoleChanged, primaryMemberColumnName, group, onPrimaryMemberChanged]
    );

    const columns = useMemo(() => {
        if (responsiveColumns <= 3) {
            return columnsOfMinOneResponsiveColumns;
        }
        if (responsiveColumns <= 6) {
            return columnsOfMinThreeResponsiveColumns;
        }

        return columnsOfMinSevenResponsiveColumns;
    }, [responsiveColumns, columnsOfMinSevenResponsiveColumns, columnsOfMinOneResponsiveColumns, columnsOfMinThreeResponsiveColumns]);

    const onMemberAdd = (item: IGroupContact | undefined) => {
        if (!item) {
            return null;
        }

        if (group.members) {
            const newGroupMember: IGroupMember = {
                id: item.id,
                IsPrimaryGroup: false,
                role: 0,
                customer: item,
            };
            onDataChanged([{ field: 'members', val: [...group.members, newGroupMember] }]);
        }

        // return null since we don't need the picker functionality
        return null;
    };

    return (
        <Stack horizontalAlign="start" data-testid="group-members" styles={rootStyles}>
            <Text styles={groupMembersTextStyle}> {translate('GROUPS_MEMBERS', { members: `${group.members.length}` })}</Text>
            <Separator styles={groupMembersSeparatorStyles} />
            <Stack.Item styles={groupMembersPickerStyles}>
                <MemberPicker
                    onResolveSuggestions={onFilterChanged}
                    onEmptyInputFocus={returnMostRecentlyUsed}
                    getTextFromItem={getTextFromItem}
                    pickerSuggestionsProps={suggestionProps}
                    onRenderSuggestionsItem={item => (
                        <Persona
                            data-testid={`group-members-persona-${item.id}`}
                            key={item.id}
                            styles={{ root: { margin: '6px' } }}
                            text={item.name}
                            size={PersonaSize.size32}
                        />
                    )}
                    key={uniqueKey}
                    pickerCalloutProps={pickerCalloutProps}
                    onItemSelected={onMemberAdd}
                    onRenderItem={_ => <></>}
                    className={'ms-PeoplePicker'}
                    inputProps={{
                        'aria-label': translate('ARIA_LABEL_PEOPLE_PICKER'),
                        placeholder: translate('SEARCH'),
                    }}
                    resolveDelay={300}
                />
            </Stack.Item>
            <Stack styles={{ root: { width: '100%' } }}>
                <DetailsList
                    items={group.members}
                    setKey="set"
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    ariaLabelForSelectionColumn={translate('ARIA_LABEL_SELECTION_COLUMN')}
                    ariaLabelForSelectAllCheckbox={translate('ARIA_LABEL_SELECT_ALL_CHECK_BOX')}
                    checkButtonAriaLabel={translate('ARIA_LABEL_CHECK_BUTTON')}
                    styles={detailsListStyles}
                />
            </Stack>
        </Stack>
    );
};

export default GroupMembersComponent;
