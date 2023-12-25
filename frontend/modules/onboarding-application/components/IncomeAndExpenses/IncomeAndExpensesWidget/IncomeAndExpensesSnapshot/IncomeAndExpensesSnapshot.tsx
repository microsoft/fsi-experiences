import { useId } from '@fluentui/react-hooks';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import EmptyState from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import React, { FC } from 'react';
import { INCOME_AND_EXPENSES } from '../../../../constants/namespaces.const';
import { emptyStateStyles } from '../../../../styles/Common.style';
import { incomeAndExpensesSnapshotTestID } from './IncomeAndExpensesSnapshot.const';
import type { IIncomeAndExpensesSnapshotProps } from './IncomeAndExpensesSnapshot.interface';
import { iAndECurrencyBaseStyles, iAndECurrencyNumberStyles, iAndEStackRootStyles } from './IncomeAndExpensesSnapshot.style';

export const IncomeAndExpensesSnapshot: FC<IIncomeAndExpensesSnapshotProps> = ({
    totalNetBalance,
    applicantNetBalance,
    applicantsCount,
    selectedApplicant,
    isLoading,
    isError,
    currencyId,
}) => {
    const translate = useTranslation(INCOME_AND_EXPENSES);

    const headingId = useId('incomeAndExpensesWidgetHeading');

    const isEmpty = (!totalNetBalance && !applicantNetBalance) || !applicantsCount || !selectedApplicant;

    const showCombinedBalance = applicantsCount > 1;

    const balanceText = showCombinedBalance
        ? translate('COMBINED_MONTHLY_NET_BALANCE', {
              applicantsCount: applicantsCount,
          })
        : translate('APPLICANT_MONTHLY_NET_BALANCE', {
              primaryApplicantName: selectedApplicant?.name || translate('PRIMARY_APPLICANT'),
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
