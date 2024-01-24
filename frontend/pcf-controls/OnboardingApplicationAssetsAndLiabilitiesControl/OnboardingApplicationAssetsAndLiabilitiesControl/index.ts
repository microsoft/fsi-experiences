/* eslint-disable @typescript-eslint/ban-ts-comment */
import { destroy, getReactElement, init, loadImages } from '@fsi/pcf-common/dist/life-cycle';
import React from 'react';
import AssetsAndLiabilitiesGridContainer from './container/AssetsAndLiabilitiesGridContainer';
import AssetsAndLiabilitiesWidgetContainer from './container/AssetsAndLiabilitiesWidgetContainer';
import { IInputs, IOutputs } from './generated/ManifestTypes';

const componentEnumToComponent = {
    '0': AssetsAndLiabilitiesGridContainer,
    '1': AssetsAndLiabilitiesWidgetContainer,
};
// @ts-ignore
export class OnboardingApplicationAssetsAndLiabilitiesControl implements VirtualControl<IInputs, IOutputs> {
    private _notifyOutputChanged: () => void;
    private _container: HTMLDivElement;
    private _context;

    /**
     * Empty constructor.
     */
    constructor() {}
    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context, notifyOutputChanged: () => void, state, container: HTMLDivElement): void {
        init(context, 'MicrosoftPCF.OnboardingApplicationAssetsAndLiabilitiesControl');
        loadImages(context, ['emptyState48', 'emptyState100', 'emptyState', 'error', 'error48', 'error100']);

        this._context = context;
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context): React.ReactElement {
        const selectedComponent = this.getComponent(this._context.parameters?.component);
        return getReactElement(selectedComponent, { context });
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    public getComponent(componentEnum: ComponentFramework.PropertyTypes.EnumProperty<string>) {
        return componentEnumToComponent[componentEnum?.raw];
    }

    public destroy(): void {
        destroy(this._container);
    }
}
