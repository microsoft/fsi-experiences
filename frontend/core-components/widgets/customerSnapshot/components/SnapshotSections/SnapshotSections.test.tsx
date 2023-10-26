import React from 'react';
import { render } from '@testing-library/react';
import SnapshotSections from './SnapshotSections';
import { MockSnapshotLayout } from '../../../../dataLayerInterface/entity/CustomerSnapshot/mocks/CustomerSnapshotLayout.mock';
import { MockSnapshotMetadata } from '../../../../dataLayerInterface/entity/CustomerSnapshot/mocks/CustomerSnapshotMetadata.mock';
import { MockSnapshotData } from '../../../../dataLayerInterface/entity/CustomerSnapshot/mocks/CustomerSnapshotData.mock';

const getNumberOfFields = sections => sections.reduce((sum, section) => sum + section.fields?.length || 0, 0);

describe('SnapshotSections', () => {
    it('Should render customer snapshot sections', async () => {
        const { getAllByTestId } = render(
            <SnapshotSections data={MockSnapshotData} metadata={MockSnapshotMetadata} sections={MockSnapshotLayout.sections} />
        );

        expect(getAllByTestId('field-wrapper')).toHaveLength(getNumberOfFields(MockSnapshotLayout.sections));
    });

    it('Should render nothing when when sections is undefined', async () => {
        const { container } = render(<SnapshotSections data={MockSnapshotData} metadata={MockSnapshotMetadata} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should render nothing when empty sections', async () => {
        const { container } = render(<SnapshotSections data={MockSnapshotData} metadata={MockSnapshotMetadata} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('Should render customer snapshot content without header', async () => {
        const { getAllByTestId, queryByTestId } = render(
            <SnapshotSections data={MockSnapshotData} metadata={MockSnapshotMetadata} sections={MockSnapshotLayout.sections} hasHeader={false} />
        );

        expect(getAllByTestId('field-wrapper')).toHaveLength(getNumberOfFields(MockSnapshotLayout.sections));
        expect(queryByTestId('snapshot-header-separator')).toBeNull();
    });
});
