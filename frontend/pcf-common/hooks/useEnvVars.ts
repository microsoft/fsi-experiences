import { useEffect, useState } from 'react';
import { IEnvVars } from '@fsi/core-components/dist/context/FSIContext';
import contextService from '../services/ContextService';
import { CommonPCFContext } from '../common-props';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry';
import { usePCFLoggerService } from './usePCFLoggerService';
import { ILoggerService } from '@fsi/core-components/dist/context/telemetry/ILoggerService';

const fetchXML = `
    <fetch>
        <entity name="environmentvariabledefinition" >
        <attribute name="defaultvalue" />
        <attribute name="valueschema" />
        <attribute name="displayname" />
        <attribute name="schemaname" />
        <filter>
            <condition attribute="schemaname" operator="like" value="msfsi_%" />
        </filter>
        <link-entity name="environmentvariablevalue" from="environmentvariabledefinitionid" to="environmentvariabledefinitionid" link-type="outer" >
            <attribute name="value" />
        </link-entity>
        </entity>
    </fetch>
`;
const encodedFetchXml = encodeURIComponent(fetchXML);

const FSI_DYNAMIC_ENV_VARS_KEY = '@fsi_dynamic_env_vars';

const getEnvFromStorage = () => JSON.parse(localStorage[FSI_DYNAMIC_ENV_VARS_KEY]);

const saveEnvVarsToStorage = dynamicEnv => {
    localStorage[FSI_DYNAMIC_ENV_VARS_KEY] = JSON.stringify(dynamicEnv);
};

const envNameToEnvKey = {
    msfsi_theme: 'theme',
    msfsi_supportedfiletypes: 'supportedfiletypes',
    msfsi_canceltasksdisplayindicator: 'canceltasksdisplayindicator',
};

const mapEnvName = (name?: string) => name && (envNameToEnvKey[name] || name);

const retrieveAndUpdatedEnvVars = async (context: CommonPCFContext) => {
    const result = await context.webAPI.retrieveMultipleRecords('environmentvariabledefinition', `?fetchXml=${encodedFetchXml}`);

    const env = result?.entities?.reduce((prevValue, currValue) => {
        if (!currValue) {
            return prevValue;
        }
        return {
            ...prevValue,
            [mapEnvName(currValue.schemaname)]: {
                value: currValue['environmentvariablevalue1.value'],
                defaultvalue: currValue.defaultvalue,
            },
        };
    }, {});

    if (env) {
        saveEnvVarsToStorage(env);
    }
    return env;
};

const getDynamicEnvVars = async (loggerService: ILoggerService) => {
    const context = contextService.geContext();
    if (!context) {
        return undefined;
    }

    if (contextService.isTestMode()) {
        return {};
    }

    const remoteEnvPromise = retrieveAndUpdatedEnvVars(context);

    try {
        return getEnvFromStorage();
    } catch (e) {
        loggerService.logError(useEnvVars.name, getDynamicEnvVars.name, 'Failed to get environment vars from storage', FSIErrorTypes.ServerError, e);
        return remoteEnvPromise;
    }
};

const useEnvVars = (enabled?: boolean): IEnvVars | undefined => {
    const [dynamicEnvVars, setDynamicEnvVars] = useState<IEnvVars>();
    const loggerService = usePCFLoggerService();

    useEffect(() => {
        if (!enabled) {
            return;
        }

        getDynamicEnvVars(loggerService)
            .then(setDynamicEnvVars)
            .catch(e => {
                setDynamicEnvVars({});
                loggerService.logError(useEnvVars.name, useEnvVars.name, 'Failed to get environment vars', FSIErrorTypes.ServerError, e);
            });
    }, [enabled]);

    return dynamicEnvVars;
};

export default useEnvVars;
