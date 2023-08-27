import contextService from '@fsi/pcf-common/services/ContextService';
import { IFHFetcher } from '@fsi/banking/interfaces/IFHFetcher';
import { FHFetcher } from './FHFetcher';
import { MockFHFetcher } from '@fsi/banking/constants/MockFHFetcher';

export const useFHFetcher = (context): IFHFetcher => (contextService.isTestMode() ? new MockFHFetcher() : new FHFetcher(context));
