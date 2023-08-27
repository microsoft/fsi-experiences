import React, { useMemo } from 'react';
import { PCFContainer, PCFContainerProps } from '../PCFContainer';
import contextService from '../../services/ContextService';
import { extractEntityId } from '../../utilities/extractEntityId';
import Segments from '@fsi/core-components/dist/widgets/keyObservations/Segments/Segments';
import MockKeyObservationsFetcher from '@fsi/core-components/dist/dataLayerInterface/service/mocks/MockKeyObservationsFetcher';
import { KeyObservationsFetcher } from '../../data-layer/keyObservations/KeyObservationsFetcher';

export interface SegmentsContainerProps extends PCFContainerProps {}

export const SegmentsContainer: React.FC<SegmentsContainerProps> = (props: SegmentsContainerProps) => {
    const { context } = props;
    const headerText = context.parameters?.useFieldLabel?.raw === '1' ? context.mode.accessibilityLabel : undefined;

    const fetcher = useMemo(() => {
        return contextService.isTestMode() ? new MockKeyObservationsFetcher() : new KeyObservationsFetcher(context);
    }, [context]);

    const contactId = extractEntityId(context.parameters?.contactId);

    return (
        context && (
            <PCFContainer context={context} enableEnvVars={false} withCurrencies={false} enableDynamicTheming={false}>
                <Segments headerText={headerText} contactId={contactId} fetcher={fetcher} />
            </PCFContainer>
        )
    );
};
export default SegmentsContainer;
