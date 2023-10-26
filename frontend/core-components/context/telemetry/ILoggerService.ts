/* istanbul ignore file */

import { TelemetryAdditionalData, TelemetryEventType, FSIErrorTypes } from './Logger.const';

export const createMethodName = (componentName: string, functionName: string): string => componentName + ' - ' + functionName;

export interface ILoggerService {
    setPcfName(pcfName: string, featureName?: string): void;
    setGlobalData(globalData: Object): void;
    logInfo(componentName: string, functionName: string, traceMessage: string, additionalData?: TelemetryAdditionalData): void;
    logError(
        componentName: string,
        functionName: string,
        errorMessage: string,
        errorType: FSIErrorTypes,
        error?: any,
        additionalData?: TelemetryAdditionalData
    ): void;
    logStartPerfTime(componentName: string, functionName: string): () => void;
    logInteractionOrAction({ uniqueName, eventType }: { uniqueName: string; eventType?: TelemetryEventType }): void;
    logImpression({ componentName }: { componentName: string }): void;
}
