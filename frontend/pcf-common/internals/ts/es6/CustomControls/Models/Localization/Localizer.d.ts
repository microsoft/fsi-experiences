import { LocalizationProvider } from "./CustomControlLocalizationInterfaces";
declare class Localizer {
    private _localizationProvider;
    initWithProvider(provider: LocalizationProvider): boolean;
    getLocalizedString(key: string, params: any[]): string;
}
declare const instance: Localizer;
export { Localizer, instance };
