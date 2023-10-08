import { useMemo } from 'react';
import contextService from '../services/ContextService';
import loggerServiceMock from '@fsi/core-components/dist/context/telemetry/ILoggerService.mock';
import { ILoggerService } from '@fsi/core-components/dist/context/telemetry/ILoggerService';


export const FSIControls = {
    DetailedFHControl: 'MicrosoftPCF.DetailedFHControl',
    GroupsControl: 'MicrosoftPCF.GroupsControl',
    CustomerSummaryControl: 'MicrosoftPCF.CustomerSummaryControl',
    CustomerSnapshotControl: 'MicrosoftPCF.CustomerSnapshotControl',
    FinancialHoldingInformationControl: 'MicrosoftPCF.FinancialHoldingInformationControl',
    FinancialHoldingSelector: 'MicrosoftPCF.FinancialHoldingSelector',
    InvestmentsPortfoliosControl: 'MicrosoftPCF.InvestmentsPortfoliosControl',
};

export const usePCFLoggerService = (): ILoggerService => {
    const context = contextService.geContext();

    return useMemo(() => {
        if (!context || contextService.isTestMode()) {
            return loggerServiceMock;
        }
        // you can return your loggerService instance here
        return loggerServiceMock;
    }, [context]);
};
