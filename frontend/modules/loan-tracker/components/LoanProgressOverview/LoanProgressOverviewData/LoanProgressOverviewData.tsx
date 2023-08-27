import React, { FC, useMemo } from 'react';
import { LoanProgressOverviewBar } from '../LoanProgressOverviewBar';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { ILoanProgressData } from '../../../interfaces/ILoanProgressOverview/ILoanProgressData';
import { Divider } from '@fsi/core-components/dist/components/atoms/Divider';
import { LoanProgressOverviewList } from '../LoanProgressOverviewList/LoanProgressOverviewList';
import { dividerStyles, LoanProgressOverviewDataStyles } from './LoanProgressOverviewData.style';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';

export interface ILoanProgressOverviewDataProps {
    loanProgressData: ILoanProgressData[];
}

export const LoanProgressOverviewData: FC<ILoanProgressOverviewDataProps> = ({ loanProgressData }) => {
    const translate = useTranslation(namespaces.LOAN_SNAPSHOT_CONTROL);

    const loanProgressBarsValues = useMemo(() => {
        const { total, completed } = loanProgressData.reduce(
            (prevValue, currValue) => ({
                completed: prevValue.completed + currValue.completed,
                total: prevValue.total + currValue.total,
            }),
            { completed: 0, total: 0 }
        );
        const inProgress = total - completed;
        return { completed, inProgress, total };
    }, [loanProgressData]);

    return (
        <Stack styles={LoanProgressOverviewDataStyles} data-testid="loan-progress-data">
            <div>
                <ScreenReaderText id={'srLoanProgressOverviewBarText'}>
                    {translate('COMPLETED_TASKS_OF_TOTAL_TASKS', {
                        completed: loanProgressBarsValues.completed,
                        total: loanProgressBarsValues.total,
                    })}
                </ScreenReaderText>
                <LoanProgressOverviewBar inProgressValue={loanProgressBarsValues.inProgress} completedValue={loanProgressBarsValues.completed} />
                <Divider styles={dividerStyles} />
            </div>
            <LoanProgressOverviewList loanProgressData={loanProgressData} />
        </Stack>
    );
};

export default LoanProgressOverviewData;
