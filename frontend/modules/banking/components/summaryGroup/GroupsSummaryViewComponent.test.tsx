import React from 'react';
import { render } from '@testing-library/react';
import GroupsSummaryViewComponent from './GroupsSummaryViewComponent';
import { IGroupFetcher } from '../../interfaces/Groups/IGroupFetcher';
import { IGroupContact } from '../../interfaces/Groups/IGroupContact';
import mainHouseholdStrings from '@fsi/core-components/dist/assets/strings/MainHousehold/MainHousehold.1033.json';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { IGroupResponse } from '../../interfaces/Groups/IGroupResponse';
import { getFullMock } from '../../interfaces/Groups/mocks/IGroup.mock';
import { emptyGroupsFetcher, mockFetcherWithCustomer } from '../../interfaces/Groups/mocks/MockGroupFetcher';

describe('Group summary view component', () => {
    const mockContactId = 'mockContactId';
    it('Should render group summary view', async () => {
        const { findByTestId } = render(<GroupsSummaryViewComponent contactId={mockContactId} fetcher={mockFetcherWithCustomer} />);

        expect(await findByTestId('group-summary-main-view')).toBeVisible();
    });

    it('Should render loading state', async () => {
        const { getByText } = render(<GroupsSummaryViewComponent contactId={mockContactId} fetcher={emptyResponseFetcher} />);

        expect(await getByText('Loading...')).toBeVisible();
    });

    it('Should render error state if error occur while taking the group', async () => {
        const errorGetContactGroup: (contactId: string, onlyPrimary: boolean) => Promise<IGroupResponse> = onlyPrimary => {
            return new Promise((res, rej) => {
                rej(new Error('test error'));
            });
        };
        const currFetcher = { ...emptyResponseFetcher, getContactGroups: errorGetContactGroup };
        const { findByText } = render(<GroupsSummaryViewComponent contactId={mockContactId} fetcher={currFetcher} />);

        expect(await findByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should render error state if error occur while taking the group 2', async () => {
        const resEmptyGetContactGroup: (contactId: string, onlyPrimary: boolean) => Promise<IGroupResponse> = onlyPrimary => {
            return new Promise((res, rej) => {
                res({ groupsArray: [], metadata: {} });
            });
        };
        const currFetcher = { ...emptyResponseFetcher, getContactGroups: resEmptyGetContactGroup };
        const { findByText } = render(<GroupsSummaryViewComponent contactId={mockContactId} fetcher={currFetcher} />);

        expect(await findByText(mainHouseholdStrings.NO_PRIMARY_GROUP_DEFINED)).toBeVisible();
        expect(await findByText(mainHouseholdStrings.NO_PRIMARY_GROUP_DEFINED_SUB_HEADER)).toBeVisible();
    });

    it('Should render summary view with hidden message', async () => {
        const fullMock = getFullMock();
        fullMock.groupsArray[0].fhRequestMetadata = {
            msfsi_FH_Account: 200,
            msfsi_FH_Creditline: 403,
            msfsi_FH_Investment: 200,
            msfsi_FH_Loan: 200,
            msfsi_FH_Saving: 200,
        };
        const resGetContactGroup: (contactId: string, onlyPrimary: boolean) => Promise<IGroupResponse> = onlyPrimary => {
            return new Promise((res, rej) => {
                res({ groupsArray: fullMock.groupsArray, metadata: { ...fullMock.metadata, msfsi_FH_Account: 403 } });
            });
        };
        const currFetcher = { ...emptyResponseFetcher, getContactGroups: resGetContactGroup };
        const { findByTestId } = render(<GroupsSummaryViewComponent contactId={mockContactId} fetcher={currFetcher} />);

        expect(await findByTestId(/hidden-bar/i)).toBeVisible();
    });
});

const emptyGetContactGroups: (contactId: string, onlyPrimary: boolean) => Promise<IGroupResponse> = onlyPrimary => {
    return new Promise((res, rej) => {});
};
const emptyGetMainCustomerDetails: () => Promise<IGroupContact> = () => {
    return new Promise((res, rej) => {});
};
const emptyFhCategoryTypes: () => Promise<Map<number, string>> = () => {
    return new Promise((res, rej) => {});
};
const emptyResponseFetcher: IGroupFetcher = {
    ...emptyGroupsFetcher,
    getContactGroups: emptyGetContactGroups,
    getMainCustomerDetails: emptyGetMainCustomerDetails,
    getFinancialHoldingCategoryTypesMap: emptyFhCategoryTypes,
};
