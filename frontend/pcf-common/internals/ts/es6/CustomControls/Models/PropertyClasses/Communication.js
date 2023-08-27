var Communication = (function () {
    function Communication(customControlProperties) {
        this.getPresenceMappedField = customControlProperties.actions.getPresenceMappedField;
        this.isPresenceEnabled = customControlProperties.actions.isPresenceEnabledEntity;
    }
    Communication.prototype.getPresenceMappedField = function (_entityName) {
        return null;
    };
    Communication.prototype.isPresenceEnabled = function (_entityName) {
        return null;
    };
    return Communication;
}());
export { Communication };
