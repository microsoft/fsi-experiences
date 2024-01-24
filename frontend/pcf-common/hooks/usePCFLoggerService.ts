import { useMemo } from 'react';
import contextService from '../services/ContextService';
import loggerServiceMock from '@fsi/core-components/dist/context/telemetry/ILoggerService.mock';
import { ILoggerService } from '@fsi/core-components/dist/context/telemetry/ILoggerService';

export const usePCFLoggerService = (): ILoggerService => {
    const context = contextService.geContext();

    return useMemo(() => {
        return getLoggerService(!context || contextService.isTestMode());
    }, [context]);
};

export const getLoggerService = (testMode = false) => {
    if (testMode) {
        return loggerServiceMock;
    }
    // you can return your loggerService instance here
    return loggerServiceMock;
};
