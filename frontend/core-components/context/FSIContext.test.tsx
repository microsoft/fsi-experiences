import React from 'react';
import { render } from '@testing-library/react';
import { FSIContainer, FSITheme, FSIThemeColors } from './FSIContext';
import { FSIContextChildMock, MOCKED_FSI_CONTEXT_TEXT } from './FSIContextChild.mock';
import { FSIDefaultPartialTheme } from './theme/DefaultTheme';
import { ICurrenciesDetails } from './currency/ICurrenciesDetails';
import { MockCurrenciesDetails } from './currency/ICurrenciesDetails.mock';
import { TranslationFunction } from './localization/TranslationFunction';

describe('test fsi context', () => {
    it('should render FSI context', async () => {
        const currContext: { [key: string]: any } = {};
        const { findByText } = render(
            <FSIContainer {...params}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value).not.toBeNull();
    });

    it('should render FSI context and set props', async () => {
        const currContext: { [key: string]: any } = {};
        const height = '69%';
        const returnMock = 'mockReturn';
        const useTranslation = (): TranslationFunction => (key, defaultValue?, namespace?) => returnMock;
        const { findByText } = render(
            <FSIContainer {...params} containerStyle={{ height }} theme={{}} useTranslation={useTranslation}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.containerStyle.height).toEqual(height);
        expect(currContext.value.theme).toEqual({});
        expect(currContext.value.useTranslation()('', '', '')).toEqual(returnMock);
    });

    it('should render FSI context with custom theme', async () => {
        const currContext: { [key: string]: any } = {};
        const theme: FSITheme = {
            palette: {
                black: 'white',
            },
        };
        const { findByText } = render(
            <FSIContainer {...params} theme={theme}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.theme.palette.black).toEqual('white');
    });

    it('should render FSI context with different primary color', async () => {
        const currContext: { [key: string]: any } = {};
        const theme: FSITheme = {
            palette: {
                themePrimary: 'black',
            },
        };

        const colors: FSIThemeColors = {
            primaryColor: '#FF00FF',
        };
        const { findByText } = render(
            <FSIContainer {...params} theme={theme} fsiThemeColors={colors}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.theme.palette.themePrimary).toEqual('#FF00FF');
    });

    it('should render FSI context with default primary color for invalid color', async () => {
        const currContext: { [key: string]: any } = {};
        const colors: FSIThemeColors = {
            primaryColor: '',
        };
        const { findByText } = render(
            <FSIContainer {...params} fsiThemeColors={colors}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();

        expect(currContext.value.theme.palette.themePrimary).toEqual(FSIDefaultPartialTheme.palette.themePrimary);
    });

    it('should render FSI context with locale', async () => {
        const currContext: { [key: string]: any } = {};
        const { findByText } = render(
            <FSIContainer {...params} locale={'he-IL'}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.locale).toEqual('he-IL');
    });

    it('should render FSI context with default locale', async () => {
        const currContext: { [key: string]: any } = {};
        const { findByText } = render(
            <FSIContainer {...params}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.locale).toEqual('en-US');
    });

    it('should render FSI context with currency details', async () => {
        const currContext: { [key: string]: any } = {};
        const currenciesDetails: ICurrenciesDetails = {
            baseCurrencyCode: 'ILS',
            baseCurrencyId: 'currencyId',
            currencies: {
                currencyId: {
                    code: 'ILS',
                    name: 'Israeli Shekel',
                    id: 'currencyId',
                    precision: 2,
                    symbol: '₪',
                },
            },
        };

        const { findByText } = render(
            <FSIContainer {...params} currenciesDetails={currenciesDetails}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.currenciesDetails).toEqual(currenciesDetails);
    });

    it('should render FSI context with default currency details', async () => {
        const currContext: { [key: string]: any } = {};
        const { findByText } = render(
            <FSIContainer {...params}>
                <FSIContextChildMock context={currContext} />
            </FSIContainer>
        );

        expect(await findByText(MOCKED_FSI_CONTEXT_TEXT)).toBeVisible();
        expect(currContext.value.currenciesDetails).toEqual(MockCurrenciesDetails);
    });
});

const params = {};
