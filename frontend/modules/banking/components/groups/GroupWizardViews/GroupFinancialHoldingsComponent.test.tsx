import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { GroupFinancialHoldingsComponent } from './GroupFinancialHoldingsComponent';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import getGroupContextMock from '../MockGroupContext';
import { GroupsContext } from '../contexts/GroupsContext';
import FHStrings from '@fsi/core-components/dist/assets/strings/FinancialHoldings/FinancialHoldings.1033.json';

let detailedMembersGroupHoldingsParams;
jest.mock('../DetailedMembersGroupHoldings/DetailedMembersGroupHoldingsWrapper', () => {
    return {
        DetailedMembersGroupHoldingsWrapper: params => {
            detailedMembersGroupHoldingsParams = params;
            return <div />;
        },
    };
});

jest.mock('@fsi/core-components/dist/components/containers/ErrorState/ErrorState', () => params => {
    return <div data-testid="empty-state" />;
});

describe('test Group financial holdings component', () => {
    it('should render group financial holdings', async () => {
        const { findByTestId } = render(<GroupFinancialHoldingsComponent {...params} />);

        expect(await findByTestId('group-fh')).toBeVisible();
    });

    it('should call changed event isChecked undef', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        const { findByTestId } = render(<GroupFinancialHoldingsComponent {...params} />);

        expect(await findByTestId('group-fh')).toBeVisible();
        params.onDataChanged.mockReset();
        detailedMembersGroupHoldingsParams.onFHChanged();
        expect(params.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should call changed event without fh', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        const { findByTestId } = render(<GroupFinancialHoldingsComponent {...params} />);

        expect(await findByTestId('group-fh')).toBeVisible();
        params.onDataChanged.mockReset();
        detailedMembersGroupHoldingsParams.onFHChanged(getFullMock().groupsArray[0].financialHoldings, false);
        expect(params.onDataChanged).toHaveBeenCalledTimes(0);
    });

    it('should call changed event - isChecked true', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        const fhList = getFullMock().groupsArray[0].financialHoldings || [];

        const currParams = { ...params, financialHoldings: [fhList[0]] };
        const { findByTestId } = render(<GroupFinancialHoldingsComponent {...currParams} />);

        expect(await findByTestId('group-fh')).toBeVisible();
        params.onDataChanged.mockReset();
        detailedMembersGroupHoldingsParams.onFHChanged([fhList[1]], true);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onDataChanged).toHaveBeenCalledWith([fhList[0], fhList[1]]);
    });

    it('should call changed event - isChecked false', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        const fhList = getFullMock().groupsArray[0].financialHoldings || [];

        const currParams = { ...params, financialHoldings: [fhList[0]] };
        const { findByTestId } = render(<GroupFinancialHoldingsComponent {...currParams} />);

        expect(await findByTestId('group-fh')).toBeVisible();
        params.onDataChanged.mockReset();
        detailedMembersGroupHoldingsParams.onFHChanged([fhList[1]], false);
        expect(params.onDataChanged).toHaveBeenCalledTimes(1);
        expect(params.onDataChanged).toHaveBeenCalledWith(currParams.financialHoldings);
    });

    it('should show error if no members', async () => {
        const currParams = { ...params, members: [] };
        const { findByTestId } = render(<GroupFinancialHoldingsComponent {...currParams} />);
        waitFor(() => {
            expect(findByTestId('error-state')).toBeVisible();
        });
    });

    it('should show error if get members fh throw', async () => {
        const currGroupContextMock = getGroupContextMock();
        currGroupContextMock.value.getMemberFinancialHoldings = jest.fn().mockRejectedValue('mock error');
        const { findByTestId } = render(
            <GroupsContext.Provider {...currGroupContextMock}>
                <GroupFinancialHoldingsComponent {...params} />
            </GroupsContext.Provider>
        );

        waitFor(() => {
            expect(findByTestId('error-state')).toBeVisible();
        });
    });

    it('should change pivot item', async () => {
        const { findByText } = render(<GroupFinancialHoldingsComponent {...params} />);

        let category = await findByText(FHStrings.CATEGORY);
        expect(category).toBeVisible();
        expect(category).not.toHaveClass('is-selected');

        fireEvent.click(category);
        category = await findByText(FHStrings.CATEGORY);
        expect(category.parentElement?.parentElement?.parentElement).toHaveClass('is-selected');
    });

    const params = {
        members: getFullMock().groupsArray[0].members,
        groupId: getFullMock().groupsArray[0].id,
        onDataChanged: jest.fn(),
        onUpdateMessageBar: jest.fn(),
    };

    const groupContextMock = getGroupContextMock();
});
