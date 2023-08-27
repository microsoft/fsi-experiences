import { instance as XrmProxyInstance } from "../../Utilities/XrmProxy";
var Navigation = (function () {
    function Navigation(customControlProperties) {
        this._customControlProperties = customControlProperties;
        if (customControlProperties.manifest && customControlProperties.manifest.Properties.DataSetDefinitions !== null) {
            for (var dataSetKey in customControlProperties.manifest.Properties.DataSetDefinitions) {
                if (customControlProperties.manifest.Properties.DataSetDefinitions[dataSetKey].Primary) {
                    this._paramKey = dataSetKey;
                }
            }
        }
    }
    Navigation.prototype.updateBag = function (customControlProperties) {
        this._customControlProperties = customControlProperties;
    };
    Navigation.prototype.openEditForm = function (entityReference, processId, processInstanceId, selectedStageId, isCrossEntityNavigate) {
        var pageId = this._customControlProperties.id;
        if (processId) {
            this._customControlProperties.propBagMethods.navigation.openEditForm(entityReference, processId, processInstanceId, selectedStageId, isCrossEntityNavigate, pageId);
        }
        else {
            var entityName = entityReference.entityName || entityReference.LogicalName;
            var entityReferenceId = entityReference.id || (entityReference.Id && entityReference.Id.toString());
            var recordSetQueryKey = this._getRecordSetQueryFromProps(this._paramKey);
            XrmProxyInstance.openForm({
                entityName: entityName,
                entityId: entityReferenceId,
                recordSetQueryKey: recordSetQueryKey,
                processInstanceId: processInstanceId,
                selectedStageId: selectedStageId,
                isCrossEntityNavigate: isCrossEntityNavigate,
            }, null, pageId);
        }
    };
    Navigation.prototype.openGridPage = function (entityTypeName, viewId, showChart, visualizationId, filterExpression) {
        this._customControlProperties.propBagMethods.navigation.openGridPage(entityTypeName, viewId, showChart, null, visualizationId, filterExpression, null, null, this._customControlProperties.id);
    };
    Navigation.prototype.openGrid = function (entityTypeName, viewId, showChart, visualizationType, visualizationId, filterExpression, chartDrillDownParameters, viewType) {
        this._customControlProperties.propBagMethods.navigation.openGridPage(entityTypeName, viewId, showChart, visualizationType, visualizationId, filterExpression, chartDrillDownParameters, viewType, this._customControlProperties.id);
    };
    Navigation.prototype.openDashboard = function (id) {
        this._customControlProperties.propBagMethods.navigation.openDashboard(id, this._customControlProperties.id);
    };
    Navigation.prototype.openCreateForm = function (logicalName, initialValues, createFromEntity) {
        this._customControlProperties.propBagMethods.navigation.openCreateForm(logicalName, initialValues, createFromEntity, this._customControlProperties.id);
    };
    Navigation.prototype.openForm = function (options, parameters) {
        options.recordSetQueryKey = this._getRecordSetQueryFromProps(this._paramKey);
        if (this._customControlProperties.parentDefinedControlProps &&
            this._customControlProperties.parentDefinedControlProps.propertyBagOverrides &&
            this._customControlProperties.parentDefinedControlProps.propertyBagOverrides.openForm) {
            return this._customControlProperties.parentDefinedControlProps.propertyBagOverrides.openForm(options, parameters);
        }
        return XrmProxyInstance.openForm(options, parameters, this._customControlProperties.id);
    };
    Navigation.prototype.openSearch = function (query) {
        this._customControlProperties.propBagMethods.navigation.openSearch(query, this._customControlProperties.id);
    };
    Navigation.prototype.openPowerBIFullScreenPage = function (powerBIEmbedUrl, powerBIGroupId, powerBIDashboardId, powerBITileId, powerBIReportId, powerBIReportUrl, powerBIComponentTypeCode) {
        this._customControlProperties.propBagMethods.navigation.openPowerBIFullScreenPage(powerBIEmbedUrl, powerBIGroupId, powerBIDashboardId, powerBITileId, powerBIReportId, powerBIReportUrl, powerBIComponentTypeCode, this._customControlProperties.id);
    };
    Navigation.prototype.openUrl = function (url, options) {
        XrmProxyInstance.openUrl(url, options, this._customControlProperties.id);
    };
    Navigation.prototype.openUrlWithProtocol = function (url, protocol) {
        this._customControlProperties.propBagMethods.navigation.openUrlWithProtocol(url, protocol, this._customControlProperties.id);
    };
    Navigation.prototype.openPhoneNumber = function (phoneNumber, useForm, passedEtn, passedId, passedName, executeGlobalHandler) {
        var etn = passedEtn || this._customControlProperties.propBagData.modeData.entityTypeName;
        var id = passedId || this._customControlProperties.propBagData.modeData.entityId;
        var name = passedName || this._customControlProperties.propBagData.modeData.entityRecordName;
        var reg_etn;
        var reg_id;
        var reg_name;
        if (this._customControlProperties.formInfo && this._customControlProperties.formInfo.ParentFormInfo) {
            reg_etn = this._customControlProperties.formInfo.ParentFormInfo.EntityName;
            reg_id = this._customControlProperties.formInfo.ParentFormInfo.RecordId;
            reg_name = this._customControlProperties.formInfo.ParentFormInfo.RecordName;
        }
        var controlLogicalName = this._customControlProperties.descriptor
            ? this._customControlProperties.descriptor.parentFieldSectionItem
            : this._customControlProperties.descriptor.Id;
        this._customControlProperties.propBagMethods.navigation.openPhoneNumber(phoneNumber, etn, id, name, reg_etn, reg_id, reg_name, controlLogicalName, this._customControlProperties.contextToken, useForm, executeGlobalHandler, this._customControlProperties.id);
    };
    Navigation.prototype.openMaps = function (address) {
        this._customControlProperties.propBagMethods.navigation.openMaps(address, this._customControlProperties.id);
    };
    Navigation.prototype.openMap = function (address) {
        this._customControlProperties.propBagMethods.navigation.openMap(address, this._customControlProperties.id);
    };
    Navigation.prototype.openAlertDialog = function (alertStrings, options) {
        return XrmProxyInstance.openAlertDialog(alertStrings, options, this._customControlProperties.id);
    };
    Navigation.prototype.openConfirmDialog = function (confirmStrings, options) {
        return XrmProxyInstance.openConfirmDialog(confirmStrings, options, this._customControlProperties.id);
    };
    Navigation.prototype.openErrorDialog = function (options) {
        return XrmProxyInstance.openErrorDialog(options, this._customControlProperties.id);
    };
    Navigation.prototype.openDialog = function (name, options, parameters) {
        return XrmProxyInstance.openDialog(name, options, parameters, this._customControlProperties.id);
    };
    Navigation.prototype.openFile = function (file, options) {
        return XrmProxyInstance.openFile(file, options, this._customControlProperties.id);
    };
    Navigation.prototype.openTaskFlow = function (name, options, parameters) {
        return XrmProxyInstance.openTaskFlow(name, options, parameters, this._customControlProperties.id);
    };
    Navigation.prototype.openWebResource = function (name, options, data) {
        XrmProxyInstance.openWebResource(name, options, data, this._customControlProperties.id);
    };
    Navigation.prototype.navigateTo = function (input, options) {
        return XrmProxyInstance.navigateTo(input, options, this._customControlProperties.id);
    };
    Navigation.prototype._getRecordSetQueryFromProps = function (paramKey) {
        var params = paramKey && this._customControlProperties.dynamicData
            ? this._customControlProperties.dynamicData.parameters[paramKey]
            : null;
        return this._customControlProperties.actions &&
            this._customControlProperties.actions.getRecordSetQueryKey &&
            params !== null
            ? this._customControlProperties.actions.getRecordSetQueryKey(params)
            : null;
    };
    return Navigation;
}());
export { Navigation };
