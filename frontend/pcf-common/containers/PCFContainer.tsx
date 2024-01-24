import React, { CSSProperties, HTMLProps, useMemo } from 'react';
import { FSIContainer } from '@fsi/core-components/dist/context/FSIContext';
import { CommonPCFContext } from '../common-props';
import { useTranslation } from '../hooks/useTranslation';
import { useNavigation } from '../hooks/usePCFNavigation';
import { useDynamicTheme } from '../hooks/useDynamicTheme';
import { useCurrencies } from '../hooks/useCurrencies';
import useEnvVars from '../hooks/useEnvVars';
import { useDatesFormattingInfo } from '../hooks/useDatesFormattingInfo';
import { usePCFLoggerService } from '../hooks/usePCFLoggerService';
import { IConfig } from '@fsi/core-components/dist/context/config/IConfig';

export interface PCFContainerProps extends HTMLProps<any> {
    containerStyle?: CSSProperties;
    enableDynamicTheming?: boolean;
    withCurrencies?: boolean;
    enableEnvVars?: boolean;
    context: CommonPCFContext;
    config?: IConfig;
}

export const PCFContainer: React.FC<PCFContainerProps> = props => {
    const { children, context, enableEnvVars = true, enableDynamicTheming = true, containerStyle = {}, withCurrencies = true, config } = props;

    const style = useMemo<CSSProperties>(() => {
        return {
            position: 'relative',
            height: '100%',
            width: '100%',
            ...containerStyle,
        };
    }, [containerStyle]);

    const envVars = useEnvVars(!!enableEnvVars);
    const fsiColors = useDynamicTheme(!!enableDynamicTheming, envVars);
    const currenciesDetail = useCurrencies(!!withCurrencies);

    return (
        <FSIContainer
            config={config}
            containerStyle={style}
            fsiThemeColors={fsiColors}
            useTranslation={useTranslation}
            currenciesDetails={currenciesDetail}
            locale={context.userSettings?.formatInfoCultureName}
            navigation={useNavigation(context)}
            dateFormattingInfo={useDatesFormattingInfo(context)}
            envVars={envVars}
            loggerService={usePCFLoggerService()}
        >
            {children}
        </FSIContainer>
    );
};
