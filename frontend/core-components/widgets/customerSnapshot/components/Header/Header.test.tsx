import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Header from './Header';
import useCustomerSnapshot from '../../hooks/useCustomerSnapshot';
import { MockCustomerSnapshotFetcher } from '../../../../dataLayerInterface/service/mocks/MockCustomerSnapshotFetcher';
import { QueryClientWrapper } from '../../../../utilities/tests/ProviderWrapper';

const HeaderWithData = () => {
    const { data, layoutResponse, metadata } = useCustomerSnapshot({ formId: '1', entityId: '1', fetcher: new MockCustomerSnapshotFetcher() });
    if (!layoutResponse?.layout) {
        return null;
    }

    return (
        <Header
            titleField={layoutResponse?.layout.headerSection.titleField}
            subtitleFields={layoutResponse?.layout.headerSection.subtitleFields}
            data={data}
            metadata={metadata}
        />
    );
};

const HeaderWithDataWithoutSubTitle = () => {
    const { data, layoutResponse, metadata } = useCustomerSnapshot({ formId: '1', entityId: '1', fetcher: new MockCustomerSnapshotFetcher() });
    if (!layoutResponse?.layout) {
        return <div data-testid="loading" />;
    }

    return <Header titleField={layoutResponse?.layout.headerSection.titleField} data={data} metadata={metadata} />;
};

describe('Header', () => {
    it('Should render Header', () => {
        const { getByTestId } = render(<HeaderWithData />, { wrapper: QueryClientWrapper });
        waitFor(() => {
            expect(getByTestId('subtitle-fields')).toBeVisible();
        });
    });

    it('Should render Header without subtitle', () => {
        const { queryByTestId } = render(<HeaderWithDataWithoutSubTitle />, { wrapper: QueryClientWrapper });
        waitFor(() => {
            expect(queryByTestId('loading')).not.toBeInTheDocument();
            expect(queryByTestId('subtitle-fields')).not.toBeInTheDocument();
        });
    });

    it('Should render Header without data', () => {
        const { container } = render(<Header />, { wrapper: QueryClientWrapper });

        expect(container).toBeEmptyDOMElement();
    });
});
