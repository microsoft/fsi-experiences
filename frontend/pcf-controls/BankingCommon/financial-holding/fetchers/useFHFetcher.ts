import contextService from '@fsi/pcf-common/services/ContextService';
import { IFHFetcher } from '@fsi/banking/interfaces/IFHFetcher';
import { FHFetcher } from './FHFetcher';
import { MockFHFetcher } from '@fsi/banking/constants/MockFHFetcher';
import { usePCFLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

export const useFHFetcher = (context): IFHFetcher => {
    const loggerService = usePCFLoggerService();
    return contextService.isTestMode() ? new MockFHFetcher() : new FHFetcher(context, loggerService);
};