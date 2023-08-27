import { useMemo } from 'react';
import loggerService from '../services/LoggerService';
import contextService from '../services/ContextService';
import loggerServiceMock from '@fsi/core-components/dist/context/telemetry/ILoggerService.mock';

export const usePCFLoggerService = () => {
    const context = contextService.geContext();

    return useMemo(() => {
        if (!context || contextService.isTestMode()) {
            return loggerServiceMock;
        }

        return loggerService;
    }, [context]);
};
