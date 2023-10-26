import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';

export interface IFHHiddenMessageBar {
    highlightedText?: string;
    regularText?: string;
    img?: string;
    requestMetadata: { [entityName: string]: HttpStatusCode };
}
