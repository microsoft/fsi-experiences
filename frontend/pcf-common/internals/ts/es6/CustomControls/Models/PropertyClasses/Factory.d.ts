import { ICustomControlHostProps, IExternalUtils } from "./../CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
import { VirtualComponent } from "../../Components/VirtualComponent";
import { Dictionary } from "../../Utilities/Dictionary";
export declare class Factory implements CustomControlBagInterfaces.IFactory {
    private _customControlProperties;
    private _externalUtils;
    constructor(customControlProperties: ICustomControlHostProps, externalUtils: IExternalUtils);
    createElement(type: CustomControlBagInterfaces.PrimitiveControls, properties: CustomControlInterfaces.IVirtualComponentProps, children?: any): CustomControlInterfaces.IVirtualComponent;
    createComponent(type: string, id: string, properties: CustomControlInterfaces.IVirtualComponentProps): CustomControlInterfaces.IVirtualComponent;
    bindDOMElement(virtualComponent: VirtualComponent, DOMNode: Element): void;
    bindDOMComponent(virtualComponent: VirtualComponent, DOMNode: Element): void;
    createFileObject(file: File): ControlAndClientApiInterfaces.FileObject;
    fireEvent(eventName: string, params: any): void;
    getControlDefaultMapping(dataType: string, attributes?: CustomControlInterfaces.ICustomControlAttributes): string;
    getPopupService(): CustomControlBagInterfaces.IPopupService;
    requestRender(callback?: () => void): void;
    unbindDOMComponent(componentId: string): boolean;
    updateComponent(id: string, props: Dictionary): void;
}
