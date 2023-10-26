import { ILoggerService } from '../telemetry/ILoggerService';
import { useFSIContext } from './useFSIContext';
/* istanbul ignore file */
export const useLoggerService = (): ILoggerService => {
    const context = useFSIContext();

    return context.loggerService;
};
