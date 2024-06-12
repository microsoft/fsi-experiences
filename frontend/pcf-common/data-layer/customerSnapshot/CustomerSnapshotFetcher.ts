import { CommonPCFContext } from '../../common-props';
import { FSIErrorTypes, ILoggerService } from '@fsi/core-components/dist/context/telemetry';
import {
    ICustomerSnapshotMetadata,
    ICustomerSnapshotLayout,
    FieldType,
    ICustomerSnapshotData,
} from '@fsi/core-components/dist/dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import { ICustomerSnapshotFetcher } from '@fsi/core-components/dist/dataLayerInterface/service/ICustomerSnapshotFetcher';
import { AttributeType, CrmFormType, FormFetcher } from '../forms';
import { getSectionFields, getSections, getTabTitle } from '../forms/FormXml';
import {
    CustomerSnapshotConfigError,
    SnapshotErrorCode,
} from '@fsi/core-components/dist/dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshotError';
import { UciErrorCodes } from '../../utilities/UciErrorCodes';

const uciTypesToSnapshot = {
    [AttributeType.Boolean]: FieldType.Boolean,
    [AttributeType.Date]: FieldType.DateTime,
    [AttributeType.DateTime]: FieldType.DateTime,
    [AttributeType.Integer]: FieldType.Integer,
    [AttributeType.Decimal]: FieldType.Number,
    [AttributeType.Double]: FieldType.Number,
    [AttributeType.Money]: FieldType.Currency,
    [AttributeType.Lookup]: FieldType.Lookup,
};

const addressFields = ['addressline', 'address[0-9]_composite'];
const addressRegex = new RegExp(addressFields.join('|'));

const FormattedValueSuffix = '@OData.Community.Display.V1.FormattedValue';
const PreferredContactMethodField = 'preferredcontactmethodcode';
const CurrencyIdField = '_transactioncurrencyid_value';
const ContactEntity = 'contact';
const AccountEntity = 'account';

const maxSections = 4;
const maxFieldsInHeader = 5;
const maxFieldsInSection = 10;

const shouldFetchPreferredContactMethod = entityName => entityName === ContactEntity || entityName === AccountEntity;
export class CustomerSnapshotFetcher extends FormFetcher implements ICustomerSnapshotFetcher {
    public constructor(context: CommonPCFContext, private linkToEntityField, loggerService: ILoggerService) {
        super(context, loggerService);
    }

    private formXmlToSnapshotLayout(fromXml: string, formId: string): ICustomerSnapshotLayout {
        try {
            const layout: ICustomerSnapshotLayout = {
                sections: [],
                headerSection: {},
            };
            const xml = new DOMParser().parseFromString(fromXml, 'application/xml');

            layout.cardTitle = getTabTitle(xml) || '';
            const xmlSections = getSections(xml);
            if (xmlSections.length === 0) {
                return layout;
            }
            // build snapshot header
            const headerSection = getSectionFields(xmlSections[0], maxFieldsInHeader);
            layout.headerSection.titleField = headerSection.shift();
            layout.headerSection.subtitleFields = headerSection;

            // build snapshot sections
            for (let i = 1; i < xmlSections.length && layout.sections.length < maxSections; i++) {
                layout.sections.push({
                    fields: getSectionFields(xmlSections[i], maxFieldsInSection),
                });
            }

            return layout;
        } catch (e) {
            this.loggerService.logError(
                CustomerSnapshotFetcher.name,
                'processFormError',
                `Failed to to process form XML (form: ${formId})`,
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    async fetchSnapshotLayout(formId: string): Promise<{ entityName: string; layout: ICustomerSnapshotLayout }> {
        try {
            const { xml, entityName, type } = await this.fetchXmlFormLayout(formId);
            if (type !== CrmFormType.QuickViewForm) {
                const e = new CustomerSnapshotConfigError('Form type must be QuickViewForm(6)', SnapshotErrorCode.InvalidConfiguration);
                this.loggerService.logError(CustomerSnapshotFetcher.name, 'fetchSnapshotLayout', e.message, FSIErrorTypes.InvalidParam, e);
                throw e;
            }
            return {
                layout: this.formXmlToSnapshotLayout(xml, formId),
                entityName,
            };
        } catch (e: any) {
            if (e.errorCode === UciErrorCodes.ObjectDoesNotExist || e.errorCode === UciErrorCodes.ParameterValidationError) {
                throw new CustomerSnapshotConfigError(e.message, SnapshotErrorCode.InvalidConfiguration);
            }
            throw e;
        }
    }

    async fetchSnapshotData(entityName: string, entityId: string, fields: string[]): Promise<ICustomerSnapshotData> {
        try {
            if (!this.linkToEntityField) {
                this.linkToEntityField = entityName + 'id';
            }
            const fieldsToFetch = [...fields];
            if (shouldFetchPreferredContactMethod(entityName)) {
                fieldsToFetch.push(PreferredContactMethodField);
            }
            const query = `<fetch top="1" >
                                <entity name="${entityName}" >
                                    ${fieldsToFetch.map(f => `<attribute name="${f}" />`)}
                                    <filter>
                                        <condition attribute="${this.linkToEntityField}" operator="eq" value="${entityId}" />
                                    </filter>
                                </entity>
                            </fetch>`;
            const data = await this.context.webAPI.retrieveMultipleRecords(entityName, '?fetchXml=' + query);
            const record = data.entities[0];

            if (!record) {
                return { fields: {} };
            }

            const snapshotData: ICustomerSnapshotData = fieldsToFetch.reduce(
                (prevValue, currValue) => ({
                    ...prevValue,
                    fields: {
                        ...prevValue.fields,
                        [currValue]: {
                            fieldName: currValue,
                            formattedValue: record[currValue + FormattedValueSuffix] ?? record[`_${currValue}_value` + FormattedValueSuffix],
                            value: record[currValue] ?? record[`_${currValue}_value`],
                        },
                    },
                }),
                { fields: {}, currencyId: record[CurrencyIdField], preferredContactMethod: record[PreferredContactMethodField] }
            );

            return snapshotData;
        } catch (e: any) {
            if (e.errorCode === UciErrorCodes.QueryBuilderNoAttribute) {
                throw new CustomerSnapshotConfigError(e.message, SnapshotErrorCode.InvalidConfiguration);
            }
            throw e;
        }
    }

    async fetchSnapshotMetadata(entityName: string, fields: string[]): Promise<ICustomerSnapshotMetadata> {
        try {
            const metadata: ICustomerSnapshotMetadata = {};
            const { Attributes } = await this.ExecuteAndLog(
                CustomerSnapshotFetcher.name,
                `Fetch entity metadata. (entity: ${entityName})`,
                `Started fetching entity metadata. (entity: ${entityName})`,
                `Successfully fetched entity metadata. (entity: ${entityName})`,
                undefined,
                () => {
                    return this.utils.getEntityMetadata(entityName, fields);
                }
            );
            Attributes.forEach(att => {
                const { OptionSet, DisplayName, LogicalName, attributeDescriptor } = att;
                const { Type, FormatName, Format, Targets } = attributeDescriptor;

                metadata[LogicalName] = {
                    displayName: DisplayName,
                    target: Targets && Targets[0],
                    type: this.toSnapshotFiledType(Type, Format, LogicalName),
                };
            });
            return metadata;
        } catch (e) {
            this.loggerService.logError(
                CustomerSnapshotFetcher.name,
                'fetchForm',
                `Failed to fetch entity metadata. (entity: ${entityName})`,
                FSIErrorTypes.ServerError,
                e
            );
            throw e;
        }
    }

    toSnapshotFiledType(type: AttributeType, format: string, logicalName: string): FieldType {
        if (format === 'Email') {
            return FieldType.Email;
        }

        if (format === 'Phone') {
            return FieldType.Phone;
        }

        if (logicalName.match(addressRegex)) {
            return FieldType.Address;
        }

        return uciTypesToSnapshot[type] || FieldType.Text;
    }
}
