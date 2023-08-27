import Stack from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import Widget from '../../../components/atoms/Widget/Widget';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';
import { usePredictions } from '../hooks/usePredictions';
import { IPredictionProps } from './Prediction.interface';
import PredictionTag from './PredictionTag/PredictionTag';

export const Prediction: FC<IPredictionProps> = props => {
    const { prediction, isFetchError, isLoading, isPredictionSupported } = usePredictions(props.fetcher, true, props.contactId);
    const translate = useTranslation(namespaces.KEY_OBSERVATIONS);

    return (
        <Widget name="key-prediction-widget" header={translate('KEY_PREDICTION')} isError={isFetchError} isLoading={isLoading}>
            <Stack horizontalAlign="start" tokens={{ padding: 16 }}>
                <PredictionTag prediction={prediction} isPredictionSupported={isPredictionSupported} />
            </Stack>
        </Widget>
    );
};

export default Prediction;
