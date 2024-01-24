import { EntityMetadata, EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { OptionSetMap } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/OptionSet';
import { FHMetadata } from '../interfaces/FHEntity/FHMetadata';

export const getOptionSetText = (key?: number, entityMetadata?: EntityMetadata): string => {
    const optionSetEntity = entityMetadata as EntityMetadataWithOptionSet;
    if (!key || !optionSetEntity || !optionSetEntity.optionSet || !optionSetEntity.optionSet[key]) {
        return '';
    }
    return optionSetEntity.optionSet[key].text;
};

export const toPickListMap = (optionSet: OptionSetMap): Map<number, string> => {
    return Object.keys(optionSet).reduce((map, key) => {
        map.set(optionSet[key].value, optionSet[key].text);
        return map;
    }, new Map());
};

export const getFHEntityDisplayName = (field: keyof FHMetadata, metadata?: FHMetadata): string => {
    if (!metadata || !metadata[field]) {
        return '';
    }
    return metadata[field].displayName;
};
