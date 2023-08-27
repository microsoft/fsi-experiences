import { IPosition } from "./IPosition";
import { ISize } from "./ISize";
import { FlyoutDirection } from "./FlyoutDirection";
interface FlyoutCalculatedInformation {
    Position: IPosition;
    Direction: FlyoutDirection;
}
declare function getDocumentViewportOffset(): IPosition;
declare function getDocumentContentSize(): ISize;
declare function getElementFullSize(element: HTMLElement): ISize;
declare function calculateClipping(position: IPosition, size: ISize, documentSize?: ISize, documentOffset?: IPosition): ISize;
declare function calculateMaximumSize(position: IPosition, documentSize?: ISize, documentOffset?: IPosition): ISize;
declare function isOutOfRange(flyoutNode: HTMLElement, container: HTMLElement): boolean;
declare function calculateFlyoutPreferredPosition(size: ISize, preferredDirection: FlyoutDirection, anchorElement?: HTMLElement, secondaryPreferred?: FlyoutDirection): FlyoutCalculatedInformation;
declare function calculateFlyoutPosition(size: ISize, flyoutDirection: FlyoutDirection, anchorElement?: HTMLElement): IPosition;
declare function isScrollable(element: HTMLElement): boolean;
declare function getScrollableAncestors(element: HTMLElement, topParent: HTMLElement): HTMLElement[];
export { FlyoutCalculatedInformation, calculateFlyoutPosition, calculateFlyoutPreferredPosition, calculateClipping, calculateMaximumSize, isScrollable, isOutOfRange, getScrollableAncestors, getDocumentViewportOffset, getElementFullSize, getDocumentContentSize, };
