import { IMeasuringSubscriber } from "./IMeasuringSubscriber";
interface IMeasuringHandler {
    addMeasuringSubscribers(subscriber: IMeasuringSubscriber): void;
    removeMeasuringSubscribers(subscriber: IMeasuringSubscriber): void;
    scheduleMeasuringUpdate(): void;
    setSchedulingFunction(schedule: () => void): void;
    flushPendingMeasuringNotifications(groupId?: string): number;
    takeMeasurements(groupId?: string): void;
}
export { IMeasuringHandler };
