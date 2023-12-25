import React from 'react';
import { render } from '@testing-library/react';
import { DocumentPipelineStatus, PipelineStatus } from '../../constants/PipelineStatuses.const';
import { StepTypes } from '../../constants/StepTypes.const';
import { StepInfoHeaderTooltip } from '../StepInfoHeaderTooltip/StepInfoHeaderTooltip';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';

const mockSteps = {
    extractedStep: {
        name: 'Extracted fields',
        id: 'extractedFields',
        order: 1,
        link: 'https://www.microsoft.com',
        status: PipelineStatus.Success,
        definitionId: 'extractedFields',
        docStatus: DocumentPipelineStatus.Unclear,
        resultId: '1',
        type: StepTypes.Extraction,
        fields: [
            {
                displayName: 'Consumption start date',
                value: '2020-01-01',
                originalValue: '2020-01-01',
                confidence: 0.8,
                required: true,
                placeholder: 'Consumption start date',
                id: 'startDate',
            },
        ],
    },
};

describe('StepInfoHeaderTooltip', () => {
    it('should render extraction tooltip', () => {
        const { container, getByRole } = render(
            <StepInfoHeaderTooltip
                step={mockSteps.extractedStep}
                description={diStrings.DOCUMENT_EXTRACTED_TAB_INFO_SECTION_DESC}
                linkInfoLabel={diStrings.DOCUMENT_EXTRACTED_TAB_INFO_SECTION_MORE_INFO_LINK_LABEL}
                prefixLinkInfoLabel={diStrings.DOCUMENT_EXTRACTED_TAB_INFO_SECTION_MORE_INFO}
            />
        );

        expect(container).toBeInTheDocument();
        expect(getByRole('link')).toHaveAttribute('href', mockSteps.extractedStep.link);
    });
});
