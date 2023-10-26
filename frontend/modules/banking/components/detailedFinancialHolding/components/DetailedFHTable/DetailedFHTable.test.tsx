import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { DetailedFHTable, groupFinancialHolding, sortFinancialHolding, sortGroupedFinancialHolding } from './DetailedFHTable';
import { getDetailedFHMock, getFHFetcherMock } from '../../DetailedFHData.mock';
import { FinancialHoldingGroupedListProps } from '../FinancialHoldingGroupedList/FinancialHoldingGroupedList';
import sumBy from 'lodash/sumBy';
import ICustomerFH from '../../../../interfaces/FHEntity/CustomerFH';
import { FHMetadataMock } from '../../../../interfaces/FHEntity/mocks/FHMetadata.mock';
import { DetailedFHCustomersState } from '../DetailedFHBody';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';

const mockedSIDMainCompFunction = jest.fn();
const mockedTableDetailsCompFunction = jest.fn();
const mockedAssetsLiabilitiesCompFunction = jest.fn();
let onSelect;

jest.mock('../SelectedItemDetails/SIDMain/SIDMain', () => props => {
    mockedSIDMainCompFunction(props);
    return (
        <div data-testid="mocked-sid-main">
            {props.selected?.id}
            {props.relatedCustomers.length ? <span data-testid="mocked-related-fh-customers"></span> : undefined}
        </div>
    );
});

jest.mock('../FinancialHoldingGroupedList/FinancialHoldingGroupedList', () => (props: FinancialHoldingGroupedListProps) => {
    mockedTableDetailsCompFunction(props);
    onSelect = props.onSelect;
    return <div data-testid="mocked-fh-table-details-main"></div>;
});

jest.mock(
    '../../../../components/FHCategoriesAssetsLiabilitiesLine/FHCategoriesAssetsLiabilitiesLine',
    () => (props: FinancialHoldingGroupedListProps) => {
        mockedAssetsLiabilitiesCompFunction(props);
        return <div data-testid="mocked-fh-assets-liabilities-line"></div>;
    }
);

describe('DetailedFHTable', () => {
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
        fetchFHData: jest.fn().mockResolvedValue(getFHFetcherMock()),
        fetchFHRelatedCustomers: jest.fn().mockResolvedValue(fhCustomers),
        fetchFHMetadata: jest.fn().mockResolvedValue({}),
    };

    const fhCustomersState: DetailedFHCustomersState = {
        relatedCustomers: fhCustomers,
        relatedCustomersLoadingState: LoadingState.Success,
    };

    const emptyFHCustomersState: DetailedFHCustomersState = {
        relatedCustomers: [],
        relatedCustomersLoadingState: LoadingState.Success,
    };

    beforeEach(() => {
        fetcher.fetchFHData.mockClear();
        fetcher.fetchFHRelatedCustomers.mockClear();
        mockedTableDetailsCompFunction.mockClear();
        mockedTableDetailsCompFunction.mockClear();
        mockedAssetsLiabilitiesCompFunction.mockClear();
    });

    it('Should render FinancialHoldingGroupedList component', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={items[0]}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        expect(getByTestId(/mocked-fh-table-details-main/i)).toBeVisible();

        expect(mockedTableDetailsCompFunction).toHaveBeenCalledWith(expect.objectContaining({ items }));
    });

    it('Should render empty state', async () => {
        const items = [];
        const { getByTestId } = render(
            <DetailedFHTable
                selected={undefined}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        expect(getByTestId('empty-state')).toBeVisible();
    });

    it('Should render FinancialHoldingGroupedList component with the right groups', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={items[0]}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        sortFinancialHolding(items);

        const groupsMap = groupFinancialHolding(items, FHMetadataMock);

        const sorted = sortGroupedFinancialHolding(groupsMap);
        expect(getByTestId(/mocked-fh-table-details-main/i)).toBeVisible();

        expect(mockedTableDetailsCompFunction).toHaveBeenCalledWith(expect.objectContaining({ groups: sorted }));
    });

    it('Should render SIDMain component', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={undefined}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={emptyFHCustomersState}
            />
        );

        expect(getByTestId(/mocked-sid-main/i)).toBeVisible();

        expect(mockedSIDMainCompFunction).toHaveBeenLastCalledWith(expect.objectContaining({ relatedCustomers: [] }));
    });

    it('Should pass selected and fhCustomers to SIDMain component after selection', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={items[0]}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        expect(getByTestId(/mocked-sid-main/i)).toBeVisible();

        const selectedItem = items[0];
        onSelect(selectedItem);
        await waitFor(() => expect(getByTestId('mocked-related-fh-customers')).toBeVisible());

        expect(mockedSIDMainCompFunction).toHaveBeenLastCalledWith(expect.objectContaining({ relatedCustomers: fhCustomers }));
    });

    it('Should not render customers list when undefined was selected', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { queryByTestId, getByTestId } = render(
            <DetailedFHTable
                selected={undefined}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={emptyFHCustomersState}
            />
        );

        expect(getByTestId(/mocked-sid-main/i)).toBeVisible();

        onSelect(undefined);
        expect(queryByTestId('mocked-related-fh-customers')).toBeNull();

        expect(mockedSIDMainCompFunction).toHaveBeenLastCalledWith(expect.objectContaining({ relatedCustomers: [], selected: undefined }));
    });

    it('Should render FHCategoriesAssetsLiabilitiesLine with the right assets and liabilities sums', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={items[0]}
                isCompactView={false}
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        const total = sumBy(items, 'balanceDefault');

        const liabilitiesSum = sumBy(items, item => (item.balanceDefault < 0 ? item.balanceDefault : 0));

        await waitFor(() => expect(getByTestId('mocked-fh-assets-liabilities-line')).toBeVisible());
        expect(mockedAssetsLiabilitiesCompFunction).toHaveBeenCalledWith(
            expect.objectContaining({ liabilities: liabilitiesSum, assets: total - liabilitiesSum })
        );
    });

    it('Should render DetailedList with isCompact correctly when not selected', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={undefined}
                isCompactView
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        expect(getByTestId(/mocked-fh-table-details-main/i)).toBeVisible();
        await waitFor(() => expect(getByTestId('back-button-wrapper')).not.toBeVisible());
    });

    it('Should render DetailedList with isCompact correctly when selected', async () => {
        const items = Array.from(getDetailedFHMock().values());

        const { getByTestId } = render(
            <DetailedFHTable
                selected={items[0]}
                isCompactView
                setSelected={() => {}}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        expect(getByTestId(/mocked-fh-table-details-main/i)).not.toBeVisible();
        await waitFor(() => expect(getByTestId('back-button-wrapper')).toBeInTheDocument());
    });

    it('Should reset selected FH when clicking on go back button', async () => {
        const items = Array.from(getDetailedFHMock().values());
        const onSelected = jest.fn();
        const { getByTestId } = render(
            <DetailedFHTable
                selected={items[0]}
                isCompactView
                setSelected={onSelected}
                metadata={FHMetadataMock}
                items={items}
                contactId="test-contact-id"
                fhCustomersState={fhCustomersState}
            />
        );

        expect(getByTestId(/mocked-fh-table-details-main/i)).not.toBeVisible();
        await waitFor(() => expect(getByTestId('back-button-wrapper')).toBeInTheDocument());
        fireEvent.click(getByTestId('back-button'));
        expect(onSelected).toBeCalledWith(undefined);
    });
});
