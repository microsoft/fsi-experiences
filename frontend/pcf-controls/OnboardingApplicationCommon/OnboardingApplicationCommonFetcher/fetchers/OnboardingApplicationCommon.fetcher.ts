import { IOnboardingApplicationCommonFetcher } from '@fsi/onboarding-application/interfaces/IOnboardingApplicationCommonFetcher';
import { CommonPCFContext } from '@fsi/pcf-common/common-props';
import { PCFBaseExecuteWebAPI } from '@fsi/pcf-common/data-layer/base/PCFBaseExecuteWebAPI';
import { FSIErrorTypes, ILoggerService, default as logger, default as loggerService } from '@fsi/core-components/dist/context/telemetry';
import { DEFAULT_SCENARIO } from './OnboardingApplicationCommon.const';
import {
    fetchActiveBPFStageQuery,
    fetchActiveStageNameQuery,
    fetchBPFNameQuery,
    fetchBusinessScenarioQuery,
    getContractsCount,
} from './OnboardingApplicationCommon.query';

export class OnboardingApplicationCommonFetcher extends PCFBaseExecuteWebAPI implements IOnboardingApplicationCommonFetcher {
    public constructor(context: CommonPCFContext, protected logger: ILoggerService) {
        super(context, logger);
    }

    public async getApplicantsCount(applicationId: string) {
        const encodedFetchXml = encodeURIComponent(getContractsCount(applicationId));

        try {
            const result = await this.context.webAPI.retrieveMultipleRecords('msfsi_application', `?fetchXml=${encodedFetchXml}`);
            return result.entities?.length;
        } catch (e) {
            this.logger.logError(
                OnboardingApplicationCommonFetcher.name,
                'get Contracts Info ',
                'An error occurred while retrieving Contracts list',
                FSIErrorTypes.ServerError,
                e
            );
            return Promise.reject(e);
        }
    }

    public async fetchBusinessScenarioFromAppSettings() {
        try {
            const encodedFetchXml = encodeURIComponent(fetchBusinessScenarioQuery(this.context.page.appId));
            const result = await this.context.webAPI.retrieveMultipleRecords('appsetting', `?fetchXml=${encodedFetchXml}`);
            return result.entities?.[0]?.value === DEFAULT_SCENARIO ? undefined : result.entities?.[0]?.value;
        } catch (e) {
            this.loggerService.logError(
                OnboardingApplicationCommonFetcher.name,
                'fetchBusinessScenario',
                'An error occurred getting business scenario from app settings',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    public async fetchBPFName() {
        try {
            const businessScenario = await this.fetchBusinessScenarioFromAppSettings();
            if (businessScenario) {
                const encodedFetchXml = encodeURIComponent(fetchBPFNameQuery(businessScenario));
                const result = await this.context.webAPI.retrieveMultipleRecords('workflow', `?fetchXml=${encodedFetchXml}`);
                return result.entities?.[0]?.uniquename;
            }
        } catch (e) {
            this.loggerService.logError(
                OnboardingApplicationCommonFetcher.name,
                'fetchBPFName',
                'An error occurred getting BPF name',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    public async fetchActiveBPFStage(bpfName: string) {
        try {
            const encodedFetchXml = encodeURIComponent(fetchActiveBPFStageQuery(bpfName, this.context.parameters.applicationId?.raw));
            const result = await this.context.webAPI.retrieveMultipleRecords(bpfName, `?fetchXml=${encodedFetchXml}`);
            return result.entities?.[0]?.activestage;
        } catch (e) {
            this.loggerService.logError(
                OnboardingApplicationCommonFetcher.name,
                'fetchBPFName',
                'An error occurred getting BPF stage ID',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    public async fetchActiveStageName(bpfStage: string) {
        try {
            const encodedFetchXml = encodeURIComponent(fetchActiveStageNameQuery(bpfStage));
            const result = await this.context.webAPI.retrieveMultipleRecords('processstage', `?fetchXml=${encodedFetchXml}`);
            return result.entities?.[0]?.stagename;
        } catch (e) {
            this.loggerService.logError(
                OnboardingApplicationCommonFetcher.name,
                'fetchBPFName',
                'An error occurred getting BPF stage name',
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }
}
