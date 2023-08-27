/* eslint-disable no-useless-catch */
import loggerService from '../../services/LoggerService';
import { CommonPCFContext } from '../../common-props';
import { IExecuteRequest } from './PCFBaseExecuteTypes';
import { PCFBaseFetcher } from './PCFBaseFetcher';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry/ILoggerService';

export class PCFBaseExecuteWebAPI extends PCFBaseFetcher {
    constructor(protected context: CommonPCFContext) {
        super(context);
    }

    public async execute(params: IExecuteRequest, returnKey?: string): Promise<any> {
        try {
            const result = await this.ExecuteAndLog(
                PCFBaseExecuteWebAPI.name,
                'execute',
                'Executing request.',
                'Successfully executed params.',
                { params },
                () => this.context.webAPI.execute(params as WebApi.ODataContract)
            );

            if (result.ok) {
                const res = await result.json();

                return returnKey ? res[returnKey] : res;
            }

            return result;
        } catch (e) {
            loggerService.logError(
                PCFBaseExecuteWebAPI.name,
                'execute',
                `Failed to execute request: ${params.getMetadata().operationName}`,
                FSIErrorTypes.ServerError,
                e,
                {
                    params,
                    returnKey,
                }
            );
            throw e;
        }
    }

    public createAction(data: any, operationName: string, inputParamName?: string) {
        const paramName = inputParamName || 'ContactId';
        return {
            [paramName]: JSON.stringify(data),
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: {
                        [paramName]: {
                            typeName: 'Edm.String',
                            structuralProperty: 1,
                        },
                    },
                    operationType: 0,
                    operationName,
                };
            },
        };
    }

    public createActionWithMultipleParams(
        params: { paramName: string; data: any; type: string; structuralProperty?: number }[],
        operationName: string
    ) {
        const { parameterTypes, data } = params.reduce(
            (prevValue, param) => ({
                parameterTypes: {
                    ...prevValue.parameterTypes,
                    [param.paramName]: {
                        typeName: param.type,
                        structuralProperty: param.structuralProperty || 1,
                    },
                },
                data: { ...prevValue.data, [param.paramName]: param.data },
            }),
            { parameterTypes: {}, data: {} }
        );
        return {
            getMetadata: () => ({
                boundParameter: null,
                operationType: 0,
                operationName,
                parameterTypes,
            }),
            ...data,
        };
    }

    public createBoundActionWithMultipleParams(
        boundedEntityData: any,
        params: { paramName: string; data: any; type: string; structuralProperty?: number }[],
        operationName: string
    ) {
        const { parameterTypes, data } = params.reduce(
            (prevValue, param) => ({
                parameterTypes: {
                    ...prevValue.parameterTypes,
                    [param.paramName]: {
                        typeName: param.type,
                        structuralProperty: param.structuralProperty || 1,
                    },
                },
                data: { ...prevValue.data, [param.paramName]: param.data },
            }),
            {
                parameterTypes: {
                    entity: {
                        typeName: 'mscrm.crmbaseentity',
                        structuralProperty: 5,
                    },
                },
                data: {
                    entity: boundedEntityData,
                },
            }
        );
        return {
            getMetadata: () => ({
                boundParameter: 'entity',
                operationType: 0,
                operationName,
                parameterTypes,
            }),
            ...data,
        };
    }

    public createActionWithoutParams(operationName: string) {
        return {
            getMetadata: () => {
                return {
                    boundParameter: null,
                    parameterTypes: {},
                    operationType: 0,
                    operationName,
                };
            },
        };
    }
}
