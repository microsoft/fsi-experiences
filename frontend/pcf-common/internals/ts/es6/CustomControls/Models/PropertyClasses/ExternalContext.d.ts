export declare class ExternalContext implements ControlAndClientApiInterfaces.ExternalContext {
    getAvailableExternalContexts(): Collection.ItemCollection<ControlAndClientApiInterfaces.ExternalContextDescriptor>;
    getExternalContextProperty(externalContextId: string, externalContextPropertyId: string, options?: ControlAndClientApiInterfaces.ExternalContextPropertyOptions): Promise<ControlAndClientApiInterfaces.ExternalContextSuccessResponse>;
    invokeExternalContextAction(externalContextId: string, externalContextActionId: string, options?: ControlAndClientApiInterfaces.ExternalContextActionOptions): Promise<ControlAndClientApiInterfaces.ExternalContextSuccessResponse>;
    removeExternalContextPropertyListener(externalContextId: string, externalContextPropertyId: string, listener: ControlAndClientApiInterfaces.ExternalContextPropertyListener): void;
}
