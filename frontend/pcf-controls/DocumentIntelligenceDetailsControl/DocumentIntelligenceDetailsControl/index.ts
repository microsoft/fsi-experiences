/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IInputs, IOutputs } from './generated/ManifestTypes';
import { getReactElement, init, loadImages } from '@fsi/pcf-common/life-cycle';
import { MockDocumentDetailsFetcher } from '@fsi/document-intelligence/interfaces/mocks/MockDocumentDetailsFetcher';
import { DocumentIntelligenceDetails } from '@fsi-pcf/documents-pcf/DocumentIntelligenceControl/fetchers/DocumentIntelligenceDetails.fetcher';
import DocumentIntelligenceContainer from './container/DocumentIntelligenceDetailsContainer';
import { IDocumentDetailsFetcher } from '@fsi/document-intelligence/interfaces/IDocumentsFetcher';
import { getLoggerService } from '@fsi/pcf-common/hooks/usePCFLoggerService';

// @ts-ignore
export class DocumentIntelligenceDetailsControl implements ReactControl<IInputs, IOutputs> {
    private fetcher!: IDocumentDetailsFetcher;
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
        // Add control initialization code
        const loggerService = getLoggerService();
        this.fetcher =
            context.mode.label === 'TestLabel' ? new MockDocumentDetailsFetcher() : new DocumentIntelligenceDetails(context, loggerService);
        loadImages(context, ['error', 'error48', 'create', 'error100', 'emptyFile']);
        init(context, 'MicrosoftPCF.DocumentIntelligenceDetailsControl');
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context): React.ReactElement {
        // Add code to update control view
        const { regarding } = context.parameters;
        this.fetcher.regardingEntity = regarding?.raw?.length ? regarding.raw[0].entityType : undefined;
        return getReactElement(DocumentIntelligenceContainer, { context, fetcher: this.fetcher });
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
    public destroy(): void {}
}
