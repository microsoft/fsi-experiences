import { ICustomControlHostProps } from "./../CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
import { IDeclareFeatures, IFeatureSupport } from "../PropertyInfrastructure/IFeatureSupport";
export declare class Device implements CustomControlBagInterfaces.IDevice, IDeclareFeatures {
    private _bagProps;
    constructor(customControlProperties: ICustomControlHostProps);
    captureImage(options?: ControlAndClientApiInterfaces.CaptureImageOptions): Promise<ControlAndClientApiInterfaces.FileObject>;
    captureAudio(options?: ControlAndClientApiInterfaces.CaptureAudioOptions): Promise<ControlAndClientApiInterfaces.FileObject>;
    captureVideo(options?: ControlAndClientApiInterfaces.CaptureVideoOptions): Promise<ControlAndClientApiInterfaces.FileObject>;
    pickFile(options?: ControlAndClientApiInterfaces.PickFileOptions): Promise<ControlAndClientApiInterfaces.FileObject[]>;
    getBarcodeValue(): Promise<string>;
    getCurrentPosition(): Promise<ControlAndClientApiInterfaces.Position>;
    isGetBarcodeValueOperationAvailable(): boolean;
    isTakePictureOperationAvailable(): boolean;
    isCaptureVideoOperationAvailable(): boolean;
    isCaptureAudioOperationAvailable(): boolean;
    isOpenARViewerAvailable(): boolean;
    openARViewer(options: ControlAndClientApiInterfaces.ARViewerOptions): Promise<string>;
    getDeclaredFeatures(): IFeatureSupport;
    getFeatureClassName(): string;
}
