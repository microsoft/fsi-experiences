var Theming = (function () {
    function Theming(customControlProperties) {
        this._themingData = customControlProperties.propBagData.themingData;
        this.useUpdatedDesignSystem = !!this._themingData.shouldUseDesignSystem;
        this.normalfontcolor = this._themingData.defaultThemingData.normalfontcolor;
        this.normalfontfamily = this._themingData.defaultThemingData.normalfontfamily;
        this.normalfontsize = this._themingData.defaultThemingData.normalfontsize;
        this.solidborderstyle = this._themingData.defaultThemingData.solidborderstyle;
        this.noneborderstyle = this._themingData.defaultThemingData.noneborderstyle;
        this.colors = this._themingData.defaultThemingData.colors;
        this.textbox = this._themingData.defaultThemingData.textbox;
        this.spacings = this._themingData.defaultThemingData.spacings;
        this.fontfamilies = this._themingData.defaultThemingData.fontfamilies;
        this.fontsizes = this._themingData.defaultThemingData.fontsizes;
        this.breakpoints = this._themingData.defaultThemingData.breakpoints;
        this.measures = this._themingData.defaultThemingData.measures;
        this.lookup = this._themingData.defaultThemingData.lookup;
        this.borders = this._themingData.defaultThemingData.borders;
        this.shadows = this._themingData.defaultThemingData.shadows;
        this.buttons = this._themingData.defaultThemingData.buttons;
    }
    Theming.prototype.getEntityColor = function (entityLogicalName) {
        return this._themingData.getEntityColor ? this._themingData.getEntityColor(entityLogicalName) : "";
    };
    Theming.prototype.disableUiTransitions = function () { };
    Theming.prototype.rightAlignEdit = function () { };
    Theming.prototype.inlineLayout = function () { };
    return Theming;
}());
export { Theming };
