import React, { FC } from 'react';
import Widget from '../../../components/atoms/Widget/Widget';
import { useTranslation, namespaces } from '../../../context/hooks/useTranslation';
import { useSegments } from '../hooks/useSegments';
import type { ISegmentsProps } from './Segments.interface';
import { SegmentsStack } from './SegmentsStack/SegmentsStack';

export const Segments: FC<ISegmentsProps> = ({ contactId, fetcher, headerText }) => {
    const { segments, isLoading, isFetchError, isSegmentSupported } = useSegments(fetcher, true, contactId);
    const translate = useTranslation(namespaces.KEY_OBSERVATIONS);

    return (
        <Widget name="key-segments-widget" header={headerText || translate('KEY_SEGMENTS')} isError={isFetchError} isLoading={isLoading}>
            <SegmentsStack segments={segments} isSegmentsSupported={isSegmentSupported} />
        </Widget>
    );
};

export default Segments;
