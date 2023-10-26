import { LIFE_EVENTS_FLAGS, LIFE_EVENTS_FLAGS_DEFAULTS } from '@fsi/milestones/constants/lifeEvents';
import { extractContextualFlags } from '@fsi/pcf-common/utilities/extractContextualConfig';

export const extractLifeEventsFlags = context => ({
    flags: extractContextualFlags(context, Object.values(LIFE_EVENTS_FLAGS), LIFE_EVENTS_FLAGS_DEFAULTS),
});
