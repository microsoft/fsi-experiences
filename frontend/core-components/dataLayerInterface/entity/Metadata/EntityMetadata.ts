import { OptionSetMap } from './OptionSet';

export enum HttpStatusCode {
    OK = 200,
    NOT_FOUND = 404,
    FORBIDEN = 403,
    NO_CONTENT = 204,
}

export interface EntityMetadata {
    displayName: string;
}
export interface EntityMetadataWithOptionSet extends EntityMetadata {
    optionSet: OptionSetMap;
}
