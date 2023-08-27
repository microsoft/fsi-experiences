import { useMemo } from 'react';
import { ILifeEventConfigurations } from '../interfaces/Configuration';
import { LifeEvent } from '../interfaces/LifeEvent';
import { isFocusIndication, isNewIndication } from '../utilities/LifeEventsUtils';

export const useIndicators = (
    lifeEvent: LifeEvent | undefined,
    configuration?: ILifeEventConfigurations
): { isNew?: boolean; isFocused?: boolean } => {
    const indicators = useMemo(() => {
        if (!lifeEvent || !configuration) {
            return {};
        }
        return {
            isFocused: isFocusIndication(lifeEvent, configuration),
            isNew: isNewIndication(lifeEvent, configuration),
        };
    }, [configuration, lifeEvent]);

    return indicators;
};
