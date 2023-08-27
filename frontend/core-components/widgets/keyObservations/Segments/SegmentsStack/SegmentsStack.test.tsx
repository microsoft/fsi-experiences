import React from 'react';
import { render } from '@testing-library/react';
import { SegmentsStack } from './SegmentsStack';
import customerSnapshotControlStrings from '../../../../assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';

describe('SegmentsStack unit tests', () => {
    const params = {
        segments: [{ segmentName: '1 customer' }],
        segmentsError: undefined,
    };

    describe('segment test', () => {
        it('Should render empty state when empty list', () => {
            const { getByTestId, queryByTestId } = render(<SegmentsStack {...params} segments={[]} isSegmentsSupported />);

            expect(getByTestId('empty-state')).toBeVisible();
            expect(queryByTestId('SegmentsStack-segments')).toBeNull();
        });

        it('Should render empty segments is undefined', () => {
            const { queryByTestId } = render(<SegmentsStack {...params} isSegmentsSupported />);

            expect(queryByTestId('empty-state')).toBeNull();
            expect(queryByTestId('SegmentsStack-segments')).toBeNull();
        });

        it('Should render empty state when artifact is not supported', () => {
            const mockSegment = [{ segmentName: '1 customer' }];
            const { queryByTestId, getByText } = render(<SegmentsStack {...params} segments={mockSegment} isSegmentsSupported={false} />);

            expect(queryByTestId('empty-state')).toBeInTheDocument();
            expect(getByText(customerSnapshotControlStrings.INVALID_CONFIGURATION)).toBeVisible();
        });

        it('Should render segment if exists', () => {
            const mockSegment = [{ segmentName: '1 customer' }];
            const { getAllByTestId } = render(<SegmentsStack {...params} segments={mockSegment} isSegmentsSupported />);

            expect(getAllByTestId('insights-segments-item')).toHaveLength(1);
        });

        it('Should render multiple segments if exists', () => {
            const mockSegments = [{ segmentName: '1 customer' }, { segmentName: '2 customer' }];
            const { getAllByTestId, getByText } = render(<SegmentsStack {...params} segments={mockSegments} isSegmentsSupported={true} />);

            expect(getAllByTestId('insights-segments-item')).toHaveLength(2);
            mockSegments.forEach(mock => expect(getByText(mock.segmentName)).toBeVisible());
        });
    });
});
