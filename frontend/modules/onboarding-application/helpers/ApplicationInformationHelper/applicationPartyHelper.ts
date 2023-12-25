import { STATES, StatesValues } from '../../constants/ApplicationStateMap.const';

export const isLocked = ({ status, partyStatus }: { status?: StatesValues; partyStatus?: StatesValues }) => {
    return status !== STATES.Active || partyStatus !== STATES.Active;
};
