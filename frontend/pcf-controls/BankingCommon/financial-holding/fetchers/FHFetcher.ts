/* eslint-disable no-useless-catch */
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { IFHFetcher } from '@fsi/banking/interfaces/IFHFetcher';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface';
import ICustomerFH from '@fsi/banking/interfaces/FHEntity/CustomerFH';
import { PCFBaseExecuteWebAPI } from '@fsi/pcf-common/data-layer/base/PCFBaseExecuteWebAPI';
import currencyService from '@fsi/pcf-common/services/CurrencyService';
import { fhEntityToAttributes } from '@fsi/banking/constants/FH.consts';
import { fhEntityToMapper, mergeFHTypesOptionSet } from '@fsi/banking/constants/FHMetadataMappers';
import {
    fetchFHByIdQuery,
    fetchFinancialProductsByFHId,
    fhOtherCustomerQuery,
    fhRelatedCustomersQuery,
    getInstrumentsMainQueryXML,
} from '@fsi/banking/constants/FHQuery';
import { ICurrenciesDetails } from '@fsi/core-components/dist/context/currency/ICurrenciesDetails';
import {
    buildHiddenFHByCategory,
    buildHiddenFinancialHoldings,
    createFHCategory,
    createFinancialHolding,
    createFinancialHoldingMap,
} from '../FHDataMappers';
import { IFinancialProduct } from '@fsi/banking/interfaces/FHEntity/IFinancialProduct';
import { createFinancialProduct } from '@fsi/banking/constants/financialProduct/FHDataMappers';
import { IndictableFH } from '@fsi/banking/interfaces/FHEntity/IndictableFH';
import { FHData, FHMetadata } from '@fsi/banking/interfaces/FHEntity';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';

export class FHFetcher extends PCFBaseExecuteWebAPI implements IFHFetcher {
    constructor(context: CommonPCFContext, protected loggerService: ILoggerService) {
        super(context, loggerService);
    }

    private async executeFHQueries(contactId: string, fetchFI?: boolean, hideShowEntities: {} = {}): Promise<FHData> {
        try {
            const action = this.createAction({ contactid: contactId, hideShowEntities }, 'msfsi_FHfetch', 'data');
            const promises: [Promise<any>, Promise<any>, Promise<ICurrenciesDetails | undefined>] = [
                this.execute(action),
                fetchFI
                    ? this.context.webAPI.retrieveMultipleRecords(
                          'msfsi_customerfinancialholding',
                          '?fetchXml=' + encodeURIComponent(getInstrumentsMainQueryXML([contactId]))
                      )
                    : Promise.resolve({ entities: [] }),
                currencyService.getCurrencies(this.context),
            ];

            const [fhResponse, fiRecords] = await this.ExecuteAndLog(
                FHFetcher.name,
                'executeFHQueries',
                'Fetching FH and FHI records.',
                'Successfully fetched FH and FHI records.',
                undefined,
                () => Promise.all(promises)
            );

            const fhRecords: Map<string, any> = JSON.parse(fhResponse.result);
            const fhEntities = JSON.parse(fhRecords['entities']);
            return {
                data: createFinancialHoldingMap(fhEntities, fiRecords.entities, true),
                requestMetadata: JSON.parse(fhRecords['metadata']),
            };
        } catch (e) {
            this.loggerService.logError(FHFetcher.name, 'executeFHQueries', 'Failed to fetch FH and FHI records.', FSIErrorTypes.ServerError, e);
            throw e;
        }
    }

    public extractFHCustomer(entity): ICustomerFH {
        const contactId = entity['CFH.msfsi_customerid'] || entity['Customer.contactid'];
        const contactRole = entity['CFH.msfsi_financialholdingrole'];
        const contact: IAbbreviatedContact = {
            fullName: entity['Customer.fullname'],
            contactId: contactId,
            contactImgUrl: entity['Customer.entityimage_url'],
        };

        this.loggerService.logInfo(FHFetcher.name, 'extractFHCustomer', 'Extracting FH customer data.', {
            contactId: contactId,
            role: contactRole,
        });
        return {
            contact: contact,
            role: contactRole,
        };
    }

    public async buildRelatedCustomerArray(entityName: string, fetchXml: string): Promise<ICustomerFH[]> {
        const relatedCustomers: ICustomerFH[] = [];

        try {
            const result: any = await this.ExecuteAndLog(
                FHFetcher.name,
                'buildRelatedCustomerArray',
                'Fetching related customers.',
                'Successfully fetched related customers.',
                {
                    entityName,
                },
                () => this.context.webAPI.retrieveMultipleRecords(entityName, fetchXml)
            );

            result.entities.forEach(entity => {
                //since the query operates on FH - an empty related customers table will generate a query table with one line holding the FH ID - hence we check that CustomerId is available
                if (entity['CFH.msfsi_customerid']) {
                    const customerFH: ICustomerFH = this.extractFHCustomer(entity);
                    relatedCustomers.push(customerFH);
                }
            });

            this.loggerService.logInfo(FHFetcher.name, 'buildRelatedCustomerArray', 'Built related customer array.', {
                'array length': relatedCustomers.length,
            });
            return relatedCustomers;
        } catch (e) {
            this.loggerService.logError(
                FHFetcher.name,
                'buildRelatedCustomerArray',
                'Failed to build related customers array.',
                FSIErrorTypes.ServerError,
                e,
                {
                    entityName,
                }
            );
            throw e;
        }
    }

    public async buildFHOtherCustomersOwn(entityName: string, fetchXml: string): Promise<Map<string, ICustomerFH[]>> {
        const fhOtherCustomersOwn: Map<string, ICustomerFH[]> = new Map();
        try {
            const result: any = await this.ExecuteAndLog(
                FHFetcher.name,
                'buildFHOtherCustomersOwn',
                'Fetching other customers.',
                'Successfully fetched other customers.',
                {
                    entityName,
                },
                () => this.context.webAPI.retrieveMultipleRecords(entityName, fetchXml)
            );

            result.entities.forEach(entity => {
                const id = entity['FH.msfsi_financialholdingid'];
                const customer: ICustomerFH = this.extractFHCustomer(entity);
                const populatedEntity = fhOtherCustomersOwn.get(id) || [];
                populatedEntity.push(customer);
                fhOtherCustomersOwn.set(id, populatedEntity);
            });

            this.loggerService.logInfo(FHFetcher.name, 'buildFHOtherCustomersOwn', 'Built other customer array.', {
                'array length': fhOtherCustomersOwn.size,
            });
            return fhOtherCustomersOwn;
        } catch (e) {
            this.loggerService.logError(
                FHFetcher.name,
                'buildFHOtherCustomersOwn',
                'Failed to build other customers array.',
                FSIErrorTypes.ServerError,
                e,
                {
                    entityName,
                }
            );
            throw e;
        }
    }

    public async fetchFHData(contactId: string, fetchFI = true, categoryId?: string): Promise<FHData> {
        try {
            const hideShowEntities = categoryId ? buildHiddenFHByCategory(categoryId) : buildHiddenFinancialHoldings(this.context);
            return this.executeFHQueries(contactId, fetchFI, hideShowEntities);
        } catch (err) {
            this.loggerService.logError(FHFetcher.name, 'fetchFHData', 'Failed fetch FH data.', FSIErrorTypes.ServerError, err, {
                contactId,
            });
            throw err;
        }
    }

    public async fetchFHRelatedCustomers(fhId: string): Promise<ICustomerFH[]> {
        const fetchRelatedCustomerQuery = fhRelatedCustomersQuery(fhId);

        try {
            return await this.buildRelatedCustomerArray('msfsi_financialholding', '?fetchXml=' + encodeURIComponent(fetchRelatedCustomerQuery));
        } catch (err) {
            this.loggerService.logError(
                FHFetcher.name,
                'fetchFHRelatedCustomers',
                'Failed fetch related customers data.',
                FSIErrorTypes.ServerError,
                err,
                {
                    fhId,
                }
            );
            throw err;
        }
    }

    public async fetchFHOtherCustomersOwn(contactId: string): Promise<Map<string, ICustomerFH[]>> {
        const fetchFHOtherCustomersOwn = fhOtherCustomerQuery(contactId);
        try {
            return await this.buildFHOtherCustomersOwn('msfsi_customerfinancialholding', '?fetchXml=' + encodeURIComponent(fetchFHOtherCustomersOwn));
        } catch (err) {
            this.loggerService.logError(FHFetcher.name, 'fetchFHOtherCustomersOwn', 'Failed fetch other customers data.', FSIErrorTypes.ServerError, err, {
                contactId,
            });
            throw err;
        }
    }

    public async fetchFHMetadata(): Promise<FHMetadata> {
        try {
            const metadataList: any = await this.ExecuteAndLog(
                FHFetcher.name,
                'fetchFHMetadata',
                'Fetching FH metadata.',
                'Successfully fetched FH metadata.',
                undefined,
                () => this.utils.getEntitiesMetadata(fhEntityToAttributes)
            );
            return metadataList.reduce((mergedMetadata, md) => {
                const table = md.LogicalName;
                const mapper = fhEntityToMapper[table];

                if (!mapper) {
                    return mergedMetadata;
                }
                return {
                    ...mergedMetadata,
                    ...mapper(md.Attributes),
                    types: mergeFHTypesOptionSet(md.Attributes, mergedMetadata),
                };
            }, {} as Partial<FHMetadata>) as FHMetadata;
        } catch (err) {
            this.loggerService.logError(FHFetcher.name, 'fetchFHMetadata', 'Failed fetch FH metadata.', FSIErrorTypes.ServerError, err);
            throw err;
        }
    }

    public async fetchFHById(fhId: string): Promise<IndictableFH> {
        const fhResponse: any = await this.ExecuteAndLog(
            FHFetcher.name,
            'executeFHById',
            'Fetching FH.',
            'Successfully fetched FH by ID',
            undefined,
            () => this.context.webAPI.retrieveMultipleRecords('msfsi_financialholding', '?fetchXml=' + encodeURIComponent(fetchFHByIdQuery({ fhId })))
        );
        const mappedFHWithoutLink = createFinancialHolding(fhResponse.entities[0]);
        const fhResponseWithLinked: any = await this.ExecuteAndLog(
            FHFetcher.name,
            'executeFHById with linked category',
            'Fetching FH with linked category.',
            'Successfully fetched FH by ID with linked category',
            undefined,
            () =>
                this.context.webAPI.retrieveMultipleRecords(
                    'msfsi_financialholding',
                    '?fetchXml=' + encodeURIComponent(fetchFHByIdQuery({ fhId, fhCategory: mappedFHWithoutLink.category }))
                )
        );

        const mappedFHWithLink = createFinancialHolding(fhResponseWithLinked.entities[0]);
        const fhCategoryEntity = createFHCategory(fhResponseWithLinked.entities[0]);

        return { ...mappedFHWithLink, fhCategoryEntity, indicator: [] };
    }

    public async fetchFinancialProducts(fhId: string): Promise<IFinancialProduct[]> {
        const response: any = await this.ExecuteAndLog(
            FHFetcher.name,
            'executeFinancialProductsById',
            'Fetching Financial Products.',
            'Successfully fetched Financial Products by Financial holding ID',
            undefined,
            () =>
                this.context.webAPI.retrieveMultipleRecords(
                    'msfsi_financialholdinginstrument',
                    '?fetchXml=' + encodeURIComponent(fetchFinancialProductsByFHId({ fhId }))
                )
        );

        return response.entities.map(createFinancialProduct).filter(entity => entity.fipStatecode === 0);
    }
}
