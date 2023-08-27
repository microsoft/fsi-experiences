declare type UsageCounter = {
    success: number;
    failure: number;
};
declare type UsageCounters = Record<string, UsageCounter>;
export declare class TelemetryUsageCounter {
    private _counters;
    private _controlName;
    constructor(controlName: string);
    makeBuilder<TObject>(): TelemetryUsageCounterBuilder<TObject>;
    reportUsageCounters(eventName: string): void;
}
export declare class TelemetryUsageCounterBuilder<TObject> {
    private _obj;
    private _counters;
    private _receiver;
    private _nestedProperties;
    constructor(counters: UsageCounters);
    withProperties(obj: Record<string, unknown>): this;
    withNestedProperties(name: string & keyof TObject, nestedObj: unknown): this;
    withProperty(name: string & keyof TObject, value: unknown): this;
    withReceiver(receiver: unknown): this;
    build(): TObject;
    private _buildInternal;
}
export {};
