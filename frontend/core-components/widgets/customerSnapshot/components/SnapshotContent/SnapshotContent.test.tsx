import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import SnapshotContent from './SnapshotContent';
import customerSnapshotControlStrings from '../../../../assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';
import useCustomerSnapshot from '../../hooks/useCustomerSnapshot';
import { MockCustomerSnapshotFetcher } from '../../../../dataLayerInterface/service/mocks/MockCustomerSnapshotFetcher';
import { QueryClientWrapper } from '../../../../utilities/tests/ProviderWrapper';
import { MockSnapshotLayout } from '../../../../dataLayerInterface/entity/CustomerSnapshot/mocks/CustomerSnapshotLayout.mock';
import { MockSnapshotMetadata } from '../../../../dataLayerInterface/entity/CustomerSnapshot/mocks/CustomerSnapshotMetadata.mock';
import { MockSnapshotData } from '../../../../dataLayerInterface/entity/CustomerSnapshot/mocks/CustomerSnapshotData.mock';

const ContentWithData = () => {
    const { data, layoutResponse, metadata } = useCustomerSnapshot({ formId: '1', entityId: '1', fetcher: new MockCustomerSnapshotFetcher() });
    if (!layoutResponse?.layout) {
        return <div data-testid="loading" />;
    }

    return <SnapshotContent layout={layoutResponse?.layout} data={data} metadata={metadata} />;
};
describe('CustomerSnapshot/Content', () => {
    it('Should render customer snapshot content', async () => {
        const { getAllByTestId, getByTestId } = render(<ContentWithData />, {
            wrapper: QueryClientWrapper,
        });
        await waitForElementToBeRemoved(getByTestId('loading'));

        const numOfFields =
            MockSnapshotLayout.sections.reduce((sum, section) => sum + section.fields?.length || 0, 0) +
            (MockSnapshotLayout.headerSection?.subtitleFields?.length || 0);

        expect(getAllByTestId('field-wrapper')).toHaveLength(numOfFields);
    });

    it('Should render customer snapshot content without layout', async () => {
        const { getByText } = render(<SnapshotContent metadata={{}} />);

        expect(getByText(customerSnapshotControlStrings.INVALID_CONFIGURATION)).toBeVisible();
    });

    it('Should render customer snapshot content without metadata', async () => {
        const { getByText } = render(<SnapshotContent layout={{ headerSection: {}, sections: [] }} />);

        expect(getByText(customerSnapshotControlStrings.INVALID_CONFIGURATION)).toBeVisible();
    });

    it('Should render invalid config error when invalid config is true', async () => {
        const { getByText } = render(
            <SnapshotContent invalidConfig metadata={{}} data={{ fields: {} }} layout={{ headerSection: {}, sections: [] }} />
        );

        expect(getByText(customerSnapshotControlStrings.INVALID_CONFIGURATION)).toBeVisible();
    });

    it('Should render customer snapshot content without data', async () => {
        const { getByText } = render(<SnapshotContent metadata={{}} layout={{ headerSection: {}, sections: [] }} />);

        expect(getByText(customerSnapshotControlStrings.NO_DATA_TO_SHOW_YET)).toBeVisible();
    });

    it('Should render customer snapshot content without header', async () => {
        const mockLayout = { ...MockSnapshotLayout };
        mockLayout.headerSection = {};
        const { getAllByTestId, queryByTestId } = render(
            <SnapshotContent data={MockSnapshotData} metadata={MockSnapshotMetadata} layout={mockLayout} />
        );
        const numOfFields = MockSnapshotLayout.sections.reduce((sum, section) => sum + section.fields?.length || 0, 0);
        expect(getAllByTestId('field-wrapper')).toHaveLength(numOfFields);
        expect(queryByTestId('snapshot-header-separator')).toBeNull();
    });

    it('Should render customer snapshot content without sections', async () => {
        const mockLayout = { ...MockSnapshotLayout };
        mockLayout.sections = [];
        const { getAllByTestId, queryByTestId } = render(
            <SnapshotContent data={MockSnapshotData} metadata={MockSnapshotMetadata} layout={mockLayout} />
        );
        const numOfFields = MockSnapshotLayout.headerSection?.subtitleFields?.length || 0;
        expect(getAllByTestId('field-wrapper')).toHaveLength(numOfFields);
        expect(queryByTestId('snapshot-header-separator')).toBeNull();
    });
});
