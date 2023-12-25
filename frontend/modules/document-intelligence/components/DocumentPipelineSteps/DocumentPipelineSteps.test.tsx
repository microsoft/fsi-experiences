import React from 'react';
import { render } from '@testing-library/react';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import DocumentPipelineSteps from './DocumentPipelineSteps';
import { IDocumentPipelineStepItemProps } from './DocumentPipelineSteps.interface';
import { stepDefinitionExtract } from '../../interfaces/mocks/StepsDefinitions.mock';
import { stepResultSuccessMock } from '../../interfaces/mocks/PipelineStepData.mock';

const pipelineStepItem = jest.fn();
jest.mock('./DocumentPipelineStepItem', () => (props: IDocumentPipelineStepItemProps) => {
    pipelineStepItem(props);
    return <span data-testid="doc-pipeline-step-item" />;
});
const mockPipelineStep = {
    ...stepDefinitionExtract,
    ...stepResultSuccessMock,
    fields: stepDefinitionExtract.fields.map(field => ({
        ...field,
        ...(stepResultSuccessMock.fields[field.id] || {}),
    })),
};

describe('[Document Intelligence] DocumentPipelineSteps', () => {
    beforeEach(() => {});

    it('Should render document pipeline-steps', () => {
        const { getByTestId, getByText } = render(<DocumentPipelineSteps stepResults={[mockPipelineStep]} isError={false} isLoading={false} />);

        expect(getByText(diStrings.DOCUMENT_SEE_VERIFICATION_STEPS)).toBeVisible();
        expect(getByTestId('doc-pipeline-step-item')).toBeVisible();
    });

    it('Should render loading', () => {
        const { getByTestId } = render(<DocumentPipelineSteps stepResults={[]} isError={false} isLoading={true} />);
        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('Should render error', () => {
        const { getByTestId } = render(<DocumentPipelineSteps stepResults={[]} isError={true} isLoading={false} />);
        expect(getByTestId('error-state')).toBeVisible();
    });
});
