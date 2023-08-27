var Resources = (function () {
    function Resources(customControlProperties) {
        this._manifest = customControlProperties.manifest;
        this._getResource = customControlProperties.actions.getResource;
        this._bagPropsResource = customControlProperties.propBagData.resourcesData;
    }
    Resources.prototype.getString = function (id) {
        return !id || !this._bagPropsResource || !this._bagPropsResource.strings[id]
            ? id
            : this._bagPropsResource.strings[id];
    };
    Resources.prototype.getResource = function (id, success, failure) {
        var resource = this._manifest.Properties.Resources.filter(function (res) {
            if (res) {
                return res.Name.endsWith(id);
            }
        })[0];
        if (resource) {
            this._getResource(resource).then(function (data) {
                success(data);
            }, function () {
                failure();
            });
        }
        else {
            failure();
        }
    };
    return Resources;
}());
export { Resources };
