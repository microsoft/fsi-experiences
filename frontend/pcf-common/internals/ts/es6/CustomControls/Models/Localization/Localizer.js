var Localizer = (function () {
    function Localizer() {
    }
    Localizer.prototype.initWithProvider = function (provider) {
        if (!instance._localizationProvider) {
            instance._localizationProvider = provider;
            return true;
        }
        return false;
    };
    Localizer.prototype.getLocalizedString = function (key, params) {
        var localizedString = this._localizationProvider
            ? this._localizationProvider.getLocalizedString(key, params)
            : "";
        if (localizedString && localizedString.length > 0) {
            return localizedString;
        }
        return "";
    };
    return Localizer;
}());
var instance = new Localizer();
export { Localizer, instance };
