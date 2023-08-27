import { CreateCommandManager } from "src/CustomControls/Models/CustomControlCommandingInterfaces";
import { ICustomControlHostOwnProps, ICustomControlHostWrapperProps, IThemeMap } from "src/CustomControls/Models/CustomControlDataInterfaces";
import { TrackWorkFunction } from "./CCFPerformanceTracker";
interface IProxyPerf {
    WorkBlockTracker: {
        trackWork: TrackWorkFunction;
    };
    PerformanceOutput: {
        createEvent: (name: string, zone: string) => any;
    };
}
interface IProxyCommand {
    createCommandManager?: CreateCommandManager;
}
interface IProxyPCFHelper {
    forkPCFTree: boolean;
    renderChildControl: (key: string, props: ICustomControlHostOwnProps, node: Element, uniqueId: string, hostWrapperProps?: ICustomControlHostWrapperProps) => void;
    rootPageId: string;
    DesignLanguageOverride?: IThemeMap;
    updateAlwaysRenderState?: (shouldAlwaysRender: boolean) => void;
}
interface IProxyRefs {
    PCF: IProxyPCFHelper;
    Performance: IProxyPerf;
    Commanding: IProxyCommand;
    Xrm: unknown;
}
declare class RootAppProxy {
    IsAvailable: boolean;
    get PCF(): IProxyPCFHelper;
    get Performance(): IProxyPerf;
    get Commanding(): IProxyCommand;
    private _proxy;
    private _alwaysRenderedControls;
    constructor();
    requestAlwaysRender(controlId: string, alwaysRenderState: boolean): void;
}
declare const instance: RootAppProxy;
export { RootAppProxy, instance, IProxyRefs };
