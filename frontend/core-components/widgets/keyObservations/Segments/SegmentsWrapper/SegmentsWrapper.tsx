import Stack from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import Segments from '../Segments';
import { KEY_OBSERVATIONS_FLAGS } from '../../../../constants/features';
import { useIsFeatureEnabled } from '../../../../context/hooks/useIsFeatureEnabled';
import { baseCardStyles } from '../../../../styles/Common.style';
import type { ISegmentsProps } from '../Segments.interface';
import { useIsArtifactSupported } from '../../hooks/useIsArtifactSupported';
import { ArtifactType } from '../../../../constants/KeyObservations';

export const SegmentsWrapper: FC<ISegmentsProps> = props => {
    const showSegments = useIsFeatureEnabled(KEY_OBSERVATIONS_FLAGS.SHOW_SEGMENTS);
    const { isArtifactSupported, isLoadingArtifact } = useIsArtifactSupported(props.fetcher, showSegments, ArtifactType.Segment);
    if (isLoadingArtifact || !showSegments || !isArtifactSupported) {
        return null;
    }

    return (
        <Stack.Item align="stretch" styles={baseCardStyles}>
            <Segments {...props} />
        </Stack.Item>
    );
};

export default SegmentsWrapper;
