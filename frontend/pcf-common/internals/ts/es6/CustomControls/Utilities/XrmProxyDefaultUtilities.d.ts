export declare function getTimeZoneOffsetMinutes(date: Date): number;
export declare function getClientState(): string;
export declare function getClient(): string;
export declare function getFormFactor(): number;
export declare function openURL(url: string): void;
export declare function openAlertDialog(strings: ControlAndClientApiInterfaces.AlertDialogStrings, _options?: any, _pageId?: string): Promise<ControlAndClientApiInterfaces.AlertDialogResponse>;
export declare function openErrorDialog(strings: ControlAndClientApiInterfaces.ErrorDialogOptions, _options?: any, _pageId?: string): Promise<ControlAndClientApiInterfaces.ErrorDialogResponse>;
export declare function openConfirmDialog(strings: ControlAndClientApiInterfaces.ConfirmDialogStrings, _options?: any, _pageId?: string): Promise<ControlAndClientApiInterfaces.ConfirmDialogResponse>;
