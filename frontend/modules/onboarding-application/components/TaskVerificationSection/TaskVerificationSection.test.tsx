import React from 'react';
import { render } from '@testing-library/react';
import TaskVerificationSection from './TaskVerificationSection';
import { verificationTaskMock } from '../../interfaces/mocks/TaskVerification.mock';
import { TASK_VERIFICATION_SECTION_TESTID } from './TaskVerificationSection.const';

describe('TaskVerificationSection', () => {
    it('Should be rendered in DOM', () => {
        const { getByTestId } = render(<TaskVerificationSection task={verificationTaskMock} />);
        expect(getByTestId(TASK_VERIFICATION_SECTION_TESTID)).toBeInTheDocument();
    });

    it('Should NOT be rendered when task is not provided', () => {
        const { queryByTestId } = render(<TaskVerificationSection task={undefined as any} />);
        expect(queryByTestId(TASK_VERIFICATION_SECTION_TESTID)).toBeNull();
    });

    it('Should render disabled status is different stage', () => {
        const { getByTestId } = render(<TaskVerificationSection task={{ ...verificationTaskMock, processStage: '2' }} processStage={'1'} />);
        expect(getByTestId('task-status-dropdown').getAttribute('aria-disabled')).toEqual('true');
    });
});
