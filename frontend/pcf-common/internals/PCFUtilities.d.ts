// Copyright (C) Microsoft Corporation. All rights reserved.

// -----------------------------------------
// Type definitions for the Control Harness
// -----------------------------------------
import {
	IDynamicData,
	ICustomControlHostProps,
	IXrmProxy,
	IXrmObject,
} from "./ts/es6/CustomControls/Models/CustomControlDataInterfaces";

export = PCFUtilities;
export as namespace PCFUtilities;

declare namespace PCFUtilities {
	function GenerateDefaultCustomControlProps(
		configuration: CustomControlInterfaces.ICustomControlConfiguration,
		manifest: CustomControlInterfaces.ICustomControlManifest,
		descriptor?: CustomControlInterfaces.ICustomControlDescriptor,
		dynamicData?: IDynamicData,
		controlId?: string
	): ICustomControlHostProps;

	function InitializeMockXrmProxy(xrmProxy?: IXrmProxy, xrmObject?: IXrmObject): void;
}
