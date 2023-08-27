import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { PartyList } from '../LoanPartiesList';
import PartyAssetsLiabilities from '../LoanPartyWithAssetsLiabilities';
import useLoanCustomerAssetsAndLiabilities from '../../hooks/useLoanCustomerWithFinancialItems/useLoanCustomerAssetsAndLiabilities';
import { ILoanApplicationAssetsAndLiabilitiesFetcher } from '../../interfaces/ILoanFinancialCategory/ILoanApplicationAssetsAndLiabilitiesFetcher';
import { rightWrapperStyles, rootStyles } from './LoanAssetsAndLiabilitiesTab.styles';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { useMediaQueryListener } from '@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener';
import { ApplicantFinancialItemCategories as CATEGORIES } from '../../constants/ApplicantFinancialItemCategories.consts';
import { LoanFinancialItemFormDialog, ASSET_LIABILITY_ADD_EDIT_DIALOG } from '../LoanFinancialItemFormDialog';
import { useDialogService } from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import { ILoanFinancialCategory } from '../../interfaces/ILoanFinancialCategory/ILoanFinancialCategory';
import useBrowserCommunication from '@fsi/core-components/dist/hooks/useBrowserCommunication';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { namespaces } from '@fsi/core-components/dist/constants/namespaces';
import useLoanFinancialActions from '../../hooks/useLoanFinancialActions/useLoanFinancialActions';
import { RemoveLoanFinancialItemDialog, REMOVE_FINANCIAL_ITEM_DIALOG } from '../RemoveLoanFinancialItemDialog';
import { FinancialGroupedTable } from '../FinancialGroupedTable';
import { FinancialItemActionsGroupBtn } from '../FinancialGroupedTable/FinancialItemActionsGroupBtn/FinancialItemActionsGroupBtn';
import { calculateFinancialValues } from '../../helpers/calculateFinancialValues/calculateFinancialValues';
import { getCategorizedFinancialItems } from '../../helpers/getCategorizedFinancialItems/getCategorizedFinancialItems';
import { getFinancialGroupedTableGroups } from '../../helpers/getFinancialGroupedTableGroups/getFinancialGroupedTableGroups';
import { maxWidthPartyListMediaChange } from '../../styles/Common.style';

interface LoanApplicationAssetsAndLiabilitiesProps {
    fetcher: ILoanApplicationAssetsAndLiabilitiesFetcher;
    loanApplicationId: string;
}

const LoanApplicationAssetsAndLiabilities: FC<LoanApplicationAssetsAndLiabilitiesProps> = ({ fetcher, loanApplicationId }) => {
    const {
        loanAssetsAndLiabilities,
        isError,
        assets,
        liabilities,
        isLoading,
        onChangeApplicant,
        onVerifyToggle,
        selectedApplicantId,
        applicants,
        selectedApplicant,
        isLoanLocked,
        assetTypes,
        liabilityTypes,
        hasApplicantPrivilege,
        hasFinancialItemPrivilege,
    } = useLoanCustomerAssetsAndLiabilities({ fetcher, loanApplicationId });

    const { context, isOpen, hideDialog, currentDialogId } = useDialogService();
    const category = context?.category?.toLowerCase() || '';
    const { addItem, updateItem, deleteItem } = useLoanFinancialActions({
        fetcher,
        category,
    });
    const isMediaMatched = useMediaQueryListener(`screen and (max-width: ${maxWidthPartyListMediaChange}px)`, window.parent);

    const { postMessage } = useBrowserCommunication('loan-popup-notification', window.parent);
    const { postMessage: postLoanChangeMessage } = useBrowserCommunication(`loanapp-change-${loanApplicationId}`);
    const financialFormTranslate = useTranslation(namespaces.FINANCIAL_CATEGORIES_FORM_FIELDS);

    const translate = useTranslation(namespaces.LOAN_CUSTOMER_LOOKUP);

    const partyAssetsLiabilitiesCommandButtonRef = useRef<HTMLButtonElement>(null);

    /* istanbul ignore next */
    useEffect(() => {
        // Checks only when assets and liabilities both empty arrays, but not undefined
        const assetsAndLiabilitiesEmpty = assets?.length === 0 && liabilities?.length === 0;
        let timeoutID;
        // focus `<PartyAssetsLiabilities>`'s command button when there are no assets and liabilities defined
        if (assetsAndLiabilitiesEmpty) {
            // grab a screen reader's/keyboard focus after the last asset/liability item has been removed
            timeoutID = setTimeout(() => {
                partyAssetsLiabilitiesCommandButtonRef.current?.focus();
            }, 700);
        }
        return () => {
            clearTimeout(timeoutID);
        };
    }, [assets, liabilities]);

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
                triggerButton: partyAssetsLiabilitiesCommandButtonRef.current!,
            });
            return res;
        },
        [deleteItem, hideDialogAndRefresh, financialFormTranslate, context.category]
    );

    const categorizedAssets = useMemo(() => {
        return getCategorizedFinancialItems({ items: assets, category: CATEGORIES.ASSET });
    }, [assets]);

    const categorizedLiabilities = useMemo(() => {
        return getCategorizedFinancialItems({ items: liabilities, category: CATEGORIES.LIABILITY, setNegativeValues: true });
    }, [liabilities]);

    /* istanbul ignore next*/
    const financialGroupedTableGroups = getFinancialGroupedTableGroups(
        {
            key: 'assets',
            name: translate('ASSETS', { applicantName: selectedApplicant?.firstName || translate('APPLICANT') }),
            total: calculateFinancialValues(categorizedAssets).total,
            startIndex: 0,
            count: categorizedAssets.length,
        },
        {
            key: 'liabilities',
            name: translate('LIABILITIES', { applicantName: selectedApplicant?.firstName || translate('APPLICANT') }),
            total: calculateFinancialValues(categorizedLiabilities).total,
            startIndex: categorizedAssets.length,
            count: categorizedLiabilities.length,
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
                    <PartyAssetsLiabilities
                        isLoading={isLoading}
                        isError={isError}
                        applicantName={selectedApplicant?.firstName}
                        allPartiesAssets={loanAssetsAndLiabilities.totalAssets}
                        allPartiesLiabilities={loanAssetsAndLiabilities.totalLiabilities}
                        applicantAssets={loanAssetsAndLiabilities.applicantTotalAssets}
                        applicantLiabilities={loanAssetsAndLiabilities.applicantTotalLiabilities}
                        currencyId={loanAssetsAndLiabilities.currencyId}
                        ref={partyAssetsLiabilitiesCommandButtonRef}
                        hasPrivilege={hasFinancialItemPrivilege}
                    />
                    <Divider />
                    <FinancialGroupedTable
                        groups={financialGroupedTableGroups}
                        data={[...categorizedAssets, ...categorizedLiabilities]}
                        actionsRenderer={financialGroupedTableActionsRenderer}
                        isLoading={isLoading}
                        isError={isError}
                        ariaLabelForTable={translate('LOAN_PROGRESS_ASSETS_AND_LIABILITIES_SECTION_NAME')}
                    />
                </Stack>
            </Stack>
            <LoanFinancialItemFormDialog
                onDismiss={hideDialog}
                onCancel={hideDialog}
                isOpen={isOpen && currentDialogId === ASSET_LIABILITY_ADD_EDIT_DIALOG}
                category={context.category}
                itemTypeOptions={context.category === CATEGORIES.ASSET ? assetTypes : liabilityTypes}
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

export default LoanApplicationAssetsAndLiabilities;
