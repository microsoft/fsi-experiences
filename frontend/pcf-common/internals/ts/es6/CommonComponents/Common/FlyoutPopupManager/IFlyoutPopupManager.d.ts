import { IFlyoutPopupManagerSubscriber } from "./IFlyoutPopupManagerSubscriber";
interface IFlyoutPopupManager {
    subscribers: IFlyoutPopupManagerSubscriber[];
    addSubscribers(subscriber: IFlyoutPopupManagerSubscriber): void;
    removeSubscribers(subscriber: IFlyoutPopupManagerSubscriber): void;
    fireEvent(event: MouseEvent): void;
}
export { IFlyoutPopupManager };
