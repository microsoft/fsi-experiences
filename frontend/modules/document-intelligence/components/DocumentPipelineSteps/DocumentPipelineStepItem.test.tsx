import React from 'react';
import { render } from '@testing-library/react';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import DocumentPipelineStepItem from './DocumentPipelineStepItem';
import { stepDefinitionExtract, stepDefinitionReview, stepDefinitionVerify } from '../../interfaces/mocks/StepsDefinitions.mock';
import { stepResultFailureMock, stepResultSuccessMock, stepResultUnclearMock, stepRunningMock } from '../../interfaces/mocks/PipelineStepData.mock';
import { IStepResultWithDefinition } from '../../interfaces/IDocumentInsight';

describe('[Document Intelligence] DocumentPipelineStepItem', () => {
    beforeEach(() => {});

    it('Should render success pipeline-step', () => {
        const pipelineStep: IStepResultWithDefinition = {
            ...stepDefinitionExtract,
            ...stepResultSuccessMock,
            fields: stepDefinitionExtract.fields.map(field => ({
                ...field,
                ...(stepResultSuccessMock.fields[field.id] || {}),
            })),
        };
        const { getByText, queryByTestId, getByTestId } = render(<DocumentPipelineStepItem pipelineStepResult={pipelineStep} />);

        expect(getByTestId('pipeline-step-name')).toBeVisible();
        expect(getByText(commonStrings.LEARN_MORE)).toBeVisible();
        expect(queryByTestId('pipeline-step-desc')).toBeNull();
    });

    it('Should render failed pipeline-step', () => {
        const pipelineStep: IStepResultWithDefinition = {
            ...stepDefinitionVerify,
            ...stepResultFailureMock,
            fields: [],
        };
        const { getByText, queryByTestId } = render(<DocumentPipelineStepItem pipelineStepResult={pipelineStep} />);

        expect(getByText(pipelineStep.name)).toBeVisible();
        expect(getByText(commonStrings.LEARN_MORE)).toBeVisible();
        expect(queryByTestId('pipeline-step-desc')).toBeVisible();
    });

    it('Should no render pipeline-step with unknown status', () => {
        const pipelineStep: IStepResultWithDefinition = {
            ...stepDefinitionReview,
            ...stepResultUnclearMock,
            status: 1,
            fields: [],
        };
        const { container } = render(<DocumentPipelineStepItem pipelineStepResult={pipelineStep} />);

        expect(container).toBeEmptyDOMElement();
    });

    it('should render pipeline-step without description', () => {
        const pipelineStep: IStepResultWithDefinition = {
            ...stepDefinitionReview,
            ...stepRunningMock,
            fields: [],
        };
        const { getByText, queryByTestId } = render(<DocumentPipelineStepItem pipelineStepResult={pipelineStep} />);

        expect(getByText(pipelineStep.name)).toBeVisible();
        expect(queryByTestId('pipeline-step-desc')).toBeNull();
    });

    it('should render pipeline-step without status', () => {
        const pipelineStep: IStepResultWithDefinition = {
            ...stepDefinitionReview,
            ...stepRunningMock,
            fields: [],
            status: undefined as any,
        };
        const { getByText, queryByTestId } = render(<DocumentPipelineStepItem pipelineStepResult={pipelineStep} />);

        expect(getByText(pipelineStep.name)).toBeVisible();
        expect(queryByTestId('pipeline-step-desc')).toBeNull();
    });

    it('should render pipeline-step with skipped status', () => {
        const pipelineStep: IStepResultWithDefinition = {
            ...stepDefinitionReview,
            ...stepRunningMock,
            skipped: true,
            status: undefined as any,
            fields: [],
        };
        const { getByText, queryByTestId } = render(<DocumentPipelineStepItem pipelineStepResult={pipelineStep} />);

        const step = queryByTestId('document-pipeline-step');

        expect(step?.querySelector('i[data-icon-name="NavigateForward"]')).toBeTruthy();
        expect(getByText(`${pipelineStep.name} step - skipped`)).toBeVisible();
    });
});
