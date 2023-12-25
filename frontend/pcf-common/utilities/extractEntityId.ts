export const PCF_TYPE_LOOKUP_SIMPLE = 'Lookup.Simple';
export const PCF_TYPE_LOOKUP_CUSTOMER = 'Lookup.Customer';

export const extractEntityId = (entity: ComponentFramework.PropertyTypes.Property): string => {
    const { type = '' } = entity || {};

    if (type === PCF_TYPE_LOOKUP_SIMPLE || type === PCF_TYPE_LOOKUP_CUSTOMER) {
        return entity?.raw?.length && entity.raw[0].id;
    }

    return entity?.raw || '';
};
