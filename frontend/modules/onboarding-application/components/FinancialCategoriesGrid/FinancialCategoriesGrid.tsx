import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import Widget from '@fsi/core-components/dist/components/atoms/Widget/Widget';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import useDialogService from '@fsi/core-components/dist/hooks/useDialogService/useDialogService';
import React, { FC, useRef } from 'react';
import { useQuery } from 'react-query';
import { FinancialCategories, FirstGroup, SecondGroup } from '../../constants/FinancialCategories.const';
import { APPLICANTS_QUERY } from '../../constants/FinancialCategoriesQueries.const';
import { ASSETS_AND_LIABILITIES, INCOME_AND_EXPENSES } from '../../constants/namespaces.const';
import { useApplicantData } from '../../hooks/useApplicantData';
import useFinancialActionDialog from '../../hooks/useFinancialActionDialog';
import { useFocusWhenEmptyState } from '../../hooks/useFocusWhenEmptyState';
import useGridData from '../../hooks/useGridData';
import { useGroupedFinancialItems } from '../../hooks/useGroupedFinancialItems';
import { IApplicantFetcher } from '../../interfaces/IApplicantFetcher';
import { IFinancialCategoryFetcher } from '../../interfaces/IFinancialCategoryFetcher';
import FinancialCategoriesWidget from '../FinancialCategoriesWidget/FinancialCategoriesWidget';
import { FinancialGroupedTable } from '../FinancialGroupedTable';
import { FinancialItemActionsGroupBtn } from '../FinancialGroupedTable/FinancialItemActionsGroupBtn';
import { ASSET_LIABILITY_ADD_EDIT_DIALOG, FinancialItemFormDialog, INCOME_EXPENSE_ADD_EDIT_DIALOG, REMOVE_FINANCIAL_ITEM_DIALOG } from '../FinancialItemFormDialog';
import { NotificationContainerWrapper } from '../NotificationContainerWrapper/NotificationContainerWrapper';
import {  RemoveFinancialItemDialog } from '../RemoveFinancialItemDialog';

interface FinancialCategoriesGridProps {
    financialCategoryFetchers: IFinancialCategoryFetcher[];
    applicantFetcher: IApplicantFetcher;
    applicantId: string;
    financialItemsType: string;
}

const FinancialCategoriesGrid: FC<FinancialCategoriesGridProps> = ({
    applicantId,
    applicantFetcher,
    financialItemsType,
    financialCategoryFetchers,
}) => {
    const selectedFinancialItemsGroup = FinancialCategories[financialItemsType];

    const { financialItems, snapshot, financialItemsTypes, isLoading, isError, currencyId } = useGridData({
        fetchers: financialCategoryFetchers,
        applicantId,
        queryName: selectedFinancialItemsGroup.query,
    });

    const {
        applicantName,
        hasFinancialItemPrivilege,
        applicationId,
        isError: isErrorApplicantData,
        isLoading: isLoadingApplicantData,
    } = useApplicantData({
        fetcher: applicantFetcher,
        applicantId,
    });

    const {
        data: applicantsCount = 1,
        isLoading: isLoadingApplicantsCount,
        isError: isErrorApplicantsCount,
    } = useQuery([APPLICANTS_QUERY, applicationId], () => {
        return applicantFetcher.getApplicantsCount(applicationId);
    });

    const { context, isOpen, hideDialog, currentDialogId } = useDialogService();
    const translate = useTranslation(financialItemsType);
    const FinancialItemsWidgetCommandButtonRef = useRef<HTMLButtonElement>(null);

    const { onSubmit: onSubmitFirstFinancialCategory, onDelete: onDeleteFirstFinancialCategory } = useFinancialActionDialog({
        fetcher: financialCategoryFetchers[FirstGroup],
        applicantId,
        commandButtonRef: FinancialItemsWidgetCommandButtonRef,
    });
    const { onSubmit: onSubmitSecondFinancialCategory, onDelete: onDeleteSecondFinancialCategory } = useFinancialActionDialog({
        fetcher: financialCategoryFetchers[SecondGroup],
        applicantId,
        commandButtonRef: FinancialItemsWidgetCommandButtonRef,
    });

    const onSubmit =
        financialItemsType === ASSETS_AND_LIABILITIES
            ? { ASSET: onSubmitFirstFinancialCategory, LIABILITY: onSubmitSecondFinancialCategory }
            : { INCOME: onSubmitFirstFinancialCategory, EXPENSE: onSubmitSecondFinancialCategory };

    const onDelete =
        financialItemsType === ASSETS_AND_LIABILITIES
            ? { ASSET: onDeleteFirstFinancialCategory, LIABILITY: onDeleteSecondFinancialCategory }
            : { INCOME: onDeleteFirstFinancialCategory, EXPENSE: onDeleteSecondFinancialCategory };

    useFocusWhenEmptyState({ financialItems: financialItems, buttonReference: FinancialItemsWidgetCommandButtonRef });

    const financialGroupedTableGroups = useGroupedFinancialItems({
        groupsFinancialItems: [
            {
                key: selectedFinancialItemsGroup.types[FirstGroup],
                name: translate(selectedFinancialItemsGroup.name[FirstGroup], {
                    applicantName: applicantName || translate('APPLICANT'),
                }),
                financialItems: financialItems[FirstGroup],
            },
            {
                key: selectedFinancialItemsGroup.types[SecondGroup],
                name: translate(selectedFinancialItemsGroup.name[SecondGroup], {
                    applicantName: applicantName || translate('APPLICANT'),
                }),
                financialItems: financialItems[SecondGroup],
            },
        ],
    });

    const financialGroupedTableActionsRenderer = (item, index, isSmallScreen) => (
        <FinancialItemActionsGroupBtn item={item} index={index} compactMode={isSmallScreen} hasPrivilege={hasFinancialItemPrivilege} />
    );

    return (
        <Widget
            isLoading={isLoading || isLoadingApplicantsCount || isLoadingApplicantData}
            name="financial-items-grid"
            isError={isError || isErrorApplicantsCount || isErrorApplicantData}
        >
            <Stack>
                <FinancialCategoriesWidget
                    financialItemsType={financialItemsType}
                    hasFinancialItemPrivilege={hasFinancialItemPrivilege}
                    isLoading={isLoading || isLoadingApplicantData || isLoadingApplicantsCount}
                    isError={isError || isErrorApplicantData || isErrorApplicantsCount}
                    applicantName={applicantName}
                    currencyId={currencyId}
                    commandBtnRef={FinancialItemsWidgetCommandButtonRef}
                    applicantsCount={applicantsCount}
                    snapshot={snapshot}
                />

                <Divider />
                <FinancialGroupedTable
                    groups={financialGroupedTableGroups}
                    data={[...financialItems[FirstGroup], ...financialItems[SecondGroup]]}
                    actionsRenderer={financialGroupedTableActionsRenderer}
                    isLoading={isLoading || isLoadingApplicantsCount || isLoadingApplicantData}
                    isError={isError || isErrorApplicantsCount || isErrorApplicantData}
                    ariaLabelForTable={translate(FinancialCategories[financialItemsType]['label'], {
                        primaryApplicantName: applicantName! || translate('APPLICANT'),
                    })}
                />
            </Stack>
            <FinancialItemFormDialog
                onDismiss={hideDialog}
                onCancel={hideDialog}
                isOpen={
                    isOpen &&
                    ((financialItemsType === ASSETS_AND_LIABILITIES && currentDialogId === ASSET_LIABILITY_ADD_EDIT_DIALOG) ||
                        (financialItemsType === INCOME_AND_EXPENSES && currentDialogId === INCOME_EXPENSE_ADD_EDIT_DIALOG))
                }
                category={context.category}
                itemTypeOptions={financialItemsTypes[context.category]}
                item={context.item || { id: '', name: '', type: '', value: 0, customerId: applicantId }}
                onSubmit={onSubmit[context.category]}
            />
            <RemoveFinancialItemDialog
                item={context.item}
                category={context.category}
                isOpen={isOpen && currentDialogId === REMOVE_FINANCIAL_ITEM_DIALOG}
                onDismiss={hideDialog}
                onCancel={hideDialog}
                onSubmit={onDelete[context.category]}
                itemIndex={context.index}
            />
        </Widget>
    );
};

const FinancialCategoriesGridWrapper = props => {
    return (
        <NotificationContainerWrapper>
            <FinancialCategoriesGrid {...props} />
        </NotificationContainerWrapper>
    );
};

export default FinancialCategoriesGridWrapper;
