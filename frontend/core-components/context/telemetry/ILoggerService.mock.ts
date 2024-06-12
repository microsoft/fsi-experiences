/* istanbul ignore file */
import { ILoggerService } from './ILoggerService';
import { TelemetryEventType, FSIErrorTypes } from './Logger.const';

export class LoggerServiceMock implements ILoggerService {
    private _logsArray: string[] = [];

    constructor() {}
    setPcfName(pcfName: string, featureName?: string): void {
    }

    public logInteractionOrAction({ uniqueName, eventType }: { uniqueName: string; eventType?: TelemetryEventType }): void {
        this._logsArray.push(eventType + '_' + uniqueName);
    }

    public logImpression({ componentName }: { componentName: string }): void {
        this._logsArray.push(componentName);
    }

    setGlobalData(globalData: Object) { }

    public logInfo(componentName: string, functionName: string, traceMessage: string, additionalData?: any) {
        this._logsArray.push(traceMessage);
    }

    public logError(componentName: string, functionName: string, errorMessage: string, errorType: FSIErrorTypes, error?: any, additionalData?: any) {
        this._logsArray.push(errorMessage);
    }

    public logStartPerfTime(componentName: string, functionName: string) {
        return () => { };
    }

    public dumpTraces(): string[] {
        const tracesToReturn = this._logsArray;
        this._logsArray = [];
        return tracesToReturn;
    }
}

const loggerServiceMock = new LoggerServiceMock();

export default loggerServiceMock;
