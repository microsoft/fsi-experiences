import { FSIErrorTypes, ILoggerService, TelemetryAdditionalData } from '@fsi/core-components/dist/context/telemetry';
import { CommonPCFContext } from '../../common-props';
import { getContactQuery } from './PCFBaseQuery';
import { AttributeChoicesMap } from './PCFBaseTypes';
import { IAccess } from '@fsi/core-components/dist/dataLayerInterface/entity/IAccess';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';

const contactEntity = 'contact';

type EntityMetadata = { [key: string]: any };

export class PCFBaseFetcher {
    protected webAPI;
    protected utils;
    protected userId: string;
    protected _context: CommonPCFContext;
    protected _loggerService: ILoggerService;

    public constructor(protected context: CommonPCFContext, protected loggerService: ILoggerService) {
        this.webAPI = context.webAPI;
        this.userId = context.userSettings?.userId?.replace(/[\])}[{(]/g, '');
        this._context = context;
        this.utils = context.utils;
        this._loggerService = loggerService;
    }

    public async getAccessInfo(entityId: string): Promise<IAccess> {
        const clientUrl = this._context.page.getClientUrl();
        const response = await fetch(
            `${clientUrl}/api/data/v9.1/systemusers(${this.userId})/Microsoft.Dynamics.CRM.RetrievePrincipalAccessInfo(ObjectId=${entityId},EntityName='${contactEntity}')`,
            { credentials: 'same-origin' }
        );
        const { AccessInfo } = await response.json();
        const { GrantedAccessRights } = JSON.parse(AccessInfo);

        return {
            write: GrantedAccessRights.includes('WriteAccess'),
            read: GrantedAccessRights.includes('ReadAccess'),
            delete: GrantedAccessRights.includes('DeleteAccess'),
            create: GrantedAccessRights.includes('CreateAccess'),
            append: GrantedAccessRights.includes('AppendAccess'),
            appendTo: GrantedAccessRights.includes('AppendToAccess'),
        };
    }

    public hasEntitiesPrivilege(entitiesNames: string[], operationType: PrivilegeType): boolean {
        const operation: number = operationType;
        const accesses = entitiesNames.map(entityName =>
            this.utils.hasEntityPrivilege(
                entityName,
                operation,
                // Constants.PrivilegeDepth.Basic
                0
            )
        );
        return accesses.every(access => access);
    }

    public async getEntityChoices(entityName: string, choicesAttributeNames: string[]): Promise<AttributeChoicesMap> {
        const choicesByAttribute: AttributeChoicesMap = {};

        try {
            const res: any = await this.ExecuteAndLog(
                PCFBaseFetcher.name,
                'getEntityChoices',
                'Fetching attributes name from entity.',
                'Successfully fetched attributes name from entity.',
                {
                    entityName,
                    choicesAttributeNames,
                },
                () => this.utils.getEntityMetadata(entityName, choicesAttributeNames)
            );

            choicesAttributeNames.forEach(attr => {
                choicesByAttribute[attr] = {};

                const options = res.Attributes.get(attr).OptionSet;
                Object.keys(options).forEach(key => {
                    const option = options[key];
                    choicesByAttribute[attr][option.value] = option.text;
                });
            });

            return choicesByAttribute;
        } catch (e) {
            this._loggerService.logError(PCFBaseFetcher.name, 'getEntityChoices', 'Failed to fetch attributes from entity.', FSIErrorTypes.ServerError, e, {
                entityName,
                choicesAttributeNames,
            });
            throw e;
        }
    }

    public async getEntityMetadata(entityName: string, attributes?: string[]): Promise<EntityMetadata> {
        try {
            const res: any = await this.ExecuteAndLog(
                PCFBaseFetcher.name,
                'getEntityMetadata',
                'Fetching metadata from entity.',
                'Successfully fetched metadata from entity.',
                {
                    entityName,
                    attributes,
                },
                () => this.utils.getEntityMetadata(entityName, attributes)
            );

            return res;
        } catch (e) {
            this._loggerService.logError(PCFBaseFetcher.name, 'getEntityMetadata', 'Failed to fetch metadata.', FSIErrorTypes.ServerError, e, {
                entityName,
                attributes,
            });
            throw e;
        }
    }

    public async getContact(contactId: string, fields: string[]) {
        try {
            const response: any = await this.ExecuteAndLog(
                PCFBaseFetcher.name,
                'getContact',
                'Fetching contact.',
                'Successfully fetched contact.',
                {
                    contactId,
                },
                () => this.webAPI.retrieveMultipleRecords('contact', '?fetchXml=' + getContactQuery(contactId, fields))
            );

            return response.entities[0];
        } catch (e) {
            this._loggerService.logError(PCFBaseFetcher.name, 'getContact', 'Failed to fetch contact.', FSIErrorTypes.ServerError, e, {
                contactId,
                fields,
            });
            throw e;
        }
    }

    public async getPicklistMap(entityName: string, pickListAttributeName: string): Promise<Map<number, string>> {
        const map: Map<number, string> = new Map<number, string>();
        try {
            const res = await this.ExecuteAndLog(
                PCFBaseFetcher.name,
                'getPicklistMap',
                'Fetching picklists.',
                'Successfully fetched picklists.',
                {
                    entityName,
                    pickListAttributeName,
                },
                () => this.getEntityMetadata(entityName, [pickListAttributeName])
            );

            const types = (res.Attributes.get(pickListAttributeName) as any).OptionSet;
            Object.keys(types).forEach(key => {
                map.set(types[key].value, types[key].text);
            });
            return map;
        } catch (e) {
            this._loggerService.logError(PCFBaseFetcher.name, 'getPicklistMap', 'Failed to get picklist.', FSIErrorTypes.ServerError, e, {
                entityName,
                pickListAttributeName,
            });
            throw e;
        }
    }

    public async ExecuteAndLog<T>(
        componentName: string,
        functionName: string,
        initialMessage: string,
        successMessage: string,
        extraData: TelemetryAdditionalData | undefined,
        fetchFunction: () => Promise<T>
    ): Promise<T> {
        this._loggerService.logInfo(componentName, functionName, initialMessage, extraData);
        const perfStopTimerFunc = this.loggerService.logStartPerfTime(componentName, functionName);
        const result = await fetchFunction();
        perfStopTimerFunc();
        this._loggerService.logInfo(componentName, functionName, successMessage, extraData);
        return result;
    }
}
