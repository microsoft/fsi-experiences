import { ICustomControlHostProps } from "./../CustomControlDataInterfaces";
import { IAccessibility, AccessibilityInternalData } from "./../CustomControlExposedInterfaces";
export declare class Accessibility implements IAccessibility {
    private _customControlProperties;
    accessibilityInternalData: AccessibilityInternalData;
    isHighContrastEnabled: boolean;
    assignedTabIndex: number;
    assignedTooltip: string;
    constructor(customControlProperties: ICustomControlHostProps);
    registerShortcut(keyCombination: number[], shortcutHandler: (event: KeyboardEvent) => void, isGlobal: boolean, areaName: string, shortcutDescription: string, srcElementId?: string): void;
    getUniqueId(id: string): string;
    focusElementById(id: string, isAbsoluteId?: boolean): void;
    blurElementById(id: string, isAbsoluteId?: boolean): void;
}
