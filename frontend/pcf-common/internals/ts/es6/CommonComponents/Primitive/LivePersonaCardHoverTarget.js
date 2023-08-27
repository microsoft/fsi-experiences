var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import * as ReactFela from "react-fela";
import { ComponentBase } from "./ComponentBase";
import { rules } from "./FelaConnectHelper";
import { instance as XrmProxy } from "../../CustomControls/Utilities/XrmProxy";
import { ClientContext } from "../../CustomControls/Utilities/Contexts";
var SELECT_EMAIL_ADDRESS_CONTACT = "?$select=emailaddress1";
var SELECT_EMAIL_ADDRESS_USER = "?$select=internalemailaddress,azureactivedirectoryobjectid";
var CCF_TELEMETRY_EVENT = "uci_controlframework_usage";
var LivePersonaCardInitializationState;
(function (LivePersonaCardInitializationState) {
    LivePersonaCardInitializationState["NotInitialized"] = "NotInitialized";
    LivePersonaCardInitializationState["Initializing"] = "Initializing";
    LivePersonaCardInitializationState["Initialized"] = "Initialized";
    LivePersonaCardInitializationState["Failed"] = "Failed";
})(LivePersonaCardInitializationState || (LivePersonaCardInitializationState = {}));
var InnerLivePersonaCardHoverTarget = (function (_super) {
    __extends(InnerLivePersonaCardHoverTarget, _super);
    function InnerLivePersonaCardHoverTarget(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.state = {
            identifiers: null,
            hasDataLoaded: false,
        };
        _this._isLivePersonCardLibAvailable = _this._isLivePersonCardLibAvailable.bind(_this);
        _this._openCard = _this._openCard.bind(_this);
        return _this;
    }
    InnerLivePersonaCardHoverTarget.prototype.getElementProps = function () {
        var props = {
            accessibilityLabel: this.props.accessibilityLabel,
            displayName: this.props.displayName,
            emailAddress: this.props.emailAddress,
            entityReference: this.props.entityReference,
            personaType: this.props.personaType,
            recordId: this.props.recordId,
            registerOpenCardCallback: this.props.registerOpenCardCallback,
        };
        return props;
    };
    InnerLivePersonaCardHoverTarget.prototype.componentDidMount = function () {
        if (this.props.registerOpenCardCallback) {
            this.props.registerOpenCardCallback(this._openCard);
        }
        if (this.props.registerHasLivePersonaCardLoadedCallback) {
            this.props.registerHasLivePersonaCardLoadedCallback(this._isLivePersonCardLibAvailable);
        }
    };
    InnerLivePersonaCardHoverTarget.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.recordId !== this.props.recordId) {
            this.setState({
                identifiers: null,
                hasDataLoaded: false,
            });
            this._getRecordData();
        }
    };
    InnerLivePersonaCardHoverTarget.prototype.render = function () {
        var children = this.getElementChildren();
        if (this._isLivePersonCardLibAvailable() && this.state.hasDataLoaded) {
            var LivePersonaCardHoverTargetV2 = window.LivePersonaCardHoverTargetV2;
            if (LivePersonaCardHoverTargetV2) {
                var _a = this.props, id = _a.id, renderAsPresentational = _a.renderAsPresentational, style = _a.style;
                return (React.createElement(LivePersonaCardHoverTargetV2, { cardParameters: this._makeLivePersonaCardParameters(), tabIndex: "-1" }, React.createElement("span", { id: id, style: style, role: renderAsPresentational ? "presentation" : undefined }, children)));
            }
        }
        else if (this._isLivePersonCardLibAvailable() && !this.state.hasDataLoaded) {
            this._getRecordData();
        }
        return children;
    };
    InnerLivePersonaCardHoverTarget.prototype._makeLivePersonaCardParameters = function () {
        var _this = this;
        var identifiers = this.state.identifiers || {};
        var hostAppId = this._getHostAppId();
        var _a = this.props, accessibilityLabel = _a.accessibilityLabel, displayName = _a.displayName, personaType = _a.personaType, _b = _a.renderAsPresentational, renderAsPresentational = _b === void 0 ? false : _b;
        return {
            personaInfo: {
                identifiers: {
                    HostAppPersonaId: hostAppId,
                    Smtp: identifiers.smtp,
                    AadObjectId: identifiers.aadObjectId,
                    PersonaType: personaType,
                },
                displayName: displayName,
            },
            behavior: {
                onCardOpen: function () { return _this._reportCardUsage("Card Opened"); },
                onCardClose: function () { return _this._reportCardUsage("Card Closed"); },
                disableClick: renderAsPresentational,
            },
            ariaLabel: renderAsPresentational ? undefined : accessibilityLabel,
            disableAccessibilityDefaults: renderAsPresentational,
        };
    };
    InnerLivePersonaCardHoverTarget.prototype._openCard = function () {
        if (this._isLivePersonCardLibAvailable() &&
            this.state.hasDataLoaded &&
            window.LPC &&
            window.LPC.openCard) {
            var returnFocusId = this.props.onKeyDownContainerId;
            if (returnFocusId) {
                var returnFocusElem = document.getElementById(returnFocusId);
                if (returnFocusElem) {
                    var cardParams = this._makeLivePersonaCardParameters();
                    window.LPC.openCard(returnFocusElem, cardParams);
                }
            }
        }
    };
    InnerLivePersonaCardHoverTarget.prototype._getHostAppId = function () {
        return this.props.entityReference.LogicalName + ":" + this.props.recordId;
    };
    InnerLivePersonaCardHoverTarget.prototype._getRecordData = function () {
        var _this = this;
        if (!this.state.hasDataLoaded) {
            var logicalName_1 = this.props.entityReference.LogicalName;
            try {
                XrmProxy.retrieveRecord(logicalName_1, this.props.recordId, this._getQueryOptions(logicalName_1))
                    .then(function (recordData) {
                    var identifiers = _this._getLpcIdentifiers(recordData, logicalName_1);
                    if (identifiers) {
                        _this.setState({
                            identifiers: identifiers,
                            hasDataLoaded: true,
                        });
                    }
                })
                    .catch(function () {
                    XrmProxy.Diagnostics.traceError("LivePersonaHoverTarget", "Failed to fetch record data.");
                });
            }
            catch (ex) {
                XrmProxy.Diagnostics.traceError("LivePersonaHoverTarget", "Failed to fetch record data: " + ex);
            }
        }
    };
    InnerLivePersonaCardHoverTarget.prototype._getQueryOptions = function (logicalName) {
        switch (logicalName) {
            case "contact":
                return SELECT_EMAIL_ADDRESS_CONTACT;
            case "systemuser":
                return SELECT_EMAIL_ADDRESS_USER;
        }
        return "";
    };
    InnerLivePersonaCardHoverTarget.prototype._getLpcIdentifiers = function (recordData, logicalName) {
        switch (logicalName) {
            case "contact":
                return {
                    smtp: recordData.emailaddress1,
                };
            case "systemuser":
                return {
                    smtp: recordData.internalemailaddress,
                    aadObjectId: recordData.azureactivedirectoryobjectid,
                };
        }
        return null;
    };
    InnerLivePersonaCardHoverTarget.prototype._isLivePersonCardLibAvailable = function () {
        var lpcState = this.context ? this.context.lpcInitializationState : undefined;
        return lpcState
            ? lpcState === LivePersonaCardInitializationState.Initialized
            : false;
    };
    InnerLivePersonaCardHoverTarget.prototype._reportCardUsage = function (action) {
        var actionType = {
            name: "EventContext",
            value: action,
        };
        var controlName = {
            name: "ControlName",
            value: "LivePersonaHoverTarget",
        };
        var eventParameters = [actionType, controlName];
        var usageEvent = {
            eventName: CCF_TELEMETRY_EVENT,
            eventParameters: eventParameters,
        };
        XrmProxy.Reporting.reportEvent(usageEvent);
    };
    InnerLivePersonaCardHoverTarget.displayName = "LivePersonaCardHoverTarget";
    return InnerLivePersonaCardHoverTarget;
}(ComponentBase));
InnerLivePersonaCardHoverTarget.contextType = ClientContext;
var LivePersonaCardHoverTarget = ReactFela.connect(rules)(InnerLivePersonaCardHoverTarget);
export { LivePersonaCardInitializationState, LivePersonaCardHoverTarget };
