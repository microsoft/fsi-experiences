import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GroupsContext } from '../../contexts/GroupsContext';
import { getFullMock } from '../../../../interfaces/Groups/mocks/IGroup.mock';
import getGroupContextMock from '../../MockGroupContext';
import set from 'lodash/set';
import GroupMembersComponent from './GroupMembersComponent';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar/MessageBar.types';
import groupsControlStrings from '@fsi/core-components/dist/assets/strings/GroupsControl/GroupsControl.1033.json';

let choiceGroupParams = {
    'group-primary-choice': {},
    'group-address-choice': {},
};

let dropdownParams;
let basePickerListBelowParams;

jest.mock('@fluentui/react/lib/ChoiceGroup', () => {
    return {
        ChoiceGroup: params => {
            choiceGroupParams[params['data-testid']][params.options[0].key] = params;
            return <div></div>;
        },
    };
});

jest.mock('@fluentui/react/lib/Dropdown', () => {
    return {
        Dropdown: params => {
            dropdownParams = params;
            return <div></div>;
        },
    };
});

let basePickerListBelowInnerFn = params => {};
jest.mock('@fluentui/react/lib/pickers', () => {
    return {
        BasePickerListBelow: params => {
            basePickerListBelowParams = params;
            basePickerListBelowInnerFn(params);
            return (
                <>
                    {basePickerListBelowParams.onRenderItem()}
                    {params.onRenderSuggestionsItem(getFullMock().groupsArray[0].members[0].customer)}
                </>
            );
        },
        ValidationState: { valid: 1, warning: 2, invalid: 3 },
    };
});

describe('test group members component', () => {
    beforeEach(() => {
        choiceGroupParams = {
            'group-primary-choice': {},
            'group-address-choice': {},
        };
        params.onUpdateMessageBar.mockReset();
        params.onDataChanged.mockReset();
        params.group = getFullMock().groupsArray[0];
        dropdownParams = undefined;
        basePickerListBelowParams = undefined;
        basePickerListBelowInnerFn = params => {};
    });

    it('should render group members component', async () => {
        const { findByTestId } = render(<GroupMembersComponent {...params} />);

        expect(await findByTestId('group-members')).toBeVisible();
        expect(params.onUpdateMessageBar).toHaveBeenCalledTimes(1);
    });

    it('should call data change when primary member selected', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        params.onDataChanged.mockReset();
        const secMemId = params.group.members[1].id;
        const secondary = choiceGroupParams['group-primary-choice'][secMemId];
        secondary.onChange();
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onDataChanged).toHaveBeenCalledWith([{ field: 'primaryMember', val: secMemId }]);
    });

    it('should change group data when switching between primary member', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const secMemId = params.group.members[1].id;
        const secondary = choiceGroupParams['group-primary-choice'][secMemId];
        secondary.onChange();
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onDataChanged).toHaveBeenCalledWith([{ field: 'primaryMember', val: 'gm2' }]);
    });

    it('should show correct message according to the primary member', async () => {
        const currGroup = getFullMock().groupsArray[0];
        const { findByTestId, rerender } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...{ ...params, group: currGroup }} />
            </GroupsContext.Provider>
        );

        currGroup.primaryMember = currGroup.members[1].id;
        rerender(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...{ ...params, group: currGroup }} />
            </GroupsContext.Provider>
        );

        currGroup.primaryMember = '';
        rerender(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...{ ...params, group: currGroup }} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        expect(params.onUpdateMessageBar).toHaveBeenCalledTimes(3);
        expect(params.onUpdateMessageBar).toHaveBeenNthCalledWith(1, MessageBarType.info, {
            bold: groupsControlStrings.ADD_MEMBER,
            regular: groupsControlStrings.PRIMARY_MEMBER_INFO,
        });
        expect(params.onUpdateMessageBar).toHaveBeenNthCalledWith(2, MessageBarType.warning, {
            bold: groupsControlStrings.PRIMARY_MEMBER_CHANGED,
            regular: groupsControlStrings.PRIMARY_MEMBER_ADDRESS,
        });
        expect(params.onUpdateMessageBar).toHaveBeenNthCalledWith(3, MessageBarType.severeWarning, {
            bold: groupsControlStrings.PRIMARY_MEMBER_REMOVED,
            regular: groupsControlStrings.PRIMARY_MEMBER_REMOVED_SUB_TEXT,
        });
    });

    it('dropdown options taken from context picklist', async () => {
        const currGroupContext = getGroupContextMock();
        const mockTypeKey = 104800001;
        currGroupContext.value.pickLists.groupMemberTypes = new Map<number, string>([
            [mockTypeKey, 'mockType'],
            [1, ''],
        ]);

        const currGroup = getFullMock().groupsArray[0];
        currGroup.type = 104800000;
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContext}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const options = dropdownParams.options;
        expect(options).toHaveLength(1);
        expect(options[0].key).toEqual(mockTypeKey);
    });

    it('dropdown options of household group', async () => {
        const currGroupContext = getGroupContextMock();
        const householdRole = 104800001;
        const otherRole = 104800005;
        currGroupContext.value.pickLists.groupMemberTypes = new Map<number, string>([
            [householdRole, 'mockRole'],
            [otherRole, 'mockRole'],
        ]);

        const currGroup = getFullMock().groupsArray[0];
        currGroup.type = 104800000;
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContext}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const options = dropdownParams.options;
        expect(options).toHaveLength(1);
        expect(options[0].key).toEqual(householdRole);
    });

    it('dropdown options of other type group', async () => {
        const currGroupContext = getGroupContextMock();
        const householdRole = 104800001;
        const otherRole = 104800005;
        currGroupContext.value.pickLists.groupMemberTypes = new Map<number, string>([
            [householdRole, 'mockRole'],
            [otherRole, 'mockRole'],
        ]);

        const currGroup = getFullMock().groupsArray[0];
        currGroup.type = 104800003;
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContext}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const options = dropdownParams.options;
        expect(options).toHaveLength(1);
        expect(options[0].key).toEqual(otherRole);
    });

    it('dropdown options with invalid values', async () => {
        const currGroupContext = getGroupContextMock();
        const mockTypeKey = 104800001;
        currGroupContext.value.pickLists.groupMemberTypes = new Map<number, string>([
            [mockTypeKey, ''],
            [1, '1'],
        ]);

        const currGroup = getFullMock().groupsArray[0];
        currGroup.type = 104800000;
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContext}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const options = dropdownParams.options;
        expect(options).toHaveLength(1);
        expect(options[0].key).toEqual(mockTypeKey);
        expect(options[0].text).toEqual('');
    });

    it('dropdown options when group type invalid', async () => {
        const currGroupContext = getGroupContextMock();
        const mockTypeKey = 104800001;
        currGroupContext.value.pickLists.groupMemberTypes = new Map<number, string>([[mockTypeKey, 'mockType']]);

        const currGroup = getFullMock().groupsArray[0];
        currGroup.type = 1;
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContext}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const options = dropdownParams.options;
        expect(options).toHaveLength(0);
    });

    it('dropdown role change with null role', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        params.onDataChanged.mockReset();
        dropdownParams.onChange(null, null);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        const dataChangeParams = params.onDataChanged.mock.calls[0][0][0];
        expect(dataChangeParams.field).toEqual('members');
        expect(dataChangeParams.val[dataChangeParams.val.length - 1].role).toEqual(undefined);
    });

    it('dropdown role change with group member not exists', async () => {
        const currGroup = getFullMock().groupsArray[0];
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        currParams.group.members = [];
        currParams.onDataChanged.mockReset();
        dropdownParams.onChange(null, { key: '1' });
        expect(currParams.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should show relevant tooltip message on trash icon', async () => {
        const currGroup = getFullMock().groupsArray[0];
        const currParams = { ...params, group: currGroup };
        const { findByTestId, queryByText } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const deleteButton = await findByTestId(`group-member-delete-${currGroup.members[1].id}`);
        expect(deleteButton).toBeVisible();
        fireEvent.mouseEnter(deleteButton);
        expect(queryByText(groupsControlStrings.TRASH_CAN_ACTIVE_TOOL_TIP)).toBeVisible();
        const deleteButtonPrimaryMember = await findByTestId(`group-member-delete-${params.group.primaryMember}`);
        expect(deleteButtonPrimaryMember).toBeVisible();
        fireEvent.mouseEnter(deleteButtonPrimaryMember);
        expect(queryByText(groupsControlStrings.TRASH_CAN_DISABLED_TOOL_TIP)).toBeVisible();
    });

    it('should call the delete function', async () => {
        const currGroup = getFullMock().groupsArray[0];
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const deleteButton = await findByTestId(`group-member-delete-${currGroup.members[1].id}`);
        expect(deleteButton).toBeVisible();
        params.onDataChanged.mockReset();
        fireEvent.click(deleteButton);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        const retVal = params.onDataChanged.mock.calls[0][0];
        expect(retVal).toHaveLength(1);
        expect(retVal[0].field).toEqual('members');
    });

    it('should call the delete function - member not found', async () => {
        const currGroup = getFullMock().groupsArray[0];
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const deleteButton = await findByTestId(`group-member-delete-${currGroup.members[1].id}`);
        expect(deleteButton).toBeVisible();
        params.onDataChanged.mockReset();
        currParams.group.members = [];
        fireEvent.click(deleteButton);
        expect(params.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should call the delete function - member primary', async () => {
        const currGroup = getFullMock().groupsArray[0];
        currGroup.primaryMember = currGroup.members[1].id;
        const currParams = { ...params, group: currGroup };
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const deleteButton = await findByTestId(`group-member-delete-${currGroup.members[1].id}`);
        expect(deleteButton).toBeVisible();
        params.onDataChanged.mockReset();
        params.onUpdateMessageBar.mockReset();
        fireEvent.click(deleteButton);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        const retVal = params.onDataChanged.mock.calls[0][0];
        expect(retVal).toHaveLength(2);
        expect(retVal[0].field).toEqual('members');
        expect(retVal[1].field).toEqual('primaryMember');
        expect(retVal[1].val).toEqual('');
    });

    it('should run onFilterChanged - no filter', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const rtVal = await basePickerListBelowParams.onResolveSuggestions();
        expect(rtVal).toHaveLength(0);
    });

    it('should run onFilterChanged - no members', async () => {
        const group = getFullMock().groupsArray[0];
        group.members = [];
        const currParams = { ...params, group };
        const currContext = getGroupContextMock();
        currContext.value.getContacts = jest.fn();
        const { findByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupMembersComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const rtVal = await basePickerListBelowParams.onResolveSuggestions('s');
        expect(rtVal).toHaveLength(0);
        expect(currContext.value.getContacts).toHaveBeenCalledTimes(0);
    });

    it('should run onFilterChanged - new members', async () => {
        const currContext = getGroupContextMock();
        const member = getFullMock().groupsArray[0].members[0];
        member.id = 'mockId';
        currContext.value.getContacts = jest.fn().mockResolvedValue([member]);
        const { findByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const rtVal = await basePickerListBelowParams.onResolveSuggestions('s');
        expect(rtVal).toHaveLength(1);
        expect(rtVal[0]).toEqual(member);
        expect(currContext.value.getContacts).toHaveBeenCalledTimes(1);
    });

    it('should run onFilterChanged - limit result', async () => {
        const currContext = getGroupContextMock();
        const members = getFullMock().groupsArray[0].members;
        members[0].id = 'mockId1';
        members[1].id = 'mockI2';
        currContext.value.getContacts = jest.fn().mockResolvedValue(members);
        const { findByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const rtVal = await basePickerListBelowParams.onResolveSuggestions('s', undefined, 1);
        expect(rtVal).toHaveLength(1);
        expect(rtVal[0]).toEqual(members[0]);
        expect(currContext.value.getContacts).toHaveBeenCalledTimes(1);
    });

    it('should run onFilterChanged - limit persona empty', async () => {
        const currContext = getGroupContextMock();
        const members = getFullMock().groupsArray[0].members;
        members[0].id = 'mockId1';
        members[1].id = 'mockI2';
        currContext.value.getContacts = jest.fn().mockResolvedValue(members);
        const { findByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        let rtVal = await basePickerListBelowParams.onResolveSuggestions('s', {});
        expect(rtVal).toHaveLength(2);
        expect(rtVal[0]).toEqual(members[0]);
        expect(currContext.value.getContacts).toHaveBeenCalledTimes(1);
        rtVal = await basePickerListBelowParams.onResolveSuggestions('s');
        expect(rtVal).toHaveLength(2);
        expect(rtVal[0]).toEqual(members[0]);
        expect(currContext.value.getContacts).toHaveBeenCalledTimes(2);
    });

    it('should run onFilterChanged - filter 1 out of 2 persona', async () => {
        const currContext = getGroupContextMock();
        const customers = getFullMock().groupsArray[0].members.map(member => {
            return member.customer;
        });
        customers[1].id = 'mockId2';
        currContext.value.getContacts = jest.fn().mockResolvedValue(customers);
        const { findByTestId } = render(
            <GroupsContext.Provider {...currContext}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const rtVal = await basePickerListBelowParams.onResolveSuggestions('s');
        expect(rtVal).toHaveLength(1);
        expect(rtVal[0]).toEqual(customers[1]);
        expect(currContext.value.getContacts).toHaveBeenCalledTimes(1);
    });

    it('should persona name when calling getTextFromItem', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const member = params.group.members[0];
        const rtVal = await basePickerListBelowParams.getTextFromItem(member.customer);
        expect(rtVal).toEqual(member.customer.name);
    });

    it('should get most recently used - no personas', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('group-members')).toBeVisible();
        const rtVal = basePickerListBelowParams.onEmptyInputFocus();
        expect(rtVal).toHaveLength(0);
    });

    it('should run member add', async () => {
        const { findAllByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} />
            </GroupsContext.Provider>
        );

        const persona = await findAllByTestId(`group-members-persona-${params.group.members[0].customer.id}`);
        expect(persona[0]).toBeVisible();
        params.onDataChanged.mockReset();
        await basePickerListBelowParams.onItemSelected(persona[0]);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        const mockCallParams = params.onDataChanged.mock.calls[0][0];
        expect(mockCallParams[0].field).toEqual('members');
        expect(mockCallParams[0].val).toHaveLength(3);
    });

    it('should run member add - no group members', async () => {
        const group = getFullMock().groupsArray[0];
        const { findAllByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} group={group} />
            </GroupsContext.Provider>
        );

        const persona = await findAllByTestId(`group-members-persona-${params.group.members[0].customer.id}`);
        params.onDataChanged.mockReset();
        set(group, 'members', null);
        expect(persona[0]).toBeVisible();
        const rtVal = await basePickerListBelowParams.onItemSelected();
        expect(rtVal).toBeNull();
        expect(params.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should show columns for seven columns and above', async () => {
        const group = getFullMock().groupsArray[0];
        const { queryByText } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} group={group} responsiveColumns={7} />
            </GroupsContext.Provider>
        );

        expect(queryByText(groupsControlStrings.MEMBER_NAME)).toBeInTheDocument();
        expect(queryByText(groupsControlStrings.PRIMARY_MEMBER)).toBeInTheDocument();
        expect(queryByText(groupsControlStrings.GROUPS_CARD_ROLE)).toBeInTheDocument();
    });

    it('should show columns for 4 columns and above', async () => {
        const group = getFullMock().groupsArray[0];
        const { queryByText, debug } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} group={group} responsiveColumns={4} />
            </GroupsContext.Provider>
        );

        expect(queryByText(groupsControlStrings.MEMBER_NAME_AND_ROLE)).toBeInTheDocument();
        expect(queryByText(groupsControlStrings.PRIMARY_MEMBER)).toBeInTheDocument();
    });

    it('should show columns for 2 columns and above', async () => {
        const group = getFullMock().groupsArray[0];
        const { queryByText } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupMembersComponent {...params} group={group} responsiveColumns={4} />
            </GroupsContext.Provider>
        );

        expect(queryByText(groupsControlStrings.MEMBER_NAME_AND_ROLE)).toBeInTheDocument();
    });

    const fullMock = getFullMock();
    const params = {
        group: fullMock.groupsArray[0],
        originalPrimaryMember: fullMock.groupsArray[0].primaryMember,
        onUpdateMessageBar: jest.fn(),
        onDataChanged: jest.fn(),
    };

    const groupContextMock = getGroupContextMock();
});
