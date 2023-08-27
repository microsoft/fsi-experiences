/* eslint-disable no-empty */
import { TelemetryHelper as TelemetryService } from '@industry-solutions/pcf-telemetry-infra/TelemetryHelper';
import { IErrorHandler, errorTypes, TraceLevel, PerfTelemetryData } from '@industry-solutions/pcf-telemetry-infra/TelemetryConstants';
import {
    createMethodName,
    ILoggerService,
    FSIErrorTypes,
    TelemetryAdditionalData,
    TelemetryEventType,
} from '@fsi/core-components/dist/context/telemetry/ILoggerService';
import contextService from './ContextService';
export { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry/ILoggerService';
export { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

const FSIErrorToPCFError = {
    [FSIErrorTypes.AsyncError]: errorTypes.AsyncError,
    [FSIErrorTypes.GenericError]: errorTypes.GenericError,
    [FSIErrorTypes.InvalidParam]: errorTypes.InvalidParams,
    [FSIErrorTypes.NullReference]: errorTypes.InvalidParams,
    [FSIErrorTypes.ServerError]: errorTypes.DataLoadError,
    [FSIErrorTypes.TimeOut]: errorTypes.TimeOut,
};

const FSIEventTypeToPCFEvent = {
    [TelemetryEventType.Action]: 'Action',
    [TelemetryEventType.Interaction]: 'Interaction',
};

const errorTypeConversion = (errorType: FSIErrorTypes): errorTypes => {
    return FSIErrorToPCFError[errorType] || errorTypes.GenericError;
};

const telemetryEventTypeConversion = (eventType: TelemetryEventType): string => {
    return FSIEventTypeToPCFEvent[eventType];
};

export class LoggerService implements ILoggerService {
    private _pcfName?: string;
    private _featureName?: string;
    private _globalData: TelemetryAdditionalData = {};

    constructor() {}

    setPcfName(pcfName: string, featureName?: string) {
        this._pcfName = pcfName;
        this._featureName = featureName;
    }

    setGlobalData(globalData: TelemetryAdditionalData) {
        this._globalData = globalData;
    }

    public logInfo(componentName: string, functionName: string, traceMessage: string, additionalData?: TelemetryAdditionalData) {
        try {
            const additionalTelemetryData = { ...additionalData, ...this._globalData };
            TelemetryService.logInfo(
                this._pcfName || '',
                createMethodName(componentName, functionName),
                TraceLevel.Info,
                traceMessage,
                undefined,
                additionalTelemetryData
            );
        } catch (e) {}
    }

    public logError(
        componentName: string,
        functionName: string,
        errorMessage: string,
        errorType: FSIErrorTypes,
        error?: any,
        additionalData?: TelemetryAdditionalData
    ) {
        try {
            const additionalTelemetryData = { ...additionalData, ...this._globalData };
            const errorObj: IErrorHandler = TelemetryService.generateErrorObject(
                error || new Error(errorMessage),
                createMethodName(componentName, functionName),
                errorTypeConversion(errorType)
            );
            TelemetryService.logInfo(
                this._pcfName || '',
                createMethodName(componentName, functionName),
                TraceLevel.Error,
                errorMessage,
                errorObj,
                additionalTelemetryData
            );
        } catch (e) {}
    }

    public logImpression({ componentName }: { componentName: string }): void {
        try {
            const additionalData = this.createInsightsAdditionalData();

            TelemetryService.logInfo(
                this._pcfName || '',
                createMethodName(componentName, 'init'),
                TraceLevel.Info,
                'Component loaded',
                undefined,
                additionalData
            );
        } catch (e) {}
    }

    public logInteractionOrAction({
        uniqueName,
        eventType = TelemetryEventType.Interaction,
    }: {
        uniqueName: string;
        eventType?: TelemetryEventType;
    }) {
        try {
            const additionalData = this.createInsightsAdditionalData();
            const additionalTelemetryData = {
                eventType: telemetryEventTypeConversion(eventType),
                uniqueName,
                feature: this._featureName || this._pcfName,
                ...additionalData,
            };

            const interactionOrActionString = (eventType == TelemetryEventType.Interaction ? 'Interaction' : 'Action') + ' has occured';
            TelemetryService.logInfo(
                this._pcfName || '',
                createMethodName(this._pcfName || '', interactionOrActionString),
                TraceLevel.Info,
                interactionOrActionString,
                undefined,
                additionalTelemetryData
            );
        } catch (e) {}
    }

    public logStartPerfTime(componentName: string, functionName: string): () => void {
        try {
            const perfObj = TelemetryService.setPerfStart(this._pcfName || '', createMethodName(componentName, functionName));
            return () => this.logStopPerfTime(perfObj);
        } catch (e) {
            return () => {};
        }
    }

    private logStopPerfTime(perfData: PerfTelemetryData) {
        try {
            TelemetryService.setPerfStop(perfData);
        } catch (e) {}
    }

    private createInsightsAdditionalData(): { orgId: string; applicationId: string; user: string } {
        const context = contextService.geContext();
        return {
            orgId: context?.client?.orgSettings?.organizationId || '',
            applicationId: context?.page?.appId || '',
            user: context?.userSettings?.userId || '',
        };
    }
}

const loggerService = new LoggerService();

export default loggerService;
