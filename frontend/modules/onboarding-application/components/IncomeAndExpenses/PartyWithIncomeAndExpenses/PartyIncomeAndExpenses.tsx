import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { useRef } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useId } from '@fluentui/react-hooks';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import type { IPartyIncomeAndExpensesProps } from './IPartyIncomeAndExpenses';
import { InfoSection } from '@fsi/core-components/dist/components/containers/InfoSection/InfoSection';
import { ApplicantFinancialItemCategories as FINANCIAL_CATEGORIES } from '../../../constants/FinancialCategories.const';
import {
    partyIAndE_CurrencyBaseStyles,
    partyIAndE_CurrencyCodeStyles,
    partyIAndE_CurrencyNumberStyles,
    partyIAndE_MainStackStyles,
    partyIAndE_RowStyles,
    partyIAndE_TextStyles,
} from './PartyIncomeAndExpenses.style';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import Currency from '@fsi/core-components/dist/components/containers/Currency/Currency';
import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';

import { RefObject } from '@fluentui/react/lib/Utilities';
import { PrivilegeType } from '@fsi/core-components/dist/enums/PrivilegeType';
import { INCOME_EXPENSE_ADD_EDIT_DIALOG } from '../../FinancialItemFormDialog';
import { emptyStateStyles } from '../IncomeAndExpensesWidget/IncomeAndExpensesSnapshot/IncomeAndExpensesSnapshot.style';
import { EmptyState } from '@fsi/core-components/dist/components/atoms';
import { INCOME_AND_EXPENSES } from '../../../constants/namespaces.const';

const srTableSummaryDescriptionID = 'srTableSummaryDescription';

export const PartyIncomeAndExpenses = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<IPartyIncomeAndExpensesProps>>(
    (
        { numberOfApplicants, showOnlyCombinedData, applicantName, applicantNetBalance, totalNetBalance, isError, isLoading, hasPrivilege },
        commandBtnRef
    ) => {
        const translate = useTranslation(INCOME_AND_EXPENSES);
        const { showDialog } = useDialogService();

        const infoSectionCommandBtnRef = useRef<HTMLButtonElement>(null);

        const partyIandEHeadingId = useId('partyIncomeAndExpensesHeading');

        const primaryApplicantRowName = translate('APPLICANT_MONTHLY_NET_BALANCE', {
            primaryApplicantName: applicantName || translate('APPLICANT'),
        });

        const srAddNewIncomeExpenseItemText = translate('SR_ADD_NEW_INCOME_OR_EXPENSE_ITEM');

        const showCombinedBalance = numberOfApplicants > 1;

        const combinedBalanceRowName = showCombinedBalance
            ? translate('COMBINED_MONTHLY_NET_BALANCE', {
                  numberOfApplicants: numberOfApplicants,
              })
            : translate('APPLICANT_MONTHLY_NET_BALANCE', {
                  primaryApplicantName: applicantName || translate('PRIMARY_APPLICANT'),
              });

        const isEmpty = (!totalNetBalance && !applicantNetBalance) || !numberOfApplicants;

        const addIncomeDisabled = !hasPrivilege?.(FINANCIAL_CATEGORIES.INCOME, PrivilegeType.Create);
        const addExpenseDisabled = !hasPrivilege?.(FINANCIAL_CATEGORIES.EXPENSE, PrivilegeType.Create);

        return (
            <InfoSection
                mainTitle={translate('APPLICANT_INCOME_AND_EXPENSES_HEADER_TITLE')}
                isError={!!isError}
                hideTitle={!showOnlyCombinedData}
                isLoading={!!isLoading}
                headingId={partyIandEHeadingId}
                ref={commandBtnRef || infoSectionCommandBtnRef}
                commandProps={
                    !showOnlyCombinedData
                        ? {
                              iconProps: {
                                  iconName: 'Add',
                              },
                              text: translate('ADD_NEW_ITEM'),
                              ariaLabel: srAddNewIncomeExpenseItemText,
                              menuProps: {
                                  ariaLabel: srAddNewIncomeExpenseItemText,
                                  items: [
                                      {
                                          key: 'addIncome',
                                          name: translate('NEW_INCOME'),
                                          onClick: () => {
                                              /* istanbul ignore next */
                                              showDialog(INCOME_EXPENSE_ADD_EDIT_DIALOG, {
                                                  category: FINANCIAL_CATEGORIES.INCOME,
                                                  triggerButton: ((commandBtnRef || infoSectionCommandBtnRef) as RefObject<HTMLButtonElement>)
                                                      ?.current,
                                              });
                                          },
                                          disabled: addIncomeDisabled,
                                      },
                                      {
                                          key: 'addExpense',
                                          name: translate('NEW_EXPENSE'),
                                          onClick: () => {
                                              /* istanbul ignore next */
                                              showDialog(INCOME_EXPENSE_ADD_EDIT_DIALOG, {
                                                  category: FINANCIAL_CATEGORIES.EXPENSE,
                                                  triggerButton: ((commandBtnRef || infoSectionCommandBtnRef) as RefObject<HTMLButtonElement>)
                                                      ?.current,
                                              });
                                          },
                                          disabled: addExpenseDisabled,
                                      },
                                  ],
                              },
                              disabled: isLoading,
                          }
                        : undefined
                }
            >
                {isEmpty ? (
                    <EmptyState styles={emptyStateStyles} title={translate('EMPTY_STATE_TABLE_INCOME_AND_EXPENSES')} />
                ) : (
                    <Stack styles={partyIAndE_MainStackStyles} data-testid="party-income-and-expenses" aria-describedby={srTableSummaryDescriptionID}>
                        <ScreenReaderText id={srTableSummaryDescriptionID}>{translate('TABLE_SUMMARY_SR_TEXT')}</ScreenReaderText>
                        <Stack styles={partyIAndE_RowStyles} data-testid="primary-applicant-balance-row" horizontal verticalAlign="center">
                            <OverflowText styles={partyIAndE_TextStyles} text={primaryApplicantRowName} overflowModeSelf />
                            <Currency
                                styles={partyIAndE_CurrencyBaseStyles}
                                currencyStyles={partyIAndE_CurrencyCodeStyles}
                                numberStyles={partyIAndE_CurrencyNumberStyles}
                                compact
                                value={applicantNetBalance}
                            ></Currency>
                        </Stack>
                        {showCombinedBalance && (
                            <Stack styles={partyIAndE_RowStyles} data-testid="combined-balance-row" horizontal verticalAlign="center">
                                <OverflowText styles={partyIAndE_TextStyles} text={combinedBalanceRowName} overflowModeSelf />
                                <Currency
                                    styles={partyIAndE_CurrencyBaseStyles}
                                    currencyStyles={partyIAndE_CurrencyCodeStyles}
                                    numberStyles={partyIAndE_CurrencyNumberStyles}
                                    compact
                                    value={showCombinedBalance ? totalNetBalance : applicantNetBalance}
                                ></Currency>
                            </Stack>
                        )}
                    </Stack>
                )}
            </InfoSection>
        );
    }
);

export default PartyIncomeAndExpenses;
