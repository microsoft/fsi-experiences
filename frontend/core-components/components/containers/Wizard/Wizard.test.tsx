import React from 'react';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import Wizard from './Wizard';
import { IWizardProps, IStep } from './Wizard.interface';

describe('Wizard', () => {
    const mockSteps: IStep[] = [
        {
            name: 'Step 1',
            isCompleted: false,
            ViewComp: <div>Step 1 View</div>,
        },
        {
            name: 'Step 2',
            isCompleted: false,
            ViewComp: <div>Step 2 View</div>,
        },
        {
            name: 'Step 3',
            isCompleted: false,
            ViewComp: <div>Step 3 View</div>,
        },
    ];

    const mockProps: IWizardProps = {
        header: 'Example',
        steps: mockSteps,
        onCancel: jest.fn(),
        onSave: jest.fn(),
    };

    it('should not render with cancel icon button', () => {
        const { queryByText } = render(<Wizard {...mockProps} />);

        expect(queryByText('Cancel')).toBeVisible();
    });

    it('should render with header and no Cancel icon', () => {
        const { queryByText, queryByTestId } = render(<Wizard {...mockProps} />);

        expect(queryByText(mockProps.header)).toBeVisible();
        expect(queryByTestId('wizard-header-cancel-btn')).toBeNull();
    });

    it('should render a Cancel icon when hasCloseIcon is true', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} hasCloseIcon />);

        expect(queryByTestId('wizard-header-cancel-btn')).toBeInTheDocument();
    });

    it('should not render content view if there is no legal current step', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} firstStep={3} />);

        expect(queryByTestId('wizard-step-content')).toBeEmptyDOMElement();
    });

    it('should render the current step view', () => {
        const { getByTestId, queryByText } = render(<Wizard {...mockProps} />);

        expect(getByTestId('wizard-step-content')).not.toBeEmptyDOMElement();
        expect(queryByText('Step 1 View')).toBeVisible();
    });

    it('should render the steps on the left pane', () => {
        const { getByTestId } = render(<Wizard {...mockProps} />);

        expect(getByTestId('steps-dropdown-menu').children.length).toBe(mockSteps.length);
    });

    it('should move from one step to the other', () => {
        const { getByText, getByTestId } = render(<Wizard {...mockProps} />);

        fireEvent.click(getByText(mockProps.steps[1].name));

        expect(getByText('Step 2 View')).toBeVisible();
        expect(getByTestId('wizard-back-btn')).not.toBeDisabled();
    });

    it('should render the first step with Next button only', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} />);
        const next = queryByTestId('wizard-next-btn');
        const prev = queryByTestId('wizard-back-btn');

        expect(next).toBeVisible();
        expect(next).toBeDisabled();

        expect(prev).toBeNull();
    });

    it('should render the middle step with Next and Back button', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} firstStep={1} />);
        const next = queryByTestId('wizard-next-btn');
        const prev = queryByTestId('wizard-back-btn');

        expect(next).toBeVisible();
        expect(next).toBeDisabled();

        expect(prev).toBeVisible();
        expect(prev).not.toBeDisabled();
    });

    it('should render the middle step with enabled Next and Back button for completed step', () => {
        const mockedCompletedSteps = mockSteps.map(step => ({ ...step, isCompleted: true, isMoveForward: true }));
        const { queryByTestId } = render(<Wizard {...mockProps} steps={mockedCompletedSteps} firstStep={1} />);
        const next = queryByTestId('wizard-next-btn');
        const prev = queryByTestId('wizard-back-btn');

        expect(next).toBeVisible();
        expect(next).not.toBeDisabled();

        expect(prev).toBeVisible();
        expect(prev).not.toBeDisabled();
    });

    it('should change the view when clicking on Back and Next button', async () => {
        const mockedCompletedSteps = mockSteps.map(step => ({ ...step, isCompleted: true, isMoveForward: true }));
        const { getByTestId, queryByText } = render(<Wizard {...mockProps} steps={mockedCompletedSteps} firstStep={1} />);
        const next = getByTestId('wizard-next-btn');
        const prev = getByTestId('wizard-back-btn');

        expect(next).toBeVisible();
        expect(next).not.toBeDisabled();

        expect(prev).toBeVisible();
        expect(prev).not.toBeDisabled();

        await act(async () => {
            fireEvent.click(next);
        });

        expect(queryByText('Step 2 View')).toBeNull();
        expect(queryByText('Step 3 View')).toBeVisible();

        await act(async () => {
            fireEvent.click(prev);
        });

        expect(queryByText('Step 3 View')).toBeNull();
        expect(queryByText('Step 2 View')).toBeVisible();
    });

    it('should display the last step with a disabled Done btn', () => {
        const { getByTestId, queryByTestId, getByText } = render(<Wizard {...mockProps} />);

        fireEvent.click(getByText(mockProps.steps[mockProps.steps.length - 1].name));

        const next = queryByTestId('Next');
        const done = getByTestId('wizard-done-btn');
        const back = getByTestId('wizard-back-btn');

        expect(done).toBeVisible();
        expect(next).toBeNull();
        expect(done).toBeDisabled();
        expect(back).not.toBeDisabled();
    });

    it('should display the last step with an enabled Done btn', () => {
        const mockCompletedSteps = mockSteps.map(step => ({ ...step, isCompleted: true }));
        const { getByTestId } = render(<Wizard {...mockProps} steps={mockCompletedSteps} firstStep={2} />);

        const done = getByTestId('wizard-done-btn');

        expect(done).toBeVisible();
        expect(done).not.toBeDisabled();
    });

    it('should trigger event when click on Cancel button', () => {
        const { getByTestId } = render(<Wizard {...mockProps} />);

        fireEvent.click(getByTestId('wizard-cancel-btn'));

        expect(mockProps.onCancel).toBeCalled();
    });

    it('should trigger save when clicking on Done', () => {
        const mockCompletedSteps = mockSteps.map(step => ({ ...step, isCompleted: true }));
        const { getByTestId } = render(<Wizard {...mockProps} steps={mockCompletedSteps} firstStep={2} />);

        const done = getByTestId('wizard-done-btn');

        expect(done).toBeVisible();

        fireEvent.click(done);

        expect(mockProps.onSave).toBeCalled();
    });

    it('should render header with close button', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} hasCloseIcon />);

        expect(queryByTestId('wizard-header-cancel-btn')).toBeVisible();
    });

    it('should not render header without close button and title', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} header="" />);

        expect(queryByTestId('wizard-header')).toBeNull();
    });
    it('should render stepdropdown instead menu', () => {
        const { queryByTestId } = render(<Wizard {...mockProps} header="" isStepDropdown />);

        expect(queryByTestId('steps-dropdown-control')).toBeInTheDocument();
        expect(queryByTestId('wizard-vertical-divider')).not.toBeInTheDocument();
    });

    it('should render complete only on stage showCompletedWhileDirty', () => {
        const { getByText, container } = render(
            <Wizard {...mockProps} showCompletedWhileDirty steps={mockSteps.map(step => ({ ...step, isCompleted: true }))} />
        );

        expect(container.querySelectorAll('i[data-icon-name="CircleRing"]')).toHaveLength(2);
        fireEvent.click(getByText(mockProps.steps[1].name));
        expect(container.querySelectorAll('i[data-icon-name="CircleRing"]')).toHaveLength(1);
        fireEvent.click(getByText(mockProps.steps[2].name));
        expect(container.querySelectorAll('i[data-icon-name="CircleRing"]')).toHaveLength(0);
    });

    afterEach(cleanup);
});
