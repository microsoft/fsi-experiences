import * as React from "react";
import { ITextStyle } from "../Primitive/Text";
import { IViewStyle } from "../Primitive/IViewStyle";
interface ITooltipProps {
    text?: string;
    width?: number;
    tooltipStyle?: IViewStyle;
    tooltipContentStyle?: ITextStyle;
    id?: string;
    accessibilityHidden?: boolean;
    direction?: "left" | "right" | "top" | "bottom";
}
interface ITooltipState {
    isOpened: boolean;
}
declare class Tooltip extends React.Component<ITooltipProps, ITooltipState> {
    private _targetElement;
    constructor(props: ITooltipProps);
    generateTooltipStyle(): IViewStyle;
    generateTooltipContentStyle(): ITextStyle;
    generatePopup(): JSX.Element;
    generatePopupArrow(): JSX.Element;
    mouseEnterHandler(event: React.MouseEvent): void;
    mouseLeaveHandler(event: React.MouseEvent): void;
    setTargetRef(view: any): void;
    render(): JSX.Element;
}
export { ITooltipProps, ITooltipState, Tooltip };
