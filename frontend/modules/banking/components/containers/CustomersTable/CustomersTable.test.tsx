import React from 'react';
import { render } from '@testing-library/react';
import CustomersTable from './CustomersTable';
import { getCustomersMock } from './Customer.mock';
import ICustomerFH from '../../../interfaces/FHEntity/CustomerFH';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { FHMetadataMock } from '../../../interfaces/FHEntity/mocks/FHMetadata.mock';

describe('CustomersTable', () => {
    let customers: ICustomerFH[];

    beforeEach(() => {
        customers = getCustomersMock();
    });

    it('Should render related cutomers with 4 personas', async () => {
        const { queryAllByTestId } = render(
            <CustomersTable roleMetaData={FHMetadataMock.role} customers={customers} customersLoadingState={LoadingState.Success} />
        );

        const personas = queryAllByTestId(/clickable-persona/i);
        expect(personas).toHaveLength(4);
        expect(queryAllByTestId('customer-role')).toHaveLength(4);
    });

    it('Should render related cutomers with 4 personas and compact', async () => {
        const { queryAllByTestId } = render(
            <CustomersTable isCompact roleMetaData={FHMetadataMock.role} customers={customers} customersLoadingState={LoadingState.Success} />
        );

        const personas = queryAllByTestId(/clickable-persona/i);
        expect(personas).toHaveLength(4);

        expect(queryAllByTestId('customer-role')).toHaveLength(0);
    });

    it('Should render related customer with image', async () => {
        const imageUrl =
            'https://orge585c22e.crm.dynamics.com/Image/download.aspx?Entity=contact&Attribute=entityimage&Id=c9e61d55-6f9a-46e5-a91c-44e52d99ec50&Timestamp=637546806356311337';
        customers[0].contact.contactImgUrl = imageUrl;
        render(<CustomersTable roleMetaData={FHMetadataMock.role} customers={customers} customersLoadingState={LoadingState.Success} />);

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(imageUrl);
    });

    it('Should not render table', async () => {
        const { queryByTestId, queryAllByTestId } = render(<CustomersTable customers={[]} customersLoadingState={LoadingState.Success} />);

        const personas = queryAllByTestId(/clickable-persona/i);
        expect(personas).toHaveLength(0);
        expect(queryByTestId(/customers-table/i)).toBeNull();
    });

    it('Should render error state', async () => {
        const { queryByTestId, getByText } = render(<CustomersTable customers={[]} customersLoadingState={LoadingState.Error} />);

        expect(queryByTestId('error-state')).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should render loading', async () => {
        const { getByTestId, getByText } = render(<CustomersTable customers={[]} customersLoadingState={LoadingState.Loading} />);

        expect(getByTestId('loading-spinner')).toBeInTheDocument();
        expect(getByText(commonStrings.LOADING)).toBeVisible();
    });
});
