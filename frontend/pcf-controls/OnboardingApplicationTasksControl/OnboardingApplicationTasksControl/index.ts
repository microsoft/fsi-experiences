/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { updateView, destroy, loadImages, init } from '@fsi/pcf-common/life-cycle';
import OnboardingApplicationTasksContainer from './container/OnboardingApplicationTasksContainer';

// @ts-ignore
export class OnboardingApplicationTasksControl implements StandardControl<IInputs, IOutputs> {
    // Power Apps component framework delegate which will be assigned to this object which would be called whenever any update happens.
    private notifyOutputChanged: () => void;
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
    public init(context, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this._container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        init(context, 'MicrosoftPCF.OnboardingApplicationTasksControl');
        loadImages(context, ['emptyState', 'error']);
        context.client.trackContainerResize(true);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context): void {
        const selectedTasksGroup = context.parameters.selectedTasksGroup?.raw;
        const onReadyTasks = () => {
            if (selectedTasksGroup !== '') {
                this.notifyOutputChanged();
            }
        };
        updateView(this._container, OnboardingApplicationTasksContainer, {
            context,
            onReadyTasks,
            containerStyle: { width: context.client.allocatedWidth + 'px' },
        });
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { selectedTasksGroup: '' };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        destroy(this._container);
    }
}
