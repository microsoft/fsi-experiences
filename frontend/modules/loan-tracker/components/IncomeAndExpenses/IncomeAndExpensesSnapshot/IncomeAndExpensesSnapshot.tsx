import { DirectionalHint } from '@fluentui/react/lib/components/ContextualMenu/ContextualMenu.types';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import { COLORS } from '@fsi/core-components/dist/constants/Colors';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { emptyStateStyles } from '../../../styles/Common.style';
import EmptyState from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { Indicator } from '@fsi/core-components/dist/components/atoms/Indicator/Indicator';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import { useId } from '@fluentui/react-hooks/lib/useId';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { incomeAndExpensesSnapshotTestID } from './IncomeAndExpensesSnapshot.const';
import type { IIncomeAndExpensesSnapshotProps } from './IncomeAndExpensesSnapshot.interface';
import { iAndEButtonIconStyles, iAndECurrencyBaseStyles, iAndECurrencyNumberStyles, iAndEStackRootStyles } from './IncomeAndExpensesSnapshot.style';

export const IncomeAndExpensesSnapshot: FC<IIncomeAndExpensesSnapshotProps> = ({
    totalNetBalance,
    applicantNetBalance,
    applicants,
    selectedApplicant,
    isLoading,
    isError,
    currencyId,
}) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);

    const headingId = useId('incomeAndExpensesShanpshotHeading');

    const numberOfBorrowers = applicants?.length;

    const isEmpty = (!totalNetBalance && !applicantNetBalance) || !numberOfBorrowers || !selectedApplicant;

    const showCombinedBalance = numberOfBorrowers > 1;

    const balanceText = showCombinedBalance
        ? translate('COMBINED_MONTHLY_NET_BALANCE', {
              numberOfBorrowers: numberOfBorrowers,
          })
        : translate('APPLICANT_MONTHLY_NET_BALANCE', {
              primaryApplicantName: selectedApplicant?.firstName || translate('PRIMARY_APPLICANT'),
          });

    return (
        <InfoSection
            mainTitle={translate('INCOME_AND_EXPENSES_SECTION_TITLE')}
            isError={!!isError}
            isLoading={!!isLoading}
            headingId={headingId}
            currencyId={currencyId}
        >
            {isEmpty ? (
                <EmptyState styles={emptyStateStyles} title={translate('EMPTY_STATE_TABLE_INCOME_AND_EXPENSES')} />
            ) : (
                <Stack horizontal styles={iAndEStackRootStyles} verticalAlign="center" data-testid={incomeAndExpensesSnapshotTestID}>
                    <OverflowText text={balanceText} overflowModeSelf />
                    {showCombinedBalance && (
                        <Indicator
                            tooltipProps={{
                                content: translate('INCOME_AND_EXPENSES_BORROWERS_TOOLTIP'),
                                directionalHint: DirectionalHint.topCenter,
                            }}
                            size={12}
                            buttonStyles={iAndEButtonIconStyles}
                            iconName="info"
                            color={COLORS.darkGray}
                            iconAriaLabel={translate('ARIA_LABEL_INFO')}
                        />
                    )}
                    <Currency
                        styles={iAndECurrencyBaseStyles}
                        numberStyles={iAndECurrencyNumberStyles}
                        compact
                        value={showCombinedBalance ? totalNetBalance : applicantNetBalance}
                    ></Currency>
                </Stack>
            )}
        </InfoSection>
    );
};

export default IncomeAndExpensesSnapshot;
