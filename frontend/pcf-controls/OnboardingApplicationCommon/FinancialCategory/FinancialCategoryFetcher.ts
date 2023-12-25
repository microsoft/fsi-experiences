/* eslint-disable no-useless-catch */
import { FINANCIAL_CATEGORY_TYPES, IFinancialCategory, IFinancialType } from '@fsi/onboarding-application/interfaces/IFinancialCategory';
import { IFinancialCategoryFetcher } from '@fsi/onboarding-application/interfaces/IFinancialCategoryFetcher';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import { ApplicantFetcher } from '../Applicant';
import { FinancialCategoriesMetadata, FinancialCategory, FinancialCategoryMetadata, OnboardingFinancialMetadata } from './FinancialCategory.query';
import {
    ApplicationEntityName,
    FinancialCategoriesOptionSet,
    OnboardingFinancialTypeEntityName,
    PartyContractEntityName,
    PartyContractMetadata,
} from './FinancialCategoryFetcher.const';

export class FinancialCategoryFetcher extends ApplicantFetcher implements IFinancialCategoryFetcher {
    private categoryMetadata: FinancialCategoryMetadata;

    public constructor(context: CommonPCFContext, category: FinancialCategory, protected logger: ILoggerService) {
        super(context, logger);
        this.categoryMetadata = FinancialCategoriesMetadata[category];
    }

    public async computeEntityData(item: IFinancialCategory, isAdd = false): Promise<Object> {
        const entity = {
            [this.categoryMetadata.value]:
                this.categoryMetadata.alias === FINANCIAL_CATEGORY_TYPES.LIABILITY ? -1 * Math.abs(item.value || 0) : item.value,
            msfsi_name: item.name,
            msfsi_description: item.description,
            [`${this.categoryMetadata.type}@odata.bind`]: `/msfsi_onboardingfinancialtypes(${item.type})`,
        };

        if (isAdd) {
            const applicationParty = await this.getApplicationParty();

            if (applicationParty.applicationId) {
                entity[`${ApplicationEntityName}@odata.bind`] = `/${ApplicationEntityName.toLowerCase()}s(${applicationParty.applicationId})`;
            }

            if (this.categoryMetadata.alias === FINANCIAL_CATEGORY_TYPES.INCOME || this.categoryMetadata.alias === FINANCIAL_CATEGORY_TYPES.EXPENSE) {
                entity[`msfsi_relatedparty@odata.bind`] = `/${PartyContractEntityName.toLowerCase()}s(${item.customerId})`;
            }
        }

        return entity;
    }

    private async getFinancialCategoryFetchXML(financialCategory: IFinancialType): Promise<string> {
        const businessScenarioValue = (await this.getApplicationParty()).businessScenario;
        return encodeURIComponent(OnboardingFinancialMetadata.fetchXML(businessScenarioValue, FinancialCategoriesOptionSet[financialCategory]));
    }

    public async getFinancialCategoriesTypes(financialCategory: IFinancialType): Promise<{ key: number; text: string }[]> {
        try {
            const encodedFetchXml = await this.getFinancialCategoryFetchXML(financialCategory);
            const result = await this.context.webAPI.retrieveMultipleRecords(OnboardingFinancialTypeEntityName, `?fetchXml=${encodedFetchXml}`);
            return result.entities?.map(entity => ({ key: entity['id'], text: entity['name'] }));
        } catch (error) {
            this.logger.logError(
                FinancialCategoryFetcher.name,
                'getFinancialCategoryTypes',
                `An error occurred while retrieving financial category types: ${OnboardingFinancialMetadata.alias}`,
                FSIErrorTypes.ServerError,
                error
            );
            return [];
        }
    }

    public async getItems(): Promise<IFinancialCategory[]> {
        const applicantInfo = await this.getApplicationParty();
        const encodedFetchXml = encodeURIComponent(this.categoryMetadata.fetchXML(applicantInfo.applicationId));
        try {
            const result = await this.context.webAPI.retrieveMultipleRecords(PartyContractEntityName, `?fetchXml=${encodedFetchXml}`);

            return result.entities.reduce((values: IFinancialCategory[], entity: any) => {
                if (!entity || entity.value === null || entity.value === undefined) {
                    return values;
                }

                const customerId = entity[PartyContractMetadata.id];
                const value = {
                    customerId,
                    name: entity.name,
                    description: entity.description,
                    value: entity.value,
                    type: entity.type,
                    typeFormattedValue: entity[`type@OData.Community.Display.V1.FormattedValue`],
                    currencyId: entity.currencyId,
                    id: entity.id,
                };
                return [...values, value];
            }, []);
        } catch (error) {
            this.logger.logError(
                FinancialCategoryFetcher.name,
                'getItems',
                `An error occurred retrieving items of category: ${this.categoryMetadata.alias}`,
                FSIErrorTypes.ServerError,
                error
            );
            return Promise.reject(error);
        }
    }

    public async addItem(item: IFinancialCategory): Promise<IFinancialCategory> {
        try {
            const createIntersectionEntity =
                this.categoryMetadata.alias === FINANCIAL_CATEGORY_TYPES.ASSET || this.categoryMetadata.alias === FINANCIAL_CATEGORY_TYPES.LIABILITY
                    ? (financialItemEntity: Object): Object => {
                          const HOLDING_ROLE_TYPE_OWNER = 104800000;
                          return {
                              'msfsi_relatedparty@odata.bind': `/msfsi_relatedpartycontracts(${item.customerId})`,
                              [this.categoryMetadata.alias === FINANCIAL_CATEGORY_TYPES.ASSET
                                  ? 'msfsi_applicationasset'
                                  : 'msfsi_applicationliability']: financialItemEntity,
                              msfsi_name: item.name,
                              msfsi_holdingrole: HOLDING_ROLE_TYPE_OWNER,
                          };
                      }
                    : null;
            const entity = await this.computeEntityData(item, true);
            const intersectionEntity = createIntersectionEntity && createIntersectionEntity(entity);
            const entityType = intersectionEntity
                ? (FinancialCategoriesMetadata[this.categoryMetadata.alias].connectedContactEntity as string)
                : this.categoryMetadata.entity;
            const result = await this.webAPI.createRecord(entityType, intersectionEntity || entity);

            return {
                ...item,
                ...result,
            };
        } catch (error) {
            this.logger.logError(
                FinancialCategoryFetcher.name,
                'addItem',
                `An error occurred adding item of category: ${this.categoryMetadata.alias}`,
                FSIErrorTypes.ServerError,
                error
            );
            return Promise.reject(error);
        }
    }

    public async updateItem(item: IFinancialCategory): Promise<boolean> {
        try {
            const updatedEntity = await this.computeEntityData(item);
            await this.webAPI.updateRecord(this.categoryMetadata.entity, item.id, updatedEntity);
            return true;
        } catch (error) {
            this.logger.logError(
                FinancialCategoryFetcher.name,
                'updateItem',
                `An error occurred updating item of category: ${this.categoryMetadata.alias}`,
                FSIErrorTypes.ServerError,
                error
            );
            return Promise.reject(error);
        }
    }

    public async deleteItem(id: string): Promise<boolean> {
        try {
            await this.webAPI.deleteRecord(this.categoryMetadata.entity, id);
        } catch (error) {
            this.logger.logError(
                FinancialCategoryFetcher.name,
                'deleteItem',
                `An error occurred deleting item of category: ${this.categoryMetadata.alias}`,
                FSIErrorTypes.ServerError,
                error
            );
            return false;
        }

        return true;
    }
}
