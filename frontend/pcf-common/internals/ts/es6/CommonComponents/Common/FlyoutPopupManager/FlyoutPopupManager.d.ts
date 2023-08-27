import { IFlyoutPopupManager } from "./IFlyoutPopupManager";
import { IFlyoutPopupManagerSubscriber } from "./IFlyoutPopupManagerSubscriber";
declare class FlyoutPopupManager implements IFlyoutPopupManager {
    static get pointerDownEvent(): string;
    static get scrollEvent(): string;
    private _subscribers;
    private _nextSubscriberId;
    private _addSubscribersQueue;
    constructor();
    static getInstance(): FlyoutPopupManager;
    get subscribers(): IFlyoutPopupManagerSubscriber[];
    addSubscribers(subscriber: IFlyoutPopupManagerSubscriber): void;
    removeSubscribers(subscriber: IFlyoutPopupManagerSubscriber): void;
    fireEvent(event: MouseEvent): void;
}
export { FlyoutPopupManager };
