/* eslint-disable @typescript-eslint/ban-ts-comment */
/*global ComponentFramework*/
import { init, destroy, getReactElement, loadImages } from '@fsi/pcf-common/life-cycle';
import { createModelFromControl } from '@fsi/pcf-common/factories/createModelFromControl';
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { ApplicantListContainer } from './container/ApplicantListContainer';
import { ApplicantFormPlaceholder } from './container/ApplicantFormPlaceholder';

// @ts-ignore
export class ApplicantListControl implements VirtualControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;

    private selectedApplicant: string;
    private isLoading: boolean;
    private isError: boolean;
    private onChangeApplicant: (guid: string) => void;
    private onSyncAppState: (appState: { isLoading: boolean; isError: boolean }) => void;
    private notifyOutputChanged: () => void;

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
        this._container = container;
        this.notifyOutputChanged = notifyOutputChanged;
        this.isLoading = true;
        this.isError = false;

        this.onChangeApplicant = (guid: string) => {
            this.selectedApplicant = guid;
            context.factory.requestRender();
        };

        this.onSyncAppState = ({ isLoading, isError }) => {
            if (isLoading !== this.isLoading || isError !== this.isError) {
                this.isLoading = isLoading;
                this.isError = isError;
                context.factory.requestRender();
            }
        };

        loadImages(context, ['emptyState', 'error', 'emptyState48', 'error100']);
        init(context, 'MicrosoftPCF.ApplicantListControl');
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context) {
        const taskDefinitionId = context.parameters.taskDefinitionId?.raw;
        const placeholder = context.parameters?.applicantListPlaceholder?.raw || '';
        const [applicantPlaceholder, taskDefinitionPlaceholder] = placeholder?.split(',');
        if (taskDefinitionId && taskDefinitionId === taskDefinitionPlaceholder) {
            this.selectedApplicant = applicantPlaceholder;
            this.notifyOutputChanged();
        }

        const formId = context.parameters.formId?.raw || '';
        const entityName = 'msfsi_relatedpartycontract';
        const form = createModelFromControl({
            context,
            instanceId: `FSI-ModelFormControl-${entityName}-${formId}`,
            entityName,
            formId,
            objectId: this.selectedApplicant,
        });

        const isStillInLoadingOrError = this.isLoading || this.isError;

        const formComponent = form || getReactElement(ApplicantFormPlaceholder, { context, isError: true });

        return context.factory.createElement(
            'CONTAINER',
            {
                id: `MicrosoftPCF.ApplicantListControl_Container-${context.parameters?.formId?.raw || ''}`,
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                key: `MicrosoftPCF.ApplicantListControl_Container-${context.parameters.formId?.raw || ''}`,
                style: {
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: isStillInLoadingOrError ? 'center' : 'stretch',
                    padding: '16px',
                },
            },
            [
                getReactElement(ApplicantListContainer, {
                    context: context,
                    selectedApplicant: this.selectedApplicant,
                    onChangeApplicant: this.onChangeApplicant,
                    onSyncAppState: this.onSyncAppState,
                    applicationId: context.parameters.applicationId?.raw || '',
                    taskDefinitionId: taskDefinitionId || '',
                    containerStyle: {
                        flexBasis: isStillInLoadingOrError || !this.selectedApplicant ? '100%' : '20%',
                        height: '100%',
                        minWidth: 200,
                        background: 'transparent',
                        paddingInlineEnd: '2px',
                    },
                }),
                !isStillInLoadingOrError && this.selectedApplicant && formComponent,
            ]
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return { applicantListPlaceholder: '' };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        destroy(this._container);
    }
}
