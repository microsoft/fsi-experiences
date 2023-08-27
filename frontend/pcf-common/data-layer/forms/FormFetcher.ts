import { PCFBaseFetcher } from '../base/PCFBaseFetcher';
import { CommonPCFContext } from '../../common-props';
import loggerService from '../../services/LoggerService';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry/ILoggerService';
import { CrmFormJson } from './FormJson';

export class FormFetcher extends PCFBaseFetcher {
    public constructor(context: CommonPCFContext) {
        super(context);
    }

    async fetchXmlFormLayout(formId: string): Promise<{ type: number; entityName: string; xml: string }> {
        try {
            const {
                formxml,
                objecttypecode: entityName,
                type,
            } = await this.ExecuteAndLog(
                FormFetcher.name,
                `Fetch form metadata. (formId: ${formId})`,
                `Started fetching form metadata. (formId: ${formId})`,
                `Successfully fetched form metadata. (formId: ${formId})`,
                undefined,
                () => {
                    return this.webAPI.retrieveRecord('systemform', formId, '?$select=formxml,objecttypecode,name,type');
                }
            );

            return {
                entityName,
                xml: formxml,
                type,
            };
        } catch (e) {
            loggerService.logError(FormFetcher.name, 'fetchForm', `Failed to fetch form. (formId: ${formId})`, FSIErrorTypes.ServerError, e);
            throw e;
        }
    }

    async fetchFormLayout(formId: string): Promise<{ entityName: string; form: CrmFormJson }> {
        try {
            const { formjson, objecttypecode: entityName } = await this.ExecuteAndLog(
                FormFetcher.name,
                `Fetch form metadata. (formId: ${formId})`,
                `Started fetching form metadata. (formId: ${formId})`,
                `Successfully fetched form metadata. (formId: ${formId})`,
                undefined,
                () => {
                    return this.webAPI.retrieveRecord('systemform', formId, '?$select=formjson,objecttypecode,name');
                }
            );

            return {
                entityName,
                form: JSON.parse(formjson) as CrmFormJson,
            };
        } catch (e) {
            loggerService.logError(FormFetcher.name, 'fetchForm', `Failed to fetch form. (formId: ${formId})`, FSIErrorTypes.ServerError, e);
            throw e;
        }
    }
}
