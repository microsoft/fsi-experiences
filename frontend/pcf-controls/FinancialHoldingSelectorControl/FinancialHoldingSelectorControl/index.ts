/* eslint-disable @typescript-eslint/ban-ts-comment */
/*global ComponentFramework*/
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { FinancialHoldingSelectorContainer } from './container/FinancialHoldingSelectorContainer';
import { destroy, init, updateView, loadImages } from '@fsi/pcf-common/life-cycle';
import { FSIControls } from '@fsi/pcf-common/constants/FSIControls.const';

// @ts-ignore
export class FinancialHoldingSelectorControl implements StandardControl<IInputs, IOutputs> {
    // Power Apps component framework delegate which will be assigned to this object which would be called whenever any update happens.
    private _container: HTMLDivElement;
    private _context;

    private selectedFinancialHolding: ComponentFramework.LookupValue;
    private onChange: (guid: string) => void;

    constructor() {}

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(context, notifyOutputChanged: () => void, state, container: HTMLDivElement) {
        this._context = context;
        this._container = container;
        this.onChange = (guid: string) => {
            this.selectedFinancialHolding = {
                id: guid,
                entityType: 'msfsi_financialholding',
            };
            notifyOutputChanged();
        };
        init(context, FSIControls.FinancialHoldingSelector);
        loadImages(context, ['emptyState48', 'emptyState100', 'emptyState', 'error', 'error48', 'error100', 'no_access100']);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context) {
        if (this.updateViewGotNoIdButWeHoldIdInState()) {
            this.onChange(this.selectedFinancialHolding.id);
        }

        updateView(this._container, FinancialHoldingSelectorContainer, { context: context, onChangeLookup: this.onChange });
    }

    private updateViewGotNoIdButWeHoldIdInState() {
        //which means that the placeholder will not be submitted and will be undefined.
        return !this._context.parameters?.selectedFinancialHolding?.raw[0]?.id && this.selectedFinancialHolding;
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { selectedFinancialHolding: [this.selectedFinancialHolding] };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        destroy(this._container);
    }
}
