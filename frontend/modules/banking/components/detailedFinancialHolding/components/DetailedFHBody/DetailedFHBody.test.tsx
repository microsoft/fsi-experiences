import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { DetailedFHBody } from './DetailedFHBody';
import { getDetailedFHMock } from '../../DetailedFHData.mock';
import { IndictableFH } from '../../../../interfaces/FHEntity/IndictableFH';
import { fhOtherCustomersOwnMock } from '../../CustomerFH.mock';
import { toPickListMap } from '../../../../utilities/EntityMetadata';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import { DETAILED_FH_RESPONSIVE_CLASS } from '../../../../components/detailedFinancialHolding/DetailedFHMain.style';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { ICustomerFH } from '../../../../interfaces/FHEntity/CustomerFH';
import { FHMetadataMock } from '../../../../interfaces/FHEntity/mocks/FHMetadata.mock';

let detailedParams;
let wrapperParams;

let width = 800;

jest.mock('react-resize-detector', () => {
    return {
        useResizeDetector: () => ({ width, height: 800 }),
    };
});
jest.mock('../DetailedFHTable/DetailedFHTable', () => {
    return {
        DetailedFHTable: params => {
            detailedParams = params;
            return <div data-testid="mocked-fh-table"></div>;
        },
    };
});

jest.mock('../../../../components/groups/DetailedMembersGroupHoldings/DetailedMembersGroupHoldingsWrapper', () => {
    return {
        DetailedMembersGroupHoldingsWrapper: params => {
            wrapperParams = params;
            return <div data-testid="mocked-fh-table-details-main"></div>;
        },
    };
});

describe('DetailedFHBody', () => {
    const fhCustomers: ICustomerFH[] = [
        {
            contact: {
                contactId: 'test-id',
                fullName: 'full name',
            },
            role: 104800002,
        },
    ];
    const fetcher = {
        fetchFHOtherCustomersOwn: jest.fn().mockResolvedValue(fhOtherCustomersOwnMock),
        fetchFHData: jest.fn().mockResolvedValue({}),
        fetchFHMetadata: jest.fn().mockResolvedValue(FHMetadataMock),
        fetchFHRelatedCustomers: jest.fn().mockResolvedValue(fhCustomers),
        fetchFinancialHoldingByCategory: jest.fn().mockResolvedValue({}),
    };

    let items: IndictableFH[];
    beforeEach(() => {
        items = getDetailedFHMock();
        width = 800;
        fetcher.fetchFHOtherCustomersOwn.mockClear();
        fetcher.fetchFHRelatedCustomers.mockClear();
    });
    it('Should render DetailedFHTable component', async () => {
        const { getByTestId } = render(<DetailedFHBody fhStructure={[]} fhItems={items} fetcher={fetcher} contactId="test-contact-id" />);

        expect(getByTestId(/mocked-fh-table/i)).toBeVisible();
    });

    it('Should render DetailedFHTable component with one owner', async () => {
        const ownerAndNonOwner: IndictableFH[] = [];
        const ownerElement = items.find(item => item.id === 'c357fe4c-0949-eb11-a813-000d3a3b7041');
        const nonOwnerElement = items.find(item => item.id === 'c557fe4c-0949-eb11-a813-000d3a3b70e2');
        ownerElement && ownerAndNonOwner.push(ownerElement);
        nonOwnerElement && ownerAndNonOwner.push(nonOwnerElement);
        render(<DetailedFHBody fhStructure={[]} fhItems={ownerAndNonOwner} fetcher={fetcher} contactId="test-contact-id" />);

        expect(detailedParams.items).toContain(ownerElement);
        expect(detailedParams.items).not.toContain(nonOwnerElement);
    });

    it('Should render DetailedFHTable component with meta data', async () => {
        const { getAllByRole } = render(
            <DetailedFHBody fhStructure={[]} fhItems={items} fetcher={fetcher} metadata={FHMetadataMock} contactId="test-contact-id" />
        );

        const associated = getAllByRole('tab')[1];
        fireEvent.click(associated);

        expect(wrapperParams.allFinancialHoldings).toEqual([]);
        expect(wrapperParams.fhPickLists).toEqual({
            fhCategoryTypes: toPickListMap(FHMetadataMock.categories.optionSet),
            fhTypeTypes: toPickListMap(FHMetadataMock.types.optionSet),
            roles: toPickListMap(FHMetadataMock.role.optionSet),
        });
    });

    it('Should render DetailedMembersGroupHoldingsWrapper component', async () => {
        const { getByTestId, getAllByRole } = render(
            <DetailedFHBody fhStructure={[]} fhItems={items} fetcher={fetcher} contactId="test-contact-id" />
        );

        const associated = getAllByRole('tab')[1];
        fireEvent.click(associated);
        expect(getByTestId(/mocked-fh-table-details-main/i)).toBeVisible();
    });

    it('Should reset selection DetailedFHBody when moving to compact component', async () => {
        const { getByTestId } = render(
            <ResponsiveContainer classPrefix={DETAILED_FH_RESPONSIVE_CLASS}>
                <DetailedFHBody fhStructure={[]} fhItems={items} fetcher={fetcher} contactId="test-contact-id" />
            </ResponsiveContainer>
        );

        expect(getByTestId(/mocked-fh-table/i)).toBeVisible();
    });

    it('Should render in compact mode', async () => {
        width = 500;
        const { getByTestId } = render(
            <ResponsiveContainer classPrefix={DETAILED_FH_RESPONSIVE_CLASS}>
                <DetailedFHBody fhStructure={[]} fhItems={items} fetcher={fetcher} contactId="test-contact-id" />
            </ResponsiveContainer>
        );

        expect(getByTestId(/mocked-fh-table/i)).toBeVisible();
        expect(detailedParams.isCompactView).toBeTruthy();
    });

    it('Should pass fh customers to FH details once loaded', async () => {
        width = 500;
        const { getByTestId } = render(
            <ResponsiveContainer classPrefix={DETAILED_FH_RESPONSIVE_CLASS}>
                <DetailedFHBody fhStructure={[]} fhItems={items} fetcher={fetcher} contactId="test-contact-id" />
            </ResponsiveContainer>
        );

        expect(getByTestId(/mocked-fh-table/i)).toBeVisible();
        detailedParams.setSelected(items[0]);
        await waitFor(() => expect(fetcher.fetchFHRelatedCustomers).toBeCalled());
        expect(detailedParams.fhCustomersState).toBeDefined();
        expect(detailedParams.fhCustomersState.relatedCustomers).toEqual(fhCustomers);
        expect(detailedParams.fhCustomersState.relatedCustomersLoadingState).toEqual(LoadingState.Success);
    });

    it('Should pass fh customers error', async () => {
        const errorFetcher = {
            ...fetcher,
            fetchFHRelatedCustomers: jest.fn().mockRejectedValue('Error'),
        };
        const { getByTestId } = render(
            <ResponsiveContainer classPrefix={DETAILED_FH_RESPONSIVE_CLASS}>
                <DetailedFHBody fhStructure={[]} fhItems={items} fetcher={errorFetcher} contactId="test-contact-id" />
            </ResponsiveContainer>
        );

        expect(getByTestId(/mocked-fh-table/i)).toBeVisible();
        detailedParams.setSelected(items[0]);
        await waitFor(() => expect(errorFetcher.fetchFHRelatedCustomers).toBeCalled());
        expect(detailedParams.fhCustomersState.relatedCustomersLoadingState).toEqual(LoadingState.Error);
    });
});
