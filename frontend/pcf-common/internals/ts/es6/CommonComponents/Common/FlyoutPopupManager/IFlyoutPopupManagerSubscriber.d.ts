declare enum FlyoutPopupManagerSubscriberType {
    Flyout = 1,
    Popup = 2
}
interface IFlyoutPopupManagerSubscriber {
    type: FlyoutPopupManagerSubscriberType;
    isRendered?: boolean;
    getComponent(): HTMLElement;
    onPointerDown?(e: Event): void;
    onScroll?(e: Event): void;
    isClickInsideSubscriber?(event: MouseEvent): boolean;
}
export { FlyoutPopupManagerSubscriberType, IFlyoutPopupManagerSubscriber };
