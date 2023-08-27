import * as React from "react";
import { ICustomControlHostOwnProps, ICustomControlHostProps, ICustomControlHostWrapperProps, IHostData } from "../Models/CustomControlDataInterfaces";
import { CommandingWrapper } from "../Models/CommandingWrapper";
import { CustomControlMemoizationHelper } from "./Helpers/CustomControlMemoizationHelper";
declare class VirtualComponentTranslator {
    static renderVirtualComponent(component: CustomControlInterfaces.IVirtualComponent, props: ICustomControlHostProps, hostData: IHostData, memHelper: CustomControlMemoizationHelper, purgeMemHelper?: boolean): JSX.Element;
    static generateJSXElement(elementType: string, props?: any, children?: React.ReactChild | React.ReactChild[], ownProps?: ICustomControlHostProps, hostData?: IHostData, complexKeeper?: (key: string, cw: CommandingWrapper) => void, ancestralOnClick?: any): JSX.Element;
    static generateReactComponent(component: CustomControlInterfaces.IVirtualComponent, parentKey: string, defaultKey: string, props: ICustomControlHostProps, hostData: IHostData, memHelper: CustomControlMemoizationHelper, flyoutParent: string, ancestralOnClick: boolean, children?: React.ReactChild | React.ReactChild[]): JSX.Element;
    static generateComplexControl(component: CustomControlInterfaces.IVirtualComponent, props: ICustomControlHostProps, hostData: IHostData, flyoutParent: string, idIndex: number): JSX.Element;
    static generateComplexControlProps(component: CustomControlInterfaces.IVirtualComponent, props: ICustomControlHostProps, hostData: IHostData, flyoutParent: string, idIndex: number): {
        controlId: string;
        props: ICustomControlHostOwnProps;
        dataSetHostProps: ICustomControlHostWrapperProps;
    };
    static generateReactChildren(parentKey: string, virtualComponents: CustomControlInterfaces.VirtualComponentChild | CustomControlInterfaces.VirtualComponentChild[], props: ICustomControlHostProps, hostData: IHostData, memHelper: CustomControlMemoizationHelper, flyoutKey: string, ancestralOnClick: boolean): React.ReactChild | React.ReactChild[];
    static isComplexComponent(virtualComponent: CustomControlInterfaces.IVirtualComponent): boolean;
}
export { VirtualComponentTranslator };
