import React from 'react';
import { render } from '@testing-library/react';
import WizardStep from './WizardStep';

const mockProps = {
    name: 'Example',
    onStepClick: () => {},
};

describe('WizardStep - props with default values', () => {
    let component;

    beforeEach(() => {
        component = render(<WizardStep {...mockProps} />);
    });

    it('should render the component', () => {
        expect(component.container).not.toBeEmptyDOMElement();
    });

    it('should render the component with right name', () => {
        expect(component.getByText(mockProps.name)).toBeInTheDocument();
    });

    it('should render the component without being active', () => {
        expect(component.getByTestId(/wizard-step-icon/i).dataset.iconName).toBe('CircleRing');
    });
});

describe('WizardStep -  conditional rendering', () => {
    it('should not render separator if step is first', () => {
        const component = render(<WizardStep {...mockProps} isFirst />);

        expect(component.queryByTestId(/wizard-step-line/i)).toBeNull();
    });

    it('should render CompletedSolid if step is completed and active', () => {
        const component = render(<WizardStep {...mockProps} isCompleted isActive />);

        expect(component.getByTestId(/wizard-step-icon/i).dataset.iconName).toBe('CompletedSolid');
    });

    it('should render CompletedSolid if step is completed and not active', () => {
        const component = render(<WizardStep {...mockProps} isCompleted />);

        expect(component.getByTestId(/wizard-step-icon/i).dataset.iconName).toBe('CompletedSolid');
    });

    it('should render FullCircleMask if step is active only', () => {
        const component = render(<WizardStep {...mockProps} isActive />);

        expect(component.getByTestId(/wizard-step-icon/i).dataset.iconName).toBe('FullCircleMask');
    });

    it('should render disabled component', () => {
        const { getByTestId } = render(<WizardStep {...mockProps} isDisabled />);

        expect(getByTestId('wizard-step-btn')).toBeDisabled();
    });
    it('should render with description', () => {
        const description = 'Description';
        const { queryByText } = render(<WizardStep {...mockProps} isActive description={description} />);

        expect(queryByText(description)).toBeVisible();
    });
});
