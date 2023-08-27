import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '../PCFContainer';
import contextService from '../../services/ContextService';
import { extractEntityId } from '../../utilities/extractEntityId';
import Prediction from '@fsi/core-components/dist/widgets/keyObservations/Prediction/Prediction';
import MockKeyObservationsFetcher from '@fsi/core-components/dist/dataLayerInterface/service/mocks/MockKeyObservationsFetcher';
import { KeyObservationsFetcher } from '../../data-layer/keyObservations/KeyObservationsFetcher';

export interface PredictionContainerProps extends PCFContainerProps {}

export const PredictionContainer: React.FC<PredictionContainerProps> = (props: PredictionContainerProps) => {
    const { context } = props;

    const fetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockKeyObservationsFetcher() : new KeyObservationsFetcher(context);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);

    return (
        context && (
            <PCFContainer context={context} enableEnvVars={false} withCurrencies={false} enableDynamicTheming={false}>
                <Prediction contactId={contactId} fetcher={fetcher} />
            </PCFContainer>
        )
    );
};
export default PredictionContainer;
