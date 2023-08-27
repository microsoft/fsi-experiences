import { modifyDeclaredFunctions } from "../../Utilities/FeatureDeclaration";
var PropertyBagFactory = (function () {
    function PropertyBagFactory(customControlProperties, externalUtils, hostData) {
        this._customControlProperties = customControlProperties;
        this._externalUtils = externalUtils;
        this._hostData = hostData;
    }
    PropertyBagFactory.prototype.getInstance = function (instance) {
        var newInstance = new instance(this._customControlProperties, this._externalUtils, this._hostData);
        if (newInstance instanceof Object &&
            newInstance.getDeclaredFeatures !== undefined) {
            this._modifyDeclaredFunctions(newInstance);
        }
        return newInstance;
    };
    PropertyBagFactory.prototype._modifyDeclaredFunctions = function (instance) {
        modifyDeclaredFunctions(instance, this._customControlProperties.manifest);
    };
    return PropertyBagFactory;
}());
export { PropertyBagFactory };
