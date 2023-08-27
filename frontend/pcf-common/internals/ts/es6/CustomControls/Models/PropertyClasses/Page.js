var Page = (function () {
    function Page(customControlProperties, externalUtils) {
        this.updateBag(customControlProperties);
        this.getClientUrl = function () {
            return externalUtils.xrmProxy.Page.getClientUrl();
        };
    }
    Page.prototype.updateBag = function (customControlProperties) {
        var pageData = customControlProperties.propBagData.pageData;
        var modeData = customControlProperties.propBagData.modeData;
        this.appId = pageData.appId;
        this.entityTypeName = modeData.entityTypeName;
        this.entityId = modeData.entityId;
        this.isPageReadOnly = pageData.isPageReadOnly;
    };
    return Page;
}());
export { Page };
