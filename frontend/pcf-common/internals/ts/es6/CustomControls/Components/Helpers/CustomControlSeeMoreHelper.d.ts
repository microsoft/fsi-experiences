/// <reference types="react" />
import { ICustomControlAnimationProps } from "./Animation/ICustomControlAnimationProps";
import { SeeMoreStatus } from "./Animation/CustomControlAnimationHelper";
declare class CustomControlSeeMoreHelper {
    private _seeMorePopupInfo;
    private _seeMorePopupStatus;
    private _seeMorePopupAnimDiv;
    private _seeMoreTimeoutHelper;
    private _animFadeInReference;
    private _animEndReference;
    private _seeMorefocusModal;
    private _seeMorePopUpCallBack;
    private _seeMoreCallback;
    private _parentDomId;
    private _environmentMargin;
    shouldGivePoppedOutDimensions: any;
    constructor(parentDomId?: string);
    destroy(): void;
    getSeeMorePopupInfo(): ICustomControlAnimationProps;
    getSeeMorePopupStatus(): SeeMoreStatus;
    private _shouldGivePoppedOutDimensions;
    private _calculateEnvironmentMargin;
    seeMorePopup(component: HTMLElement, seeMoreCallback: (skipUpdateIfVirtual: boolean) => void, value: boolean, autosize?: boolean, isRTL?: boolean, zIndex?: number, rootElement?: HTMLElement): void;
    private _getPopupDiv;
    private _getCloseElement;
    checkOnPopupStatus(isVirtual: boolean, isCompositing: boolean, component: HTMLElement): void;
    private _modalTrapFocus;
    private _seeMoreFadeIn;
    private _controlTabScope;
    private _seeMoreEnd;
    renderSpacer(isVirtual?: boolean, isCompositing?: boolean): JSX.Element;
    renderCloseButton(closeCallback: () => void, isVirtual?: boolean, isCompositing?: boolean, isRTL?: boolean, useUnicodeIcon?: boolean): JSX.Element;
}
export { CustomControlSeeMoreHelper };
