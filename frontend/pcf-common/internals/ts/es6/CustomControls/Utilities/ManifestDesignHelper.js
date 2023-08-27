import { DEFAULT_FLUENT_DL } from "../Models/PropertyFallbacks/Design/DefaultDesignLanguage";
var ManifestDesignHelper = (function () {
    function ManifestDesignHelper() {
        this._map = {};
    }
    ManifestDesignHelper.prototype.GetThemeData = function (manifest, base) {
        if (!base) {
            base = DEFAULT_FLUENT_DL;
        }
        var theme = base;
        var name = manifest.ConstructorName + "-" + theme.DesignLanguageId + "-" + theme.ThemeId;
        if (this._map.hasOwnProperty(name)) {
            return this._map[name];
        }
        var newMap = {
            DesignLanguageId: theme.DesignLanguageId || "FluentVNextTheme",
            ThemeId: theme.ThemeId || "WebBasic",
        };
        if (!manifest.DesignMap || !manifest.DesignMap.DesignMap)
            return Object.assign(newMap, base);
        for (var key in manifest.DesignMap.DesignMap) {
            var value = manifest.DesignMap.DesignMap[key];
            var mapping = value.split(".");
            var newValue = theme;
            for (var i = 0; i < mapping.length; i++) {
                if (newValue) {
                    newValue = newValue[mapping[i]];
                }
                else {
                    newValue = value;
                    break;
                }
            }
            newMap[key] = newValue || value;
        }
        this._map[name] = newMap;
        return newMap;
    };
    return ManifestDesignHelper;
}());
var instance = new ManifestDesignHelper();
export { ManifestDesignHelper, instance };
