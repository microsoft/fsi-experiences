import React, { CSSProperties, useMemo } from 'react';
import { FSIDefaultPartialTheme } from './theme/DefaultTheme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { defaultUseTranslation, TranslationFunction } from './localization/TranslationFunction';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ThemeProvider } from '@fluentui/react/lib/utilities/ThemeProvider/ThemeProvider';
import { IDateGridStrings } from '@fluentui/date-time-utilities/lib/dateFormatting/dateFormatting.types';
import { PartialTheme } from '@fluentui/react/lib/Theme';
import { generateThemePalette } from './theme/ThemeGenerator';
import { createTheme } from '@fluentui/theme/lib/createTheme';
import { ICurrenciesDetails } from './currency/ICurrenciesDetails';
import { MockCurrenciesDetails } from './currency/ICurrenciesDetails.mock';
import { DayOfWeek } from '@fluentui/react/lib/DateTimeUtilities';
import { FSIErrorTypes, ILoggerService } from './telemetry';
import loggerServiceMock from './telemetry/ILoggerService.mock';
import { ErrorBoundary } from '../components/containers/ErrorBoundary/ErrorBoundary';
import { IConfig } from './config/IConfig';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

const enableDevTools = false;

initializeIcons();

export interface FSITheme extends PartialTheme {}
export interface FSIThemeColors {
    name?: string;
    primaryColor: string;
    isDefaultTheme?: boolean;
}

export interface IEnvVars {
    theme?: { value: string; defaultvalue: string };
    supportedfiletypes?: { value: string; defaultvalue: string };
    canceltasksdisplayindicator?: { value?: string; defaultvalue: string };
}

export interface IDateFormattingInfo {
    dateGridStrings: IDateGridStrings;
    firstDayOfTheWeek: DayOfWeek;
    shortDatePattern?: string;
}

export interface FSIContextValue {
    theme?: FSITheme;
    fsiThemeColors?: FSIThemeColors;
    containerStyle: CSSProperties;
    useTranslation: (namespace?: string) => TranslationFunction;
    navigation: FSINavigation | undefined;
    currenciesDetails: ICurrenciesDetails;
    locale: string;
    config?: IConfig;
    envVars?: IEnvVars;
    dateFormattingInfo?: IDateFormattingInfo;
    loggerService: ILoggerService;
}

export interface FSINavigation {
    openForm(id: string, name: string, formId?: string): void;
}

export const FSIDefaultContextValue = {
    // DEFAULTS
    theme: FSIDefaultPartialTheme,
    containerStyle: {},
    useTranslation: defaultUseTranslation,
    currenciesDetails: MockCurrenciesDetails,
    locale: 'en-US',
    navigation: { openForm: () => {} },
    loggerService: loggerServiceMock,
};
export const FSIContext = React.createContext<FSIContextValue>(FSIDefaultContextValue);

export const FSIContainer: React.FC<Partial<FSIContextValue>> = props => {
    const {
        children,
        containerStyle = {},
        theme = FSIDefaultPartialTheme,
        fsiThemeColors,
        useTranslation = defaultUseTranslation,
        navigation,
        currenciesDetails = MockCurrenciesDetails,
        locale = FSIDefaultContextValue.locale,
        envVars,
        dateFormattingInfo,
        loggerService = loggerServiceMock,
        config = { flags: {}, configSets: {} },
    } = props;

    const translate = useTranslation();
    const generatedTheme = useMemo<FSITheme>(() => {
        if (!fsiThemeColors) {
            return theme;
        }
        try {
            const palette = generateThemePalette(fsiThemeColors);
            if (!palette) {
                return theme;
            }
            return createTheme({
                ...theme,
                palette,
            });
        } catch (e) {
            loggerService.logError(
                FSIContainer.name,
                'generateTheme',
                'failed to gentrate theme from colors',
                FSIErrorTypes.GenericError,
                e,
                fsiThemeColors
            );
            return theme;
        }
    }, [fsiThemeColors, theme]);

    const providerValue: FSIContextValue = {
        theme: generatedTheme,
        containerStyle,
        useTranslation,
        navigation,
        currenciesDetails,
        locale,
        envVars,
        dateFormattingInfo,
        loggerService,
        config,
    };

    return (
        <ErrorBoundary
            title={translate('SOMETHING_WENT_WRONG')}
            subtitle={translate('SOMETHING_WENT_WRONG_DESC')}
            componentName={FSIContainer.name}
            logger={loggerService}
        >
            <FSIContext.Provider value={providerValue}>
                <ThemeProvider theme={providerValue.theme} style={containerStyle}>
                    <QueryClientProvider client={queryClient}>
                        <>
                            {children}
                            {enableDevTools && <ReactQueryDevtools initialIsOpen={false} />}
                        </>
                    </QueryClientProvider>
                </ThemeProvider>
            </FSIContext.Provider>
        </ErrorBoundary>
    );
};

export default FSIContext;
