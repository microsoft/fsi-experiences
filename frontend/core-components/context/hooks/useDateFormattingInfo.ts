import { IDateFormattingInfo } from '../FSIContext';
import { useFSIContext } from './useFSIContext';

export const useDateFormattingInfo = (): IDateFormattingInfo | undefined => {
    const context = useFSIContext();

    return context.dateFormattingInfo;
};
