import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider/Divider';
import { PartyIncomeAndExpenses } from '../LoanPartyWithIncomeAndExpenses';
import { PartyList } from '../LoanPartiesList';
import { maxWidthPartyListMediaChange } from '../../styles/Common.style';
import { useMediaQueryListener } from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import useLoanCustomerIncomeAndExpenses from '../../hooks/useLoanCustomerWithFinancialItems/useLoanCustomerIncomeAndExpenses';
import type { ILoanApplicationIncomeAndExpensesProps } from './LoanIncomeAndExpensesTab.interface';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/ApplicantFinancialItemCategories.consts';
import { LoanFinancialItemFormDialog, INCOME_EXPENSE_ADD_EDIT_DIALOG } from '../LoanFinancialItemFormDialog';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import { ILoanFinancialCategory } from '../../interfaces/ILoanFinancialCategory/ILoanFinancialCategory';
import { rightWrapperStyles, rootStyles } from './LoanIncomeAndExpensesTab.style';
import useLoanFinancialActions from '../../hooks/useLoanFinancialActions/useLoanFinancialActions';
import { RemoveLoanFinancialItemDialog, REMOVE_FINANCIAL_ITEM_DIALOG } from '../RemoveLoanFinancialItemDialog';
import { FinancialGroupedTable } from '../FinancialGroupedTable/FinancialGroupedTable';
import { calculateFinancialValues } from '../../helpers/calculateFinancialValues/calculateFinancialValues';
import { FinancialItemActionsGroupBtn } from '../FinancialGroupedTable/FinancialItemActionsGroupBtn';
import { getCategorizedFinancialItems } from '../../helpers/getCategorizedFinancialItems/getCategorizedFinancialItems';
import { getFinancialGroupedTableGroups } from '../../helpers/getFinancialGroupedTableGroups/getFinancialGroupedTableGroups';

export const LoanApplicationIncomeAndExpenses: FC<ILoanApplicationIncomeAndExpensesProps> = ({ fetcher, loanApplicationId }) => {
    const {
        isError,
        income,
        expenses,
        loanIncomeAndExpenses,
        isLoading,
        onChangeApplicant,
        onVerifyToggle,
        selectedApplicantId,
        applicants,
        selectedApplicant,
        isLoanLocked,
        incomeTypes,
        expenseTypes,
        hasApplicantPrivilege,
        hasFinancialItemPrivilege,
    } = useLoanCustomerIncomeAndExpenses({ fetcher, loanApplicationId });

    const isMediaMatched = useMediaQueryListener(`screen and (max-width: ${maxWidthPartyListMediaChange}px)`, window.parent);
    const { context, isOpen, hideDialog, currentDialogId } = useDialogService();
    const category = context?.category?.toLowerCase() || '';
    const { addItem, updateItem, deleteItem } = useLoanFinancialActions({
        fetcher,
        category,
    });

    const { postMessage } = useBrowserCommunication('loan-popup-notification', window.parent);
    const { postMessage: postLoanChangeMessage } = useBrowserCommunication(`loanapp-change-${loanApplicationId}`);
    const financialFormTranslate = useTranslation(namespaces.FINANCIAL_CATEGORIES_FORM_FIELDS);

    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);

    const partyIncomeExpensesCommandButtonRef = useRef<HTMLButtonElement>(null);

    /* istanbul ignore next */
    useEffect(() => {
        // Checks only when income and expenses both empty arrays, but not undefined
        const incomeAndExpensesEmpty = income?.length === 0 && expenses?.length === 0;
        let timeoutID;
        // focus `<PartyIncomeAndExpenses>`'s command button when there are no income and expenses defined
        if (incomeAndExpensesEmpty) {
            // grab a screen reader's/keyboard focus after the last income/expense item has been removed
            timeoutID = setTimeout(() => {
                partyIncomeExpensesCommandButtonRef.current?.focus();
            }, 700);
        }
        return () => {
            clearTimeout(timeoutID);
        };
    }, [income, expenses]);

    /* istanbul ignore next */
    const hideDialogAndRefresh = useCallback(
        ({ notificationMsg, triggerButton }: { notificationMsg: string; triggerButton?: HTMLButtonElement }) => {
            hideDialog();
            postMessage(notificationMsg);
            postLoanChangeMessage(loanApplicationId);

            if (triggerButton) {
                // grab a screen reader's/keyboard focus
                setTimeout(() => {
                    triggerButton?.focus();
                }, 700);
            }
        },
        [hideDialog, postMessage, postLoanChangeMessage, loanApplicationId]
    );
    /* istanbul ignore next */
    const onSubmit = useCallback(
        async (item: ILoanFinancialCategory) => {
            const res = await (item.id ? updateItem(item, context.index) : addItem(item));
            hideDialogAndRefresh({
                notificationMsg: financialFormTranslate(`${context.category}_${item.id ? 'UPDATE' : 'ADD'}_STATUSES_SUCCESS`, {
                    name: item.name || item.description,
                }),
            });

            return res;
        },
        [updateItem, context.index, context.category, addItem, hideDialogAndRefresh, financialFormTranslate]
    );
    /* istanbul ignore next */
    const onDelete = useCallback(
        async (item: ILoanFinancialCategory, index: number) => {
            const res = await deleteItem(item.id, index);
            hideDialogAndRefresh({
                notificationMsg: financialFormTranslate(`${context.category}_DELETE_STATUSES_SUCCESS`, { name: item.name || item.description }),
                triggerButton: partyIncomeExpensesCommandButtonRef.current!,
            });
            return res;
        },
        [deleteItem, hideDialogAndRefresh, financialFormTranslate, context.category]
    );

    const categorizedIncome = useMemo(() => {
        return getCategorizedFinancialItems({ items: income, category: CATEGORIES.INCOME });
    }, [income]);

    const categorizedExpenses = useMemo(() => {
        return getCategorizedFinancialItems({ items: expenses, category: CATEGORIES.EXPENSE, setNegativeValues: true });
    }, [expenses]);

    /* istanbul ignore next*/
    const financialGroupedTableGroups = getFinancialGroupedTableGroups(
        {
            key: 'income',
            name: translate('MONTHLY_INCOME', { applicantName: selectedApplicant?.firstName || translate('APPLICANT') }),
            total: calculateFinancialValues(categorizedIncome).total,
            startIndex: 0,
            count: categorizedIncome.length,
        },
        {
            key: 'expenses',
            name: translate('MONTHLY_EXPENSES', { applicantName: selectedApplicant?.firstName || translate('APPLICANT') }),
            total: calculateFinancialValues(categorizedExpenses).total,
            startIndex: categorizedIncome.length,
            count: categorizedExpenses.length,
        }
    );

    const financialGroupedTableActionsRenderer = (item, index, isSmallScreen) => (
        <FinancialItemActionsGroupBtn item={item} index={index} compactMode={isSmallScreen} hasPrivilege={hasFinancialItemPrivilege} />
    );

    return (
        <>
            <Stack horizontal={!isMediaMatched} styles={rootStyles}>
                <Stack>
                    <PartyList
                        isLoanLocked={isLoanLocked}
                        items={applicants}
                        selectedApplicantId={selectedApplicantId}
                        onChange={onChangeApplicant}
                        onVerifyToggle={onVerifyToggle}
                        isLoading={isLoading}
                        isError={isError}
                        hasApplicantPrivilege={hasApplicantPrivilege}
                    />
                </Stack>
                <Stack grow styles={rightWrapperStyles}>
                    <PartyIncomeAndExpenses
                        totalNetBalance={loanIncomeAndExpenses.totalNetBalance}
                        applicantNetBalance={loanIncomeAndExpenses.applicantNetBalance}
                        numberOfApplicants={applicants?.length!}
                        applicantName={selectedApplicant?.firstName!}
                        isLoading={isLoading}
                        isError={isError}
                        currencyId={loanIncomeAndExpenses?.currencyId}
                        ref={partyIncomeExpensesCommandButtonRef}
                        hasPrivilege={hasFinancialItemPrivilege}
                    />
                    <Divider />
                    <FinancialGroupedTable
                        groups={financialGroupedTableGroups}
                        data={[...categorizedIncome, ...categorizedExpenses]}
                        actionsRenderer={financialGroupedTableActionsRenderer}
                        isLoading={isLoading}
                        isError={isError}
                        ariaLabelForTable={translate('APPLICANT_INCOME_AND_EXPENSES_HEADER_TITLE', {
                            primaryApplicantName: selectedApplicant?.firstName || translate('APPLICANT'),
                        })}
                    />
                </Stack>
            </Stack>
            <LoanFinancialItemFormDialog
                onDismiss={hideDialog}
                onCancel={hideDialog}
                isOpen={isOpen && currentDialogId === INCOME_EXPENSE_ADD_EDIT_DIALOG}
                category={context.category}
                itemTypeOptions={context.category === CATEGORIES.INCOME ? incomeTypes : expenseTypes}
                item={context.item || { id: '', name: '', type: '', value: 0, customerId: selectedApplicantId }}
                onSubmit={onSubmit}
            />
            <RemoveLoanFinancialItemDialog
                item={context.item}
                category={context.category}
                isOpen={isOpen && currentDialogId === REMOVE_FINANCIAL_ITEM_DIALOG}
                onDismiss={hideDialog}
                onCancel={hideDialog}
                onSubmit={onDelete}
                itemIndex={context.index}
            />
        </>
    );
};

export default LoanApplicationIncomeAndExpenses;
