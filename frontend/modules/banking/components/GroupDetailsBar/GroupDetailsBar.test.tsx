import React from 'react';
import { render } from '@testing-library/react';
import GroupDetailsBar from './GroupDetailsBar';
import groupMock from '../../interfaces/Groups/mocks/IGroup.mock';

describe('Group short details component', () => {
    const testMock = groupMock.groupsArray[0];
    it('Should render group short details for primary member', async () => {
        const { getByTestId, getByText } = render(<GroupDetailsBar group={testMock} isPrimary={true} />);

        expect(getByText(testMock.name)).toBeVisible();
        expect(getByTestId('group-short-details-members-length')).toHaveTextContent(testMock.members.length.toString());
        expect(getByTestId('group-short-details-fh-length')).toHaveTextContent(testMock.financialHoldings!.length.toString());
        expect(getByTestId('group-short-details-primary-icon')).toBeVisible();
    });

    it('Should render group short details for non primary', async () => {
        const { queryByTestId } = render(<GroupDetailsBar group={testMock} isPrimary={false} />);

        expect(queryByTestId('group-short-details-primary-icon')).toBeNull();
    });

    it('Should render group short details with 0 financial holding when null', async () => {
        const newMock = JSON.parse(JSON.stringify(testMock));
        newMock.financialHoldings = undefined;
        const { getByTestId } = render(<GroupDetailsBar group={newMock} isPrimary={false} />);

        expect(getByTestId('group-short-details-fh-length')).toHaveTextContent('0');
    });

    it('Should show indicator for missing primary member', async () => {
        const newMock = JSON.parse(JSON.stringify(testMock));
        newMock.primaryMember = 'not-exist-member-id';
        const { getByTestId } = render(<GroupDetailsBar group={newMock} isPrimary={false} />);

        expect(getByTestId('indicator-icon-warning')).toBeVisible();
    });

    it('Should show indicator for missing financial holdings', async () => {
        const newMock = JSON.parse(JSON.stringify(testMock));
        newMock.financialHoldings = [];
        const { getByTestId } = render(<GroupDetailsBar group={newMock} isPrimary={false} />);

        expect(getByTestId('indicator-icon-warning')).toBeVisible();
    });

    it('Should show indicator for missing primary member and financial holdings', async () => {
        const newMock = JSON.parse(JSON.stringify(testMock));
        newMock.primaryMember = 'not-exist-member-id';
        newMock.financialHoldings = [];
        const { getByTestId } = render(<GroupDetailsBar group={newMock} isPrimary={false} />);

        expect(getByTestId('indicator-icon-warning')).toBeVisible();
    });

    it('Should have houseHold icon', async () => {
        const { queryByTestId } = render(<GroupDetailsBar group={testMock} isPrimary={false} />);

        const icon = queryByTestId('group-short-details-icon');
        expect(icon).toBeVisible();
        expect(icon).toHaveAttribute('data-icon-name', 'Home');
    });

    it('Should have group icon when group type is custom group', async () => {
        const { queryByTestId } = render(<GroupDetailsBar group={groupMock.groupsArray[1]} isPrimary={false} />);

        const icon = queryByTestId('group-short-details-icon');
        expect(icon).toBeVisible();
        expect(icon).toHaveAttribute('data-icon-name', 'Group');
    });

    it('Should have group icon when group type is new type', async () => {
        const newMock = { ...testMock, type: 104800002 };
        const { queryByTestId } = render(<GroupDetailsBar group={newMock} isPrimary={false} />);

        const icon = queryByTestId('group-short-details-icon');
        expect(icon).toBeVisible();
        expect(icon).toHaveAttribute('data-icon-name', 'Group');
    });
});
