import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { GroupDetailsComponent } from './GroupDetailsComponent';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { GroupsContext } from '../contexts/GroupsContext';
import { GroupsTypes } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import { MessageBarType } from '@fluentui/react/lib/components/MessageBar';
import getGroupContextMock from '../MockGroupContext';
import groupsControlStrings from '@fsi/core-components/dist/assets/strings/GroupsControl/GroupsControl.1033.json';

let dropdownParams;
jest.mock('@fluentui/react/lib/Dropdown', () => {
    return {
        Dropdown: params => {
            dropdownParams = params;
            return <div data-testid="types-dropdown" />;
        },
    };
});

describe('GroupDetailsComponent', () => {
    beforeEach(() => {
        dropdownParams = undefined;
        params.group = getFullMock().groupsArray[0];
        params.onDataChanged.mockReset();
        params.onUpdateMessageBar.mockReset();
        params.hasOtherMainGroup.mockReset();
    });

    it('should render group details component', async () => {
        const { findByTestId } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );
        expect(await findByTestId('group-details')).toBeVisible();
    });

    it('should render group details component 2', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.pickLists.groupTypes = new Map<number, string>([
            [1, '1'],
            [10, ''],
            [GroupsTypes.household, 'mockOption'],
        ]);
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );

        const options = dropdownParams.options;
        expect(await findByTestId('group-details')).toBeVisible();
        expect(options).toHaveLength(3);
        expect(options[options.length - 1].key).toEqual(GroupsTypes.household);
    });

    it('should render group details with main customer', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = myGroup.members[0].customer;
        const { findByText } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );

        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        expect(checkboxText?.parentElement?.parentElement).toHaveClass('is-checked');
    });

    it('should render group details checkbox enabled', async () => {
        const { findByText } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupDetailsComponent {...params} isPrimaryDisabled={false} />
            </GroupsContext.Provider>
        );

        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        expect(checkboxText?.parentElement?.parentElement).toHaveClass('is-enabled');
    });

    it('should render group details with main customer false', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = myGroup.members[1].customer;
        const { findByText } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );

        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        expect(checkboxText?.parentElement?.parentElement).not.toHaveClass('is-checked');
    });

    it('should render group details without main customer', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = { ...myGroup.members[1].customer, id: 'mockId' };
        const { findByText } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );
        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        expect(checkboxText?.parentElement?.parentElement).not.toHaveClass('is-checked');
    });

    it('should call onFormChange when form changes', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.pickLists.groupTypes = new Map<number, string>([[GroupsTypes.household, 'mockOption']]);
        const currParams = { ...params, group: getFullMock().groupsArray[0] };
        currParams.group.type = 0;
        currParams.group.members.forEach(m => (m.role = 111));
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const textField = await findByTestId('group-details-text');
        expect(textField).toBeVisible();
        fireEvent.change(textField, { target: { value: 'mock' } });
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        dropdownParams.onChange(null, { key: GroupsTypes.household });
        expect(params.onDataChanged).toHaveBeenCalledTimes(2);
        expect(params.onDataChanged).toHaveBeenNthCalledWith(
            2,
            ['members', 'type'],
            expect.arrayContaining([
                expect.arrayContaining([
                    expect.objectContaining({
                        role: 0,
                    }),
                ]),
            ])
        );
    });

    it('should call onFormChange when checkbox unchecked', async () => {
        const { findByText } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );

        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        fireEvent.click(checkboxText);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onUpdateMessageBar).toHaveBeenCalledWith(MessageBarType.info, {
            bold: groupsControlStrings.SET_UP_YOUR_GROUP,
            regular: groupsControlStrings.SELECT_NAME_AND_TYPE,
        });
    });

    it('should call onFormChange when checkbox checked', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = myGroup.members[1].customer;
        const { findByText } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} hasOtherMainGroup={() => true} />
            </GroupsContext.Provider>
        );

        params.onDataChanged.mockReset();
        params.onUpdateMessageBar.mockReset();
        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        fireEvent.click(checkboxText);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onUpdateMessageBar.mock.calls[0][0]).toEqual(MessageBarType.warning);
    });

    it('message bar should update when type changing', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = myGroup.members[1].customer;
        const { findByText, findByTestId } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} hasOtherMainGroup={() => true} />
            </GroupsContext.Provider>
        );

        params.onDataChanged.mockReset();
        params.onUpdateMessageBar.mockReset();
        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        fireEvent.click(checkboxText);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onUpdateMessageBar.mock.calls[0][0]).toEqual(MessageBarType.warning);

        expect(await findByTestId('types-dropdown')).toBeVisible();
        dropdownParams.onChange(null, { key: GroupsTypes.customGroup });
        expect(params.onDataChanged).toHaveBeenCalledTimes(2);
        expect(params.onUpdateMessageBar).toHaveBeenCalledTimes(2);
        expect(params.onUpdateMessageBar.mock.calls[1][0]).toEqual(MessageBarType.info);
    });

    it('message bar should display info when main household is not changing', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = myGroup.members[1].customer;
        const currParams = { ...params, group: getFullMock().groupsArray[0] };
        currParams.group.members.forEach(m => {
            if (m.customer.id === currGroupContextMock.value.mainCustomer.id) {
                m.IsPrimaryGroup = true;
            }
        });

        render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...currParams} hasOtherMainGroup={() => false} />
            </GroupsContext.Provider>
        );

        expect(currParams.onUpdateMessageBar).toHaveBeenCalledTimes(1);
        expect(currParams.onUpdateMessageBar.mock.calls[0][0]).toEqual(MessageBarType.info);
    });

    it('message bar should display warning when main houshold is changing', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = myGroup.members[1].customer;
        const currParams = { ...params, group: getFullMock().groupsArray[0] };
        currParams.group.members.forEach(m => {
            if (m.customer.id === currGroupContextMock.value.mainCustomer.id) {
                m.IsPrimaryGroup = true;
            }
        });

        render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...currParams} hasOtherMainGroup={() => true} />
            </GroupsContext.Provider>
        );

        expect(currParams.onUpdateMessageBar).toHaveBeenCalledTimes(1);
        expect(currParams.onUpdateMessageBar.mock.calls[0][0]).toEqual(MessageBarType.warning);
    });

    it('isPrimary Should change when type changing', async () => {
        const currGroupContextMock = getGroupContextMock();
        const expectPrimaryValue = (nthCall: number, expectedPrimary: boolean) =>
            expect(params.onDataChanged).toHaveBeenNthCalledWith(
                nthCall,
                ['members', 'type'],
                expect.arrayContaining([
                    expect.arrayContaining([
                        expect.objectContaining({
                            IsPrimaryGroup: expectedPrimary,
                        }),
                    ]),
                ])
            );

        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );

        expect(await findByTestId('types-dropdown')).toBeVisible();
        dropdownParams.onChange(null, { key: GroupsTypes.customGroup });
        dropdownParams.onChange(null, { key: GroupsTypes.household });

        expect(params.onDataChanged).toHaveBeenCalledTimes(2);
        expectPrimaryValue(1, false);
        expectPrimaryValue(2, true);
    });

    it('should not call FormChange when checkbox checked but no group members', async () => {
        const currParams = { ...params, group: getFullMock().groupsArray[0] };
        currParams.group.members = [];
        const { findByText } = render(
            <GroupsContext.Provider {...groupContextMock}>
                <GroupDetailsComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        fireEvent.click(checkboxText);
        expect(params.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should not call FormChange when checkbox checked but no main member', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.mainCustomer = { ...myGroup.members[1].customer, id: 'mockId' };
        const { findByText } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...params} />
            </GroupsContext.Provider>
        );

        const checkboxText = await findByText(groupsControlStrings.SET_AS_MAIN_HOUSEHOLD);
        fireEvent.click(checkboxText);
        expect(params.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should render main household checkbox', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.pickLists.groupTypes = new Map<number, string>([[GroupsTypes.household, 'mockOption']]);
        const currParams = { ...params, group: getFullMock().groupsArray[0] };
        const { queryByTestId, queryByText, getByText } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...currParams} />
            </GroupsContext.Provider>
        );

        const mainHouseHoldInfo = queryByTestId('indicator-icon-info');

        expect(mainHouseHoldInfo).toBeVisible();
        expect(queryByText(groupsControlStrings.MAIN_HOUSEHOLD_TOOLTIP)).toBeNull();

        fireEvent.mouseOver(mainHouseHoldInfo!);
        expect(await getByText(groupsControlStrings.MAIN_HOUSEHOLD_TOOLTIP)).toBeInTheDocument();
    });

    it('should not render main household checkbox', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.pickLists.groupTypes = new Map<number, string>([[GroupsTypes.household, 'mockOption']]);
        const currParams = { ...params, group: getFullMock().groupsArray[0] };
        currParams.group.type = 0;
        const { queryByTestId } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupDetailsComponent {...currParams} />
            </GroupsContext.Provider>
        );

        expect(queryByTestId('main-household-checkbox')).toBeNull();
    });

    const params = {
        group: getFullMock().groupsArray[0],
        isPrimaryDisabled: false,
        isGroupsTypeDisabled: false,
        onDataChanged: jest.fn(),
        onUpdateMessageBar: jest.fn(),
        hasOtherMainGroup: jest.fn(),
    };

    const fullMock = getFullMock();
    const myGroup = fullMock.groupsArray[0];
    const groupContextMock = getGroupContextMock();
});
