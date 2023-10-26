import React, { FC } from 'react';
import LifeEventCategory from '../../LifeEventCategory/LifeEventCategory';
import { Stack } from '@fluentui/react/lib/Stack';
import { SpinnerSize, Spinner } from '@fluentui/react/lib/Spinner';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';
import { LifeEventErrorDialog } from '../../LifeEventErrorDialog/LifeEventErrorDialog';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ILifeEventConfigurations } from '../../../interfaces/Configuration';
import { LifeEventCategory as LifeEventCategoryType } from '../../../interfaces/Category';
import { LifeEvent } from '../../../interfaces';
import { DialogConfig } from '../../../interfaces/LifeEvents.interface';
import LifeEventsDetailsSidePanel from '../../LifeEventsSidePanel/LifeEventsSidePanel';
import EditEventDialog from '../../EditEventDialog/EditEventDialog';
import EditFinancialGoalDialog from '../../../goals/components/EditFinancialGoalDialog/EditFinancialGoalDialog';

const subTitleStateStyle = { subtitle: { paddingBottom: 0 } };

interface IContentProps {
    loading: LoadingState;
    configuration?: ILifeEventConfigurations;
    categoriesCollection: LifeEventCategoryType[];
    handleCategoryClicked: (code: number) => void;
    editDialogConfig?: DialogConfig | undefined;
    handleCloseEditDialog: () => void;
    onSave: (lifeEvent: LifeEvent) => Promise<string>;
    hideModifyButtons?: boolean;
    readonly?: boolean;
    editFinancialGoalsDialog?: DialogConfig | undefined;
    handleCloseFinancialGoalsDialog: () => void;
    editPopUp: boolean;
    setPopUp: (config?: boolean) => void;
}

const Content: FC<IContentProps> = ({
    loading,
    configuration,
    categoriesCollection,
    handleCategoryClicked,
    editDialogConfig,
    handleCloseEditDialog,
    onSave,
    hideModifyButtons,
    readonly,
    editFinancialGoalsDialog,
    handleCloseFinancialGoalsDialog,
    editPopUp,
    setPopUp,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);
    const translateCommon = useTranslation();
    const categoriesCollectionLength = categoriesCollection?.length;

    if (loading === LoadingState.Error) {
        return <ErrorState styles={subTitleStateStyle} />;
    }

    if (!configuration || (!categoriesCollection.length && loading === LoadingState.Loading)) {
        return (
            <Stack style={{ height: 100 }} verticalAlign="center">
                <Spinner size={SpinnerSize.large} label={translateCommon('CONNECTING_WITH_DATA')} />
            </Stack>
        );
    }

    if (categoriesCollectionLength === 0) {
        return (
            <EmptyState
                styles={subTitleStateStyle}
                title={translate('LIFE_EVENTS_EMPTY_STATE_TITLE')}
                subtitle={translate('LIFE_EVENTS_EMPTY_STATE_SUBTITLE')}
            />
        );
    }

    return (
        <>
            {categoriesCollection?.map(categoryBlock => (
                <LifeEventCategory
                    key={categoryBlock.categoryCode}
                    categoryName={categoryBlock.categoryName}
                    categoryCode={categoryBlock.categoryCode}
                    icon={categoryBlock.icon}
                    displayOrder={categoryBlock.displayOrder}
                    onClick={handleCategoryClicked}
                    lifeEvents={categoryBlock.lifeEvents}
                    readonly={readonly}
                    hideModifyButtons={hideModifyButtons}
                />
            ))}
            <LifeEventsDetailsSidePanel />
            {editDialogConfig && (
                <EditEventDialog
                    configuration={configuration}
                    categoriesCollection={categoriesCollection}
                    visible={!!editDialogConfig}
                    initialValue={editDialogConfig?.initialValue}
                    onDialogDismiss={handleCloseEditDialog}
                    onSave={onSave}
                />
            )}
            {editFinancialGoalsDialog && (
                <EditFinancialGoalDialog
                    configuration={configuration}
                    categoriesCollection={categoriesCollection}
                    visible={!!editFinancialGoalsDialog}
                    initialValue={editFinancialGoalsDialog?.initialValue}
                    onDialogDismiss={handleCloseFinancialGoalsDialog}
                    onSave={onSave}
                    editPopUp={!!editPopUp}
                    setPopUp={setPopUp}
                    isNewGoal={editFinancialGoalsDialog?.enableEdit}
                />
            )}
            <LifeEventErrorDialog />
        </>
    );
};

export default Content;
