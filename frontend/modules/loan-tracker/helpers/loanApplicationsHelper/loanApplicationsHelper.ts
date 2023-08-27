import { ACTIVE_STATUS_CODES, STATES, ActiveStatusCodesValues, StatesValues } from '../../constants/LoanStateMap.consts';

export const isLoanApplicationLocked = ({ stateCode, statusCode }: { stateCode?: StatesValues; statusCode?: ActiveStatusCodesValues }) => {
    const isInActiveState = stateCode === STATES.Active;
    const isInReviewOrHoldStatus = ACTIVE_STATUS_CODES.InReview === statusCode || ACTIVE_STATUS_CODES.OnHold === statusCode;
    return !isInActiveState || !isInReviewOrHoldStatus;
};
