import { IDefaultThemingDataColors, IDefaultThemingDataTextBox, IDefaultThemingDataSpacings, IDefaultThemingDataFontFamilies, IDefaultThemingDataFontSizes, IDefaultThemingDataBreakpoints, IDefaultThemingDataMeasures, IDefaultThemingDataLookup, IDefaultThemingDataBorders, IDefaultThemingDataShadows, IDefaultThemingDataButtons, ICustomControlHostProps } from "./../CustomControlDataInterfaces";
import * as CustomControlBagInterfaces from "./../CustomControlExposedInterfaces";
export declare class Theming implements CustomControlBagInterfaces.IThemingBag {
    private _themingData;
    normalfontcolor: string;
    normalfontfamily: string;
    normalfontsize: string;
    solidborderstyle: string;
    noneborderstyle: string;
    colors: IDefaultThemingDataColors;
    textbox: IDefaultThemingDataTextBox;
    spacings: IDefaultThemingDataSpacings;
    fontfamilies: IDefaultThemingDataFontFamilies;
    fontsizes: IDefaultThemingDataFontSizes;
    breakpoints: IDefaultThemingDataBreakpoints;
    measures: IDefaultThemingDataMeasures;
    lookup: IDefaultThemingDataLookup;
    borders: IDefaultThemingDataBorders;
    shadows: IDefaultThemingDataShadows;
    buttons: IDefaultThemingDataButtons;
    useUpdatedDesignSystem: boolean;
    constructor(customControlProperties: ICustomControlHostProps);
    getEntityColor(entityLogicalName: string): string;
    disableUiTransitions(): void;
    rightAlignEdit(): void;
    inlineLayout(): void;
}
