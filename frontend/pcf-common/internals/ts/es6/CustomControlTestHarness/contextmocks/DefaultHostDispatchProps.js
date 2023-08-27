/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */
import { DefaultDispatchPropsActions } from "./DefaultHostDispatchPropsActions";
/* eslint-disable @typescript-eslint/no-unused-vars */
// Default IUtilsDispatch method implementation
export var DefaultUtilsDispatch = {
    setState: function (state) {
        console.debug("Invoked method setState()");
        return false;
    },
    logMessage: function (customControlName, message, logType) {
        console.debug("Invoked method logMessage()");
    },
};
// Default INavigationDispatch method implementation
export var DefaultNavigationDispatch = {
    openEditForm: function (entityReference, processId, processInstanceId, selectedStageId, isCrossEntityNavigate, pageId) {
        console.debug("Invoked method openEditForm()");
    },
    openGridPage: function (entityTypeName, viewId, showChart, visualizationType, visualizationId, filterExpression, chartDrillDownParameters, viewType, pageId) {
        console.debug("Invoked method openGridPage()");
    },
    openDashboard: function (id, pageId) {
        console.debug("Invoked method openDashboard()");
    },
    openCreateForm: function (logicalName, initialValues, createFromEntity, pageId) {
        console.debug("Invoked method openCreateForm()");
    },
    openSearch: function (query, pageId) {
        console.debug("Invoked method openSearch()");
    },
    openPowerBIFullScreenPage: function (powerBIEmbedUrl, powerBIGroupId, powerBIDashboardId, powerBITileId, powerBIReportId, powerBIReportUrl, powerBIComponentTypeCode, pageId) {
        console.debug("Invoked method openPowerBIFullScreenPage()");
    },
    openUrl: function (url, options, pageId) {
        console.debug("Invoked method openUrl()");
    },
    openUrlWithProtocol: function (url, protocol, pageId) {
        console.debug("Invoked method openUrlWithProtocol()");
    },
    openPhoneNumber: function (phoneNumber, etn, id, name, reg_etn, reg_id, reg_name, controlLogicalName, contextToken, openFormOnEnd, executeGlobalHandler, pageId) {
        console.debug("Invoked method openPhoneNumber()");
    },
    openMaps: function (address) {
        console.debug("Invoked method openMaps()");
    },
    openMap: function (address, pageId) {
        console.debug("Invoked method openMap()");
    },
};
// Default IDeviceDispatch method implementation
export var DefaultDeviceDispatch = {
    isGetBarcodeValueOperationAvailable: function () {
        return false;
    },
    isTakePictureOperationAvailable: function () {
        return false;
    },
    isCaptureVideoOperationAvailable: function () {
        return false;
    },
    isCaptureAudioOperationAvailable: function () {
        return false;
    },
    isOpenARViewerAvailable: function () {
        return false;
    },
};
// Default IModeDispatch method implementation
export var DefaultModeDispatch = {
    setNotification: function (message, id, pageId, controlName, contextToken, entityTypeName, entityId) {
        console.debug("Invoked method setNotification()");
        return false;
    },
    clearNotification: function (pageId, controlName, contextToken, entityTypeName, entityId, id) {
        console.debug("Invoked method clearNotification()");
        return false;
    },
};
// Default ICustomControlHostDispatchProps method implementation
export var DefaultHostDispatchProps = {
    propBagMethods: {
        utils: DefaultUtilsDispatch,
        navigation: DefaultNavigationDispatch,
        device: DefaultDeviceDispatch,
        mode: DefaultModeDispatch,
    },
    actions: DefaultDispatchPropsActions,
};
/* eslint-enable @typescript-eslint/no-unused-vars */
//# sourceMappingURL=DefaultHostDispatchProps.js.map