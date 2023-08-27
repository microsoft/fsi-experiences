import { IThemeMap } from "../Models/CustomControlDataInterfaces";
import { IDesignBag, IFluentDesignBag } from "../Models/CustomControlExposedInterfaces";
import { ColorTokens } from "@fluentui/react-components";
declare class ManifestDesignHelper {
    private _map;
    GetThemeData(manifest: CustomControlInterfaces.ICustomControlManifest, base: IThemeMap | ColorTokens): IDesignBag | IFluentDesignBag;
}
declare const instance: ManifestDesignHelper;
export { ManifestDesignHelper, instance };
