import { IFHCardsFetcher } from '@fsi/banking/interfaces/IFHCardsFetcher';
import { getFHCardsMock } from '@fsi/banking/constants/FHCardsMock';
import { FHCardsResponse } from '@fsi/banking/interfaces/FHEntity';
import { FHMetadata } from '@fsi/banking/interfaces/FHEntity/FHMetadata';
import { FHFetcher } from './FHFetcher';
import { PCFBaseFetcher } from '@fsi/pcf-common/data-layer/base/PCFBaseFetcher';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { fhCardInstrumentQuery } from '@fsi/banking/constants/FHQuery';
import { ActiveStateCode, createOrUpdateFHFields, extractFromAllFHTables, extractStateFromFH } from '../FHDataMappers';
import currencyService, { ICurrenciesDetails } from '@fsi/pcf-common/services/CurrencyService';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';

export class FHCardsFetcher extends PCFBaseFetcher implements IFHCardsFetcher {
    private modelLabel;
    private fhFetcher: FHFetcher;
    constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
        this.fhFetcher = new FHFetcher(context, this.loggerService);
        this.modelLabel = context.mode.label;
    }

    private checkErrorForPermissions(err: Error): boolean {
        return err.message.includes('permission');
    }

    private async getResult(entityName: string, fetchXml: string): Promise<FHCardsResponse> {
        const fhMap = new Map();
        try {
            let result;
            if (this.modelLabel !== 'TestLabel') {
                const promises: [Promise<any>, Promise<ICurrenciesDetails | undefined>] = [
                    this.webAPI.retrieveMultipleRecords(entityName, fetchXml),
                    currencyService.getCurrencies(this.context),
                ];

                result = await this.ExecuteAndLog(
                    FHCardsFetcher.name,
                    'getResult',
                    'Fetching cards data and currencies.',
                    'Successfully fetched cards data and currencies.',
                    {
                        entityName,
                    },
                    () =>
                        Promise.all(promises).catch((err: Error) => {
                            if (this.checkErrorForPermissions(err)) {
                                return false;
                            }
                            throw err;
                        })
                );
            } else {
                // ---------------------mock ---------------------
                getFHCardsMock().forEach(entity => {
                    const fhFields = createOrUpdateFHFields(entity, fhMap);
                    fhMap.set(fhFields.id, fhFields);
                });

                return { financialHoldings: fhMap, hasAccess: true };
                // -----------------------------------------------
            }

            if (result === false) {
                this.loggerService.logInfo(FHCardsFetcher.name, 'getResult', 'The user does not have access to financial holdings cards entities.');
                return { financialHoldings: new Map(), hasAccess: false };
            }

            this.loggerService.logInfo(FHCardsFetcher.name, 'getResult', 'Creating FH map after data fetch.', {
                'number of FH': result[0].entities.length || 0,
            });
            result[0].entities.forEach(entity => {
                const { fhPolyState, fhState, entityState } = extractStateFromFH(entity);
                if (fhState === ActiveStateCode && entityState == ActiveStateCode && fhPolyState === ActiveStateCode) {
                    const fhFields = createOrUpdateFHFields(entity, fhMap);
                    fhMap.set(fhFields.id, fhFields);
                }
            });
            return { financialHoldings: fhMap, hasAccess: true };
        } catch (e) {
            this.loggerService.logError(FHCardsFetcher.name, 'getResult', 'Failed to fetch or extract cards data.', FSIErrorTypes.ServerError, e, {
                entityName,
            });
            throw e;
        }
    }

    public async fetchFHCardsData(contactId: string): Promise<FHCardsResponse> {
        try {
            const fetchCreditQuery = fhCardInstrumentQuery(contactId);
            return await this.ExecuteAndLog(
                FHCardsFetcher.name,
                'fetchFHCardsData',
                'Fetching contact FH cards.',
                'Successfully fetched contact FH cards.',
                {
                    contactId,
                },
                () => this.getResult('msfsi_customerfinancialholding', '?fetchXml=' + encodeURIComponent(fetchCreditQuery))
            );
        } catch (e) {
            this.loggerService.logError(FHCardsFetcher.name, 'fetchFHCardsData', 'Failed to fetch cards data.', FSIErrorTypes.ServerError, e, {
                contactId,
            });
            throw e;
        }
    }

    async fetchFHMetadata(): Promise<FHMetadata> {
        return this.fhFetcher.fetchFHMetadata();
    }
}
