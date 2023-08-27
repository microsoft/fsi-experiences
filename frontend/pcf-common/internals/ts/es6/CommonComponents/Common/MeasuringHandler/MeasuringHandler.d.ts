import * as React from "react";
import { IMeasuringHandler } from "./IMeasuringHandler";
import { IMeasuringHandlerContext } from "./IMeasuringHandlerContext";
import { IMeasuringSubscriber } from "./IMeasuringSubscriber";
declare class MeasuringHandler implements IMeasuringHandler {
    private _previousDimensions;
    private _subscribers;
    private _groupIdBySubscriber;
    private _pendingSubscribers;
    private _pendingUpdates;
    private _schedule;
    static getInstance(): MeasuringHandler;
    setSchedulingFunction(schedule: () => void): void;
    addMeasuringSubscribers(subscriber: IMeasuringSubscriber): void;
    updateMeasuringSubscribers(subscriber: IMeasuringSubscriber): void;
    removeMeasuringSubscribers(subscriber: IMeasuringSubscriber): void;
    scheduleMeasuringUpdate(): void;
    flushPendingMeasuringNotifications(requestedGroupId?: string): number;
    takeMeasurements(requestedGroupId?: string): void;
}
declare const MeasuringHandlerContext: React.Context<IMeasuringHandlerContext>;
export { MeasuringHandler, MeasuringHandlerContext };
