/**
 * @license Copyright (c) Microsoft Corporation. All rights reserved.
 */
import { InitializeXrm, MockXrmProxy } from "./DefaultXrmProxy";
import { DefaultCustomControlHostDispatchProps } from "./DefaultCustomControlHostDispatchProps";
import { DefaultCustomControlHostStateProps } from "./DefaultCustomHostStateProps";
import { DefaultCustomControlDescriptor, DefaultCustomControlHostOwnProps } from "./DefaultCustomControlHostOwnProps";
import { SimpleFormatter } from "../../CustomControls/Models/PropertyFallbacks/Formatting/SimpleFormatters";
export function GenerateDefaultCustomControlProps(configuration, manifest, descriptor, dynamicData) {
    if (descriptor === void 0) { descriptor = DefaultCustomControlDescriptor; }
    if (dynamicData === void 0) { dynamicData = null; }
    var dispatchProps = DefaultCustomControlHostDispatchProps;
    var stateProps = DefaultCustomControlHostStateProps;
    stateProps.manifest = manifest;
    stateProps.dynamicData = dynamicData;
    var ownProps = DefaultCustomControlHostOwnProps;
    ownProps.configuration = configuration;
    descriptor && (ownProps.descriptor = descriptor);
    return Object.assign(dispatchProps, stateProps, ownProps);
}
window.PCFUtilities = {};
window.PCFUtilities.GenerateDefaultCustomControlProps = GenerateDefaultCustomControlProps;
window.PCFUtilities.InitializeMockXrmProxy = InitializeXrm;
window.PCFUtilities.Defaults = {};
window.PCFUtilities.Defaults.ControlDescriptor = DefaultCustomControlDescriptor;
window.PCFUtilities.Defaults.Formatter = SimpleFormatter;
window.PCFUtilities.Defaults.XrmObject = MockXrmProxy;
//# sourceMappingURL=DefaultMockExports.js.map