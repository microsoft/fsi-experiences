import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { GroupsTypes } from '@fsi/core-components/dist/dataLayerInterface/entity/constants';
import groupControlStrings from '@fsi/core-components/dist/assets/strings/GroupsControl/GroupsControl.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { GROUPS_APP_RESPONSIVE_CLASS } from '../GroupsAndRelationshipsApp.const';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { DEFAULT_COLUMN_WIDTH } from '@fsi/core-components/dist/utilities/responsive/ResponsiveUtil';
let GroupMainDetails;

const params = {
    group: getFullMock().groupsArray[0],
    isPrimary: true,
    onEditIconClick: (group, step) => {},
};

let resizeDetector;

jest.mock('react-resize-detector', () => {
    resizeDetector = jest.fn();
    resizeDetector.mockReturnValue({ width: 160 * 6 });
    return {
        useResizeDetector: resizeDetector,
    };
});

describe('Group main details component', () => {
    let annualIncome;

    beforeAll(() => {
        jest.mock('../FinancialDataSummary/FinancialDataSummaryWrapper', () => params => {
            annualIncome = params.annualIncome;
            return <div data-testid="group-member-financial-data" />;
        });
        jest.mock('@fsi/core-components/dist/components/atoms/Tag/Tag', () => params => (
            <div data-testid="group-member-tag-component">{params.text}</div>
        ));

        jest.mock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState', () => () => <div data-testid="empty-state" />);

        jest.mock('../DetailedMembersGroupHoldings/DetailedMembersGroupHoldingsWrapper', () => {
            return { DetailedMembersGroupHoldingsWrapper: props => <div data-testid="group-member-detailed-holding" /> };
        });

        /* eslint-disable @typescript-eslint/no-var-requires */
        GroupMainDetails = require('./GroupMainDetails').default;
    });

    afterAll(() => {
        jest.unmock('../DetailedMembersGroupHoldings/DetailedMembersGroupHoldingsWrapper');
        jest.unmock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState');
        jest.unmock('../FinancialDataSummary/FinancialDataSummaryWrapper');
        jest.unmock('@fsi/core-components/dist/components/atoms/Tag/Tag');
    });

    afterEach(() => {
        annualIncome = undefined;
    });

    it('should render group main details', () => {
        const { getByText } = render(<GroupMainDetails {...params} />);

        expect(getByText(groupControlStrings.GROUP_FINANCIAL_HOLDINGS)).toBeVisible();
    });

    it('should call the onEditIconClick when editing', done => {
        const currParams = { ...params, onEditIconClick: () => done() };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        const editButton = getByTestId('group-main-details-edit');
        expect(editButton).toBeVisible();
        fireEvent.click(editButton);
    });

    it('should call the onEditIconClick when editing fh', done => {
        const currParams = { ...params, onEditIconClick: () => done() };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        const editButton = getByTestId('group-main-details-edit-fh');
        expect(editButton).toBeVisible();
        fireEvent.click(editButton);
    });

    it('should send onEditIconClick when editing the right params', () => {
        const editFn = jest.fn();
        const currParams = { ...params, onEditIconClick: editFn };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        const editButton = getByTestId('group-main-details-edit');
        expect(editButton).toBeVisible();
        fireEvent.click(editButton);
        expect(editFn.mock.calls[0][0]).toEqual(params.group);
        expect(editFn.mock.calls[0][1]).toEqual(0);
    });

    it('should send onEditIconClick when editing fh the right params', () => {
        const editFn = jest.fn();
        const currParams = { ...params, onEditIconClick: editFn };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        const editButton = getByTestId('group-main-details-edit-fh');
        expect(editButton).toBeVisible();
        fireEvent.click(editButton);
        expect(editFn.mock.calls[0][0]).toEqual(params.group);
        expect(editFn.mock.calls[0][1]).toEqual(2);
    });

    it('should render primary group tag component', () => {
        const { getByTestId } = render(<GroupMainDetails {...params} />);

        expect(getByTestId('group-member-tag-component')).toBeVisible();
    });

    it('should not render primary group tag component', () => {
        const currParams = { ...params, isPrimary: false };
        const { queryAllByTestId } = render(<GroupMainDetails {...currParams} />);

        expect(queryAllByTestId('group-member-tag-component').length).toEqual(0);
    });

    it('should render financial holding component', () => {
        const { getByTestId } = render(<GroupMainDetails {...params} />);

        expect(getByTestId('group-member-detailed-holding')).toBeVisible();
    });

    it('should not render financial holding component', () => {
        const group = getFullMock().groupsArray[0];
        group.financialHoldings = undefined;
        const currParams = { ...params, group };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        expect(getByTestId('empty-state')).toBeVisible();
    });

    it('should change selection when clicking the pivot', async () => {
        const { getByText, findByText } = render(<GroupMainDetails {...params} />);

        let pivotItem = getByText('Category');
        fireEvent.click(pivotItem);
        pivotItem = await findByText('Category');
        expect(pivotItem?.parentElement?.parentElement?.parentElement).toHaveClass('is-selected');
        pivotItem = getByText('Owner');
        fireEvent.click(pivotItem);
        pivotItem = await findByText('Owner');
        expect(pivotItem?.parentElement?.parentElement?.parentElement).toHaveClass('is-selected');
    });

    it('should have total income', () => {
        const group = getFullMock().groupsArray[0];
        group.members.forEach(member => (member.customer.income = 0));
        group.members[0].customer.income = 100;
        const currParams = { ...params, group };
        const { getByText } = render(<GroupMainDetails {...currParams} />);

        expect(getByText(groupControlStrings.GROUP_FINANCIAL_HOLDINGS)).toBeVisible();
        expect(annualIncome).toEqual(100);
    });

    it('should have 0 total income', () => {
        const group = getFullMock().groupsArray[0];
        group.members.forEach(member => (member.customer.income = 0));
        const currParams = { ...params, group };
        const { getByText } = render(<GroupMainDetails {...currParams} />);

        expect(getByText(groupControlStrings.GROUP_FINANCIAL_HOLDINGS)).toBeVisible();
        expect(annualIncome).toEqual(0);
    });

    it('should have total income of 2 members', () => {
        const group = getFullMock().groupsArray[0];
        group.members.forEach(member => (member.customer.income = 0));
        group.members[0].customer.income = 50;
        group.members[1].customer.income = 150;
        const currParams = { ...params, group };
        const { getByText } = render(<GroupMainDetails {...currParams} />);

        expect(getByText(groupControlStrings.GROUP_FINANCIAL_HOLDINGS)).toBeVisible();
        expect(annualIncome).toEqual(200);
    });

    it('should show member 1 address source', () => {
        const group = getFullMock().groupsArray[0];
        const currParams = { ...params, group };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        expect(getByTestId('group-main-details-address-text')).toBeVisible();
        expect(getByTestId('group-main-details-address-text')).toHaveTextContent(group.members[0].customer.address);
    });

    it('address source for group should be unavailable', () => {
        const group = getFullMock().groupsArray[0];
        group.members = group.members.splice(1, 1);
        const currParams = { ...params, group };
        const { getByTestId } = render(<GroupMainDetails {...currParams} />);

        expect(getByTestId('group-main-details-address-text')).toBeVisible();
        expect(getByTestId('group-main-details-address-text')).toHaveTextContent('Not available');
    });

    it('tag component should show the right text', () => {
        const group = getFullMock().groupsArray[0];
        group.type = GroupsTypes.household;
        const currParams = { ...params, group };
        const { getByText } = render(<GroupMainDetails {...currParams} />);

        expect(getByText(commonStrings.MAIN_HOUSEHOLD)).toBeVisible();
    });

    it('tag component should show the right text 2', () => {
        const group = getFullMock().groupsArray[0];
        group.type = 0;
        const currParams = { ...params, group };
        const { queryByText } = render(<GroupMainDetails {...currParams} />);

        expect(queryByText(commonStrings.MAIN_HOUSEHOLD)).toBeNull();
    });

    it('Should not show message bar for existing primary member', () => {
        const group = getFullMock().groupsArray[0];
        const currParams = { ...params, group };
        const { queryByText } = render(<GroupMainDetails {...currParams} />);

        expect(queryByText(groupControlStrings.MISSING_PRIMARY_MEMBER)).toBeNull();
        expect(queryByText(groupControlStrings.MISSING_HOLDINGS_INFO)).toBeNull();
    });

    it('Should show message bar for missing primary member', () => {
        const group = getFullMock().groupsArray[0];
        group.primaryMember = 'not-exist-member-id';
        const currParams = { ...params, group };
        const { getByText, queryByText } = render(<GroupMainDetails {...currParams} />);

        waitFor(() => expect(getByText(groupControlStrings.MISSING_PRIMARY_MEMBER)).toBeVisible());
        waitFor(() => expect(queryByText(groupControlStrings.MISSING_HOLDINGS_INFO)).toBeNull());
    });

    it('Should show message bar for missing financial holdings', () => {
        const group = getFullMock().groupsArray[0];
        group.financialHoldings = [];
        const currParams = { ...params, group };
        const { getByText, queryByText } = render(<GroupMainDetails {...currParams} />);

        waitFor(() => expect(getByText(groupControlStrings.MISSING_HOLDINGS_INFO)).toBeVisible());
        waitFor(() => expect(queryByText(groupControlStrings.MISSING_PRIMARY_MEMBER)).toBeNull());
    });

    it('Should show message bar for missing primary member and financial holdings', () => {
        const group = getFullMock().groupsArray[0];
        group.financialHoldings = [];
        group.primaryMember = 'not-exist-member-id';
        const currParams = { ...params, group };
        const { getByText } = render(<GroupMainDetails {...currParams} />);

        waitFor(() => expect(getByText(groupControlStrings.MISSING_PRIMARY_MEMBER)).toBeVisible());
        waitFor(() => expect(getByText(groupControlStrings.MISSING_HOLDINGS_INFO)).toBeVisible());
    });

    it('should render customers table in 6 columns but not in 7', () => {
        resizeDetector.mockReturnValue({ width: DEFAULT_COLUMN_WIDTH * 6, height: 910 });

        const { getByTestId, rerender } = render(
            <ResponsiveContainer classPrefix={GROUPS_APP_RESPONSIVE_CLASS}>
                <GroupMainDetails {...params} />
            </ResponsiveContainer>
        );
        expect(getByTestId('groups-members-wrapper')).toBeVisible();
        resizeDetector.mockReturnValue({ width: DEFAULT_COLUMN_WIDTH * 7, height: 910 });

        rerender(
            <ResponsiveContainer classPrefix={GROUPS_APP_RESPONSIVE_CLASS}>
                <GroupMainDetails {...params} />
            </ResponsiveContainer>
        );
        expect(getByTestId('groups-members-wrapper')).not.toBeVisible();
    });
});
