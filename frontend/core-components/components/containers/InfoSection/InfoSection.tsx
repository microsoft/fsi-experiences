import React from 'react';
import { IStackStyles, Stack } from '@fluentui/react/lib/Stack';
import ErrorState from '../ErrorState/ErrorState';
import { ILoadingProps, Loading } from '../../atoms/Loading/Loading';
import BaseCurrency from '../../atoms/BaseCurrency/BaseCurrency';
import { SectionHeader } from '../../atoms/SectionHeader';
import { CommandButton, IButtonProps } from '@fluentui/react/lib/components/Button';
import { baseCurrencyStackContainerStyles, commandButtonStyles } from './InfoSection.style';
import { mergeStyleSets } from '@fluentui/style-utilities';

export interface IDataSectionProps {
    mainTitle: string;
    currencyId?: string;
    headingId?: string;
    isLoading: boolean;
    isError: boolean;
    commandProps?: IButtonProps;
    sectionStyles?: IStackStyles;
    loaderProps?: ILoadingProps;
    hideTitle?: boolean;
}

export const InfoSection = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<IDataSectionProps>>(
    ({ mainTitle, isLoading, isError, currencyId, headingId, children, commandProps, sectionStyles, loaderProps, hideTitle }, commandBtnRef) => {
        const commandButtonMergedStyles = mergeStyleSets(commandButtonStyles, commandProps?.styles);
        return (
            <Stack as="section" aria-labelledby={headingId} styles={sectionStyles}>
                <SectionHeader data-testid="header" hideTitle={hideTitle} id={headingId} titleString={mainTitle} horizontalAlign="stretch">
                    <Stack horizontal horizontalAlign="center" styles={baseCurrencyStackContainerStyles}>
                        {currencyId && <BaseCurrency hideCurrencyInfoIcon />}
                    </Stack>
                    {commandProps && (
                        <CommandButton
                            {...commandProps}
                            id={`${headingId || ''}infoSectionButton`}
                            aria-describedby={headingId}
                            styles={commandButtonMergedStyles}
                            elementRef={commandBtnRef}
                        />
                    )}
                </SectionHeader>
                {isError && <ErrorState iconSize={100} />}
                {!isError && isLoading && <Loading {...loaderProps} />}
                {!isError && !isLoading && children}
            </Stack>
        );
    }
);

export default InfoSection;
