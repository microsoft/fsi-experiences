import React, { FC } from 'react';
import { ILoanApplicationDocumentsFetcher } from '../../interfaces/ILoanDocument/ILoanApplicationDocumentsFetcher';
import LoanApplicationDocuments from './LoanApplicationDocuments/LoanApplicationDocuments';
import { DocumentsContextProvider } from '../../contexts/Documents/Documents.context';

export const LoanDocumentTab: FC<{ fetcher: ILoanApplicationDocumentsFetcher; loanApplicationId: string }> = ({ fetcher, loanApplicationId }) => {
    return (
        <DocumentsContextProvider fetcher={fetcher} loanApplicationId={loanApplicationId}>
            <LoanApplicationDocuments />
        </DocumentsContextProvider>
    );
};

export default LoanDocumentTab;
