import { IInputs, IOutputs } from './generated/ManifestTypes';
import { updateView, destroy, loadImages, init } from '@fsi/pcf-common/life-cycle';
import CustomerSummaryContainer from './container/CustomerSummaryContainer';
import { CustomerSnapshotContainer } from '@fsi/pcf-common/containers/CustomerSnapshot/CustomerSnapshotContainer';
import { LifeEventsContainer } from './container/LifeEventsContainer';
import { IPropBag, StandardControl } from 'CustomControls/Models/CustomControlExposedInterfaces';
import { MicrosoftCloudforFinancialServices as FSIControls } from '@industry-solutions/pcf-telemetry-infra/BaseConstants';
import { BankingCardsContainer } from './container/BankingCardsContainer';
import { MainHouseholdContainer } from './container/MainHouseholdContainer';
import { FHSummaryContainer } from './container/FHSummaryContainer';

const componentEnumToComponent = {
    '0': CustomerSummaryContainer,
    '1': CustomerSnapshotContainer,
    '2': LifeEventsContainer,
    '3': FHSummaryContainer,
    '4': BankingCardsContainer,
    '5': MainHouseholdContainer,
};

const componentEnumToName = {
    '0': 'CustomerSummary',
    '1': 'CustomerSnapshot',
    '2': 'LifeEvents',
    '3': 'FinancialHoldingSummary',
    '4': 'BankingCard',
    '5': 'MainHousehold',
};
export class CustomerSummaryControl implements StandardControl<IInputs, IOutputs> {
    // Power Apps component framework delegate which will be assigned to this object which would be called whenever any update happens.
    private _notifyOutputChanged: () => void;
    // This element contains all elements of our code component example
    private _container: HTMLDivElement;

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
    public init(context: IPropBag<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        const componentEnum = context.parameters?.component;
        init(context, FSIControls.CustomerSummaryControl, componentEnumToName[componentEnum?.raw]);
        loadImages(context, [
            'create100',
            'emptyState48',
            'emptyState100',
            'error48',
            'error100',
            'no_access100',
            'no_access48',
            'emptyStateFolder100',
        ]);
        this._notifyOutputChanged = notifyOutputChanged;
        this._container = container;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: IPropBag<IInputs>): void {
        updateView(this._container, this.getComponent(context.parameters?.component), { context, linkToEntityField: 'contactId' });
    }

    public getComponent(componentEnum: ComponentFramework.PropertyTypes.EnumProperty<string>) {
        return componentEnumToComponent[componentEnum?.raw] || CustomerSummaryContainer;
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {};
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        destroy(this._container);
    }
}
