import React from 'react';
import { render } from '@testing-library/react';
import { getFullMock } from '../../../interfaces/Groups/mocks/IGroup.mock';
import { GROUPS_HOLDINGS_VIEW_KEYS } from '../GroupWizardViews';
import { DetailedMembersGroupHoldingsWrapper } from './DetailedMembersGroupHoldingsWrapper';
import { initialFHPickLists } from '../contexts/GroupsContext';
import { fhRolesValues } from '../../../constants/FHValueMaps';

let detailedMembersGroupHoldingsParams;
jest.mock('./DetailedMembersGroupHoldings', () => {
    return {
        DetailedMembersGroupHoldings: params => {
            detailedMembersGroupHoldingsParams = params;
            return <div data-testid="detailed-member-holding" />;
        },
    };
});

describe('testing Detailed Members Group Holdings Wrapper', () => {
    it('should render Detailed Members Group Holdings Wrapper', async () => {
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...params} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
    });

    it('should sort by category', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1]];
        fh[0].category = 104800002;
        fh[1].category = 104800004;
        const currParams = { selectedKey: GROUPS_HOLDINGS_VIEW_KEYS.category, allFinancialHoldings: fh, fhPickLists: initialFHPickLists };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.items[0].category).toEqual(104800004);
    });

    it('should sort by category asc', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1]];
        fh[1].category = 104800002;
        fh[0].category = 104800004;

        const currParams = { selectedKey: GROUPS_HOLDINGS_VIEW_KEYS.category, allFinancialHoldings: fh, fhPickLists: initialFHPickLists };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.items[0].category).toEqual(104800004);
    });

    it('should sort by category with unknown categories', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1], fh[2]];
        fh[1].category = 1;
        const currParams = { selectedKey: GROUPS_HOLDINGS_VIEW_KEYS.category, allFinancialHoldings: fh, fhPickLists: initialFHPickLists };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.items[0].category).toEqual(1);
    });

    it('should group fh by category', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1], fh[2]];
        fh[0].category = 104800002;
        fh[1].category = 104800002;
        fh[2].category = 1;
        const currParams = { selectedKey: GROUPS_HOLDINGS_VIEW_KEYS.category, allFinancialHoldings: fh, fhPickLists: initialFHPickLists };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.groups).toHaveLength(2);
        expect(detailedMembersGroupHoldingsParams.groups[0].count).toEqual(2);
        expect(detailedMembersGroupHoldingsParams.groups[1].count).toEqual(1);
    });

    it('should sort by member', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1]];
        fh[0].owners = [{ contact: { contactId: '1', fullName: '1' }, role: fhRolesValues.owner }];
        fh[1].owners = [{ contact: { contactId: '2', fullName: '2' }, role: fhRolesValues.owner }];
        const currParams = { ...params, allFinancialHoldings: fh };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.items[0].owners).toEqual([
            { contact: { contactId: '1', fullName: '1' }, role: fhRolesValues.owner },
        ]);
    });

    it('should sort by member desc', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1]];
        fh[1].owners = [{ contact: { contactId: '1', fullName: '1' }, role: fhRolesValues.owner }];
        fh[0].owners = [{ contact: { contactId: '2', fullName: '2' }, role: fhRolesValues.owner }];
        const currParams = { ...params, allFinancialHoldings: fh };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.items[0].owners).toEqual([
            { contact: { contactId: '1', fullName: '1' }, role: fhRolesValues.owner },
        ]);
    });

    it('should group by member', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        let fh = getFullMock().groupsArray[0].financialHoldings || [];
        fh = [fh[0], fh[1], fh[2]];
        fh[0].owners = [{ contact: { contactId: '1', fullName: '1' }, role: fhRolesValues.owner }];
        fh[1].owners = [{ contact: { contactId: '2', fullName: '2' }, role: fhRolesValues.owner }];
        fh[2].owners = [{ contact: { contactId: '2', fullName: '2' }, role: fhRolesValues.owner }];
        const currParams = { ...params, allFinancialHoldings: fh };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
        expect(detailedMembersGroupHoldingsParams.groups[0].count).toEqual(1);
        expect(detailedMembersGroupHoldingsParams.groups[1].count).toEqual(2);
    });

    it('should render with unknown key', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        const currParams = { ...params, selectedKey: 'mock' };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('detailed-member-holding')).toBeVisible();
    });

    it('should render empty state', async () => {
        detailedMembersGroupHoldingsParams = undefined;
        const currParams = { ...params, allFinancialHoldings: [] };
        const { findByTestId } = render(<DetailedMembersGroupHoldingsWrapper {...currParams} />);

        expect(await findByTestId('empty-state')).toBeVisible();
    });
});

const group = getFullMock().groupsArray[0];
const params = {
    allFinancialHoldings: group.financialHoldings || [],
    selectedKey: GROUPS_HOLDINGS_VIEW_KEYS.members,
    fhPickLists: initialFHPickLists,
};
