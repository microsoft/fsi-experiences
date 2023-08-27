import Stack from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import { IPredictionProps } from '../Prediction.interface';
import { KEY_OBSERVATIONS_FLAGS } from '../../../../constants/features';
import { useIsFeatureEnabled } from '../../../../context/hooks/useIsFeatureEnabled';
import { baseCardStyles } from '../../../../styles/Common.style';
import Prediction from '../Prediction';
import { useIsArtifactSupported } from '../../hooks/useIsArtifactSupported';
import { InternalArtifactName, ArtifactType } from '../../../../constants/KeyObservations';

export const PredictionWrapper: FC<IPredictionProps> = props => {
    const showPrediction = useIsFeatureEnabled(KEY_OBSERVATIONS_FLAGS.SHOW_CHURN_SCORE);
    const { isArtifactSupported, isLoadingArtifact } = useIsArtifactSupported(
        props.fetcher,
        showPrediction,
        ArtifactType.Model,
        InternalArtifactName.Churn
    );

    if (!showPrediction || isLoadingArtifact || !isArtifactSupported) {
        return null;
    }

    return (
        <Stack.Item align="stretch" styles={baseCardStyles}>
            <Prediction {...props} />
        </Stack.Item>
    );
};

export default PredictionWrapper;
