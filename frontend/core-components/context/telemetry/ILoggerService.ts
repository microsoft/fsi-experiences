/* istanbul ignore file */

export type TelemetryAdditionalData = { [key: string]: any };

export enum FSIErrorTypes {
    NullReference = 1,
    ServerError = 2,
    InvalidParam = 3,
    GenericError = 4,
    TimeOut = 5,
    AsyncError = 6,
}

export enum TelemetryEventType {
    Action,
    Interaction,
}

export const createMethodName = (componentName: string, functionName: string): string => componentName + ' - ' + functionName;

export interface ILoggerService {
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
