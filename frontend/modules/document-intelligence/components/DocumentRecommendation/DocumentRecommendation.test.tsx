import React from 'react';
import { render } from '@testing-library/react';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import { DocumentRecommendation } from './DocumentRecommendation';
import * as pipelineResults from '../../interfaces/mocks/PipelineData.mock';
import { DocumentStatus } from '../../interfaces';

describe('DocumentRecommendation', () => {
    it('Should render pipeline is running', () => {
        const { getByText } = render(<DocumentRecommendation pipelineResult={pipelineResults.pipelineRunningMock} />);

        expect(getByText(diStrings.PIPELINE_RUNNING_MESSAGE)).toBeVisible();
    });

    it('Should render pipeline failure', () => {
        const { getByText } = render(<DocumentRecommendation pipelineResult={pipelineResults.pipelineFailedMock} />);

        expect(getByText(diStrings.PIPELINE_FAILURE_MESSAGE)).toBeVisible();
    });

    it('Should render pipeline document status failure/success/unclear', () => {
        const mockedResults = [
            pipelineResults.pipelineResultFailedMock,
            pipelineResults.pipelineResultSuccessMock,
            pipelineResults.pipelineResultUnclearMock,
        ];
        mockedResults.forEach(mockedResult => {
            const { getByText } = render(<DocumentRecommendation pipelineResult={mockedResult} />);

            expect(getByText(mockedResult.docPipelineStatusMessage!.shortText)).toBeVisible();
        });
    });

    it('Should render nothing for unsupported status', () => {
        const mockedResult = {
            ...pipelineResults.pipelineResultFailedMock,
            docStatus: 100000,
        };
        const { queryByTestId } = render(<DocumentRecommendation pipelineResult={mockedResult} />);

        expect(queryByTestId('document-rec')).toBeNull();
    });

    it('Should render auto updated doc', () => {
        const mockedResult = pipelineResults.pipelineResultSuccessMock;
        const { getByText } = render(
            <DocumentRecommendation pipelineResult={mockedResult} documentStatus={DocumentStatus.Approved} autoUpdated showDescription />
        );

        expect(getByText(diStrings.DOCUMENT_APPROVED_AUTO_UPDATED_MESSAGE)).toBeVisible();
        expect(getByText(diStrings.DOCUMENT_APPROVED_AUTO_UPDATED_DESC)).toBeVisible();
    });

    it('Should render auto updated doc without description', () => {
        const mockedResult = pipelineResults.pipelineResultSuccessMock;
        const { getByText, queryByText } = render(
            <DocumentRecommendation pipelineResult={mockedResult} documentStatus={DocumentStatus.Approved} autoUpdated />
        );

        expect(getByText(diStrings.DOCUMENT_APPROVED_AUTO_UPDATED_MESSAGE)).toBeVisible();
        expect(queryByText(diStrings.DOCUMENT_APPROVED_AUTO_UPDATED_DESC)).toBeNull();
    });

    it('Should render pending status with description', () => {
        const mockedResult = pipelineResults.pipelineResultUnclearMock;
        const { getByText, queryByTestId } = render(
            <DocumentRecommendation pipelineResult={mockedResult} documentStatus={DocumentStatus.PendingReview} showDescription autoUpdated />
        );

        expect(getByText(mockedResult.docPipelineStatusMessage!.description)).toBeVisible();
        expect(getByText(mockedResult.docPipelineStatusMessage!.shortText)).toBeVisible();
        expect(queryByTestId('pipeline-running-spinner')).toBeNull();
    });

    it('Should render running pipeline message', () => {
        const mockedResult = pipelineResults.pipelineRunningMock;
        const { getByText, getByTestId } = render(
            <DocumentRecommendation pipelineResult={mockedResult} documentStatus={DocumentStatus.PendingReview} />
        );

        expect(getByText(diStrings.PIPELINE_RUNNING_MESSAGE)).toBeVisible();
        expect(getByTestId('pipeline-running-spinner')).toBeVisible();
    });
});
