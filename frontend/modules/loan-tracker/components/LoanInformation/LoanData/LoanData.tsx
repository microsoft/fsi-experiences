import React, { FC } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Text } from '@fluentui/react/lib/Text';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import {
    categoryTextStyle,
    mainSectionInfoStyles,
    loanApplicationIconContainer,
    loanApplicationIconStyle,
    loanDataContainerStyles,
    loanDataMainSectionStyle,
    mainDataBoxTokens,
    mainDataStackTokens,
    mainStackTokens,
    mainTextStyle,
    typeTextStyle,
} from './LoanData.styles';
import { ILoanInformation, LoanInformationMetadata } from '../../../interfaces/ILoanInformation/ILoanInformation';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { DataBox } from '@fsi/core-components/dist/components/atoms/DataBox/DataBox';
import { useLocale } from '@fsi/core-components/dist/context/hooks/useLocale';
import { toDate } from '@fsi/core-components/dist/utilities/TimeUtils';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';

export interface ILoanDataProps {
    loanInformation: ILoanInformation;
    metadata: LoanInformationMetadata | undefined;
}

const MainSection: FC<{ name: string; type: string; category: string }> = ({ name, type, category }) => {
    const {
        palette: { themePrimary },
    } = useTheme();

    return (
        <Stack horizontalAlign="center" styles={loanDataMainSectionStyle} data-testid="main-section" tokens={mainDataStackTokens}>
            <Stack horizontalAlign="center">
                <Stack verticalAlign="center" horizontalAlign="center" styles={loanApplicationIconContainer(themePrimary)}>
                    <FontIcon aria-hidden="true" iconName="Money" style={loanApplicationIconStyle} />
                </Stack>
            </Stack>
            <Stack styles={mainSectionInfoStyles} horizontalAlign="center" tokens={{ childrenGap: 2 }}>
                <Stack.Item data-testid="main-section-loan-name">
                    <OverflowText styles={mainTextStyle} text={name} />
                </Stack.Item>
                <Text styles={typeTextStyle} data-testid="main-section-loan-type">
                    {type}
                </Text>
                <Text styles={categoryTextStyle} data-testid="main-section-loan-category">
                    {category}
                </Text>
            </Stack>
        </Stack>
    );
};

const DataSection: FC<{ title: string | undefined; text: string; currencyId?: string }> = ({ title, text, currencyId }) => (
    <>
        <Divider customClassName="loan-data-divider" />
        <DataBox boxDetails={{ label: title }} stackTokens={mainDataBoxTokens}>
            {currencyId ? (
                <Currency numberStyles={mainTextStyle} currencyStyles={mainTextStyle} currencyId={currencyId} value={+text} />
            ) : (
                <Text styles={mainTextStyle}>{text}</Text>
            )}
        </DataBox>
    </>
);

export const LoanData: FC<ILoanDataProps> = ({ loanInformation, metadata }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);
    const locale = useLocale();

    const N_A = translate('N_A');

    const name = loanInformation.name || N_A;
    const loanType = loanInformation.loanType || N_A;

    const category = loanInformation.category || N_A;

    const principalAmount = loanInformation.principalAmount?.toString() || N_A;
    const currencyId = principalAmount === N_A ? '' : loanInformation.currencyId;

    const loanTerm = loanInformation.loanTerm ? `${loanInformation.loanTerm} ${translate('MONTHS')}` : N_A;

    const applicationDate = loanInformation.applicationDate ? toDate(loanInformation.applicationDate, undefined, locale) : N_A;
    const interestRate = loanInformation.interestRate ? `${loanInformation.interestRate}%` : N_A;

    return (
        <Stack styles={loanDataContainerStyles} data-testid="loan-data" tokens={mainStackTokens}>
            <MainSection name={name} type={loanType} category={category} />
            <DataSection title={metadata?.principalAmount?.displayName} currencyId={currencyId} text={principalAmount} />
            <DataSection title={metadata?.loanTerm?.displayName} text={loanTerm} />
            <DataSection title={metadata?.applicationDate?.displayName} text={applicationDate} />
            <DataSection title={metadata?.interestRate?.displayName} text={interestRate} />
        </Stack>
    );
};

export default LoanData;
