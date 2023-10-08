import { useEffect, useState } from 'react';
import { FSIThemeColors, IEnvVars } from '@fsi/core-components/dist/context/FSIContext';
import contextService from '../services/ContextService';
import { CommonPCFContext } from '../common-props';
import { FSIErrorTypes } from '@fsi/core-components/dist/context/telemetry';
import { usePCFLoggerService } from './usePCFLoggerService';
import { ILoggerService } from '@fsi/core-components/dist/context/telemetry/ILoggerService';

const fetchXML = `
    <fetch>
        <entity name="theme" >
            <attribute name="name" />
            <attribute name="themeid" />
            <attribute name="isdefaulttheme" />
            <attribute name="maincolor" />
        </entity>
    </fetch>
`;
const encodedFetchXml = encodeURIComponent(fetchXML);

const FSI_DYNAMIC_THEMES_KEY = '@fsi_default_dynamic_themes';

const testTheme = {
    maincolor: '#2266E3',
    istestTheme: true,
};

export const getThemesFromStorage = () => {
    return JSON.parse(localStorage[FSI_DYNAMIC_THEMES_KEY]);
};

export const saveThemesToStorage = themes => {
    localStorage[FSI_DYNAMIC_THEMES_KEY] = JSON.stringify(themes);
};

export const retrieveAndUpdatedTheme = (context: CommonPCFContext) => {
    return context.webAPI.retrieveMultipleRecords('theme', `?fetchXml=${encodedFetchXml}`).then(result => {
        const theme = result.entities;
        if (theme) {
            saveThemesToStorage(theme);
        }
        return theme;
    });
};

export const getDynamicTheme = async (loggerService: ILoggerService) => {
    const context = contextService.geContext();
    if (!context) {
        return undefined;
    }

    if (contextService.isTestMode()) {
        return [testTheme];
    }
    // get theme and update the storage
    const remoteThemePromise = retrieveAndUpdatedTheme(context);

    try {
        // try to use cached theme from storage (else wait for remote response)
        return getThemesFromStorage();
    } catch (e) {
        loggerService.logError(useDynamicTheme.name, getDynamicTheme.name, 'Failed to get themes from storage', FSIErrorTypes.ServerError, e);
        return remoteThemePromise;
    }
};

interface FSIThemeColorsMap {
    [key: string]: FSIThemeColors;
}

export const dynamicThemesToMap = (res): FSIThemeColorsMap =>
    res.reduce(
        (prevValue, currValue) => ({
            ...prevValue,
            [currValue.name]: {
                name: currValue.name,
                primaryColor: currValue.maincolor,
                isDefaultTheme: currValue.isdefaulttheme,
            },
        }),
        {}
    );

export const useDynamicTheme = (enabled: boolean, env?: IEnvVars) => {
    const [dynamicTheme, setDynamicTheme] = useState<FSIThemeColors>();
    const loggerService = usePCFLoggerService();

    useEffect(() => {
        if (!enabled || !env) {
            return;
        }

        getDynamicTheme(loggerService)
            .then(res => {
                const allThemes = dynamicThemesToMap(res);
                const envTheme = env?.theme && (allThemes[env.theme.value] || allThemes[env.theme.defaultvalue]);
                const defaultTheme = Object.values(allThemes).find(theme => theme.isDefaultTheme);
                setDynamicTheme(envTheme || defaultTheme);
            })
            .catch(e => {
                loggerService.logError(useDynamicTheme.name, useDynamicTheme.name, 'Failed to get themes', FSIErrorTypes.ServerError, e);
            });
    }, [enabled, env]);

    return dynamicTheme;
};
