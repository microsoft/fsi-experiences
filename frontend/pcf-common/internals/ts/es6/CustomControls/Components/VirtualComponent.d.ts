declare class VirtualComponent implements CustomControlInterfaces.IVirtualComponent {
    private _type;
    private _componentId;
    private _properties;
    private _children;
    IsVirtualComponent: boolean;
    constructor(type: string, componentId: string, properties: CustomControlInterfaces.IVirtualComponentProps, children: CustomControlInterfaces.VirtualComponentChild | CustomControlInterfaces.VirtualComponentChild[]);
    getVirtualRepresentation(additionalProps: CustomControlInterfaces.IVirtualComponentProps): CustomControlInterfaces.IVirtualComponent;
    getType(): string;
    getComponentId(): string;
    getProperties(): CustomControlInterfaces.IVirtualComponentProps;
    getChildren(): CustomControlInterfaces.VirtualComponentChild | CustomControlInterfaces.VirtualComponentChild[];
    setProperties(props: CustomControlInterfaces.IVirtualComponentProps): void;
    static createComponent(component: string | VirtualComponent | number | Function, props: {}, ...children: any[]): VirtualComponent;
}
export { VirtualComponent };
