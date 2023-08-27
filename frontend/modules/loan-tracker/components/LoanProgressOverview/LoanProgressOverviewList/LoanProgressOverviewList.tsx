import React, { FC, useCallback, useMemo } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { DetailsList } from '@fluentui/react/lib/components/DetailsList/DetailsList';
import { DetailsListLayoutMode } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { SelectionMode } from '@fluentui/utilities/lib/selection';
import { ActionButton } from '@fluentui/react/lib/components/Button/ActionButton/ActionButton';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ListColumnsKeys, cellStyleProps } from './LoanProgressOverviewList.const';
import {
    completedIconStyles,
    detailsHeaderStyles,
    openButtonStackTokens,
    openButtonStyles,
    overflowTextStyle,
    rowTextStyle,
    verifyTextStyles,
    verifyTextStylesWithOverflowText,
    visuallyHiddenTextStyle,
    loanProgressDetailsListStyle,
} from './LoanProgressOverviewList.style';
import { Stack, StackItem } from '@fluentui/react/lib/components/Stack';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { DetailsHeader } from '@fluentui/react/lib/components/DetailsList/DetailsHeader';
import { ILoanProgressData } from '../../../interfaces/ILoanProgressOverview/ILoanProgressData';

export interface ILoanProgressOverviewListProps {
    loanProgressData: ILoanProgressData[];
}

const completedIconName = 'CompletedSolid';
const chevronRightIconName = 'ChevronRight';

/* istanbul ignore next */
const renderDetailsHeader = detailsHeaderProps => {
    return (
        <DetailsHeader
            {...detailsHeaderProps}
            styles={detailsHeaderStyles}
            onRenderColumnHeaderTooltip={tooltipHostProps => {
                const columnKey = tooltipHostProps?.column?.key;
                const shouldBeVisuallyHidden = columnKey === ListColumnsKeys.COMPLETED_ICON || columnKey === ListColumnsKeys.OPEN_TAB;
                return (
                    <OverflowText
                        styles={shouldBeVisuallyHidden && visuallyHiddenTextStyle}
                        text={tooltipHostProps?.column?.name!}
                        overflowModeSelf
                    />
                );
            }}
        />
    );
};

export const LoanProgressOverviewList: FC<ILoanProgressOverviewListProps> = ({ loanProgressData }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);
    const {
        palette: { themePrimary },
    } = useTheme();

    const renderCompletedIcon = useCallback(
        (item: ILoanProgressData) => {
            const isCompleted = item.completed === item.total;
            const srText = isCompleted ? translate('STATUS_VERIFIED') : translate('STATUS_UNVERIFIED');

            return (
                <>
                    {isCompleted && (
                        <FontIcon aria-hidden="true" data-testid="completed-icon" iconName={completedIconName} className={completedIconStyles} />
                    )}
                    <ScreenReaderText id={`srStatusText${item.name?.replace(/\s+/g, '')}`}>{srText}</ScreenReaderText>
                </>
            );
        },
        [translate]
    );

    const renderItemColumn = useCallback((item, index, column) => renderColumn[column.key](item), []);

    const renderName = useCallback((item: ILoanProgressData) => <OverflowText styles={rowTextStyle} text={translate(item.name)} />, []);

    const renderVerification = useCallback(
        (item: ILoanProgressData) => (
            <Stack horizontal data-testid="verify-complete-text" gap="1.2em">
                <StackItem styles={verifyTextStyles}>
                    <Text styles={rowTextStyle}>{translate('X_OF_Y', { x: item.completed, y: item.total })}</Text>
                </StackItem>
                <StackItem styles={verifyTextStylesWithOverflowText}>
                    <OverflowText styles={rowTextStyle} text={translate(item.type)} />
                </StackItem>
            </Stack>
        ),
        []
    );

    const renderOpenTab = useCallback(
        (item: ILoanProgressData) => (
            <ActionButton data-testid="open-tab" styles={openButtonStyles(themePrimary)} onClick={item.openTabFunc}>
                <Stack tokens={openButtonStackTokens} styles={overflowTextStyle} horizontal horizontalAlign="center" verticalAlign="center">
                    <StackItem aria-hidden="true" styles={overflowTextStyle}>
                        <OverflowText text={translate('LOAN_PROGRESS_APPLICATION_OPEN_TAB_BUTTON_TEXT')} />
                    </StackItem>
                    <ScreenReaderText id={`srOpenButtonText${item.name?.replace(/\s+/g, '')}`}>
                        {translate('OPEN_X', { x: translate(item.name) })}
                    </ScreenReaderText>
                    <FontIcon iconName={chevronRightIconName} aria-hidden={true} />
                </Stack>
            </ActionButton>
        ),
        []
    );

    const renderColumn = {
        [ListColumnsKeys.APPLICATION_SECTION]: renderName,
        [ListColumnsKeys.VERIFY_COMPLETE]: renderVerification,
        [ListColumnsKeys.COMPLETED_ICON]: renderCompletedIcon,
        [ListColumnsKeys.OPEN_TAB]: renderOpenTab,
    };

    const columns = useMemo(() => {
        return [
            {
                key: ListColumnsKeys.APPLICATION_SECTION,
                name: translate('LOAN_PROGRESS_APPLICATION_SECTION_COLUMN_TEXT'),
                minWidth: 100,
            },
            {
                key: ListColumnsKeys.VERIFY_COMPLETE,
                name: translate('LOAN_PROGRESS_VERIFY_COMPLETE_COLUMN_TEXT'),
                minWidth: 145,
                isResizable: false,
            },
            {
                key: ListColumnsKeys.COMPLETED_ICON,
                name: translate('LOAN_PROGRESS_STATUS_COLUMN_TEXT'),
                minWidth: 50,
                isResizable: false,
            },
            {
                key: ListColumnsKeys.OPEN_TAB,
                name: translate('LOAN_PROGRESS_ACTIONS_COLUMN_TEXT'),
                minWidth: 80,
                isResizable: false,
            },
        ];
    }, []);

    return (
        <DetailsList
            items={loanProgressData}
            columns={columns}
            onRenderItemColumn={renderItemColumn}
            selectionMode={SelectionMode.none}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            styles={loanProgressDetailsListStyle}
            onRenderDetailsHeader={renderDetailsHeader}
            cellStyleProps={cellStyleProps}
        />
    );
};

export default LoanProgressOverviewList;
