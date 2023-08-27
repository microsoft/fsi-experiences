export const PCF_TYPE_LOOKUP_SIMPLE = 'Lookup.Simple';
export const PCF_TYPE_LOOKUP_CUSTOMER = 'Lookup.Customer';

export const extractRecordFormattedValue = (record: WebApi.Entity, attribute: string): string => {
    return record[`${attribute}@OData.Community.Display.V1.FormattedValue`];
};

export const extractLookupNavigationProperty = (record: WebApi.Entity, attribute: string): string => {
    return record[`${attribute}@Microsoft.Dynamics.CRM.associatednavigationproperty`];
};

export const extractLookupLogicalName = (record: WebApi.Entity, attribute: string): string => {
    return record[`${attribute}@Microsoft.Dynamics.CRM.lookuplogicalname`];
};

export const getLookupValueName = (attribute: string): string => {
    return `_${attribute}_value`;
};
