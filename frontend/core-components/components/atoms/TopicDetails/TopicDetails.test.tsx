import React from 'react';
import { render } from '@testing-library/react';
import TopicDetails from './TopicDetails';
import { ITopicDetailsProps } from './TopicDetails.interface';

const mockProps: ITopicDetailsProps = {
    name: 'Test',
    description: 'Example',
};

describe('TopicDetails', () => {
    it('should render without icon', () => {
        const { queryByTestId } = render(<TopicDetails {...mockProps} />);

        expect(queryByTestId('topic-details-icon')).toBeNull();
    });

    it('should render without description', () => {
        const { queryByTestId } = render(<TopicDetails {...mockProps} description="" />);

        expect(queryByTestId('topic-details-description')).toBeNull();
    });

    it('should render with text', () => {
        const { getByText } = render(<TopicDetails {...mockProps} />);

        expect(getByText(mockProps.name)).toBeVisible();
    });

    it('should render with description', () => {
        const { getByText } = render(<TopicDetails {...mockProps} />);
        const description = mockProps.description;

        expect(getByText(description as string)).toBeVisible();
    });

    it('should render details with icon', () => {
        const { queryByTestId } = render(<TopicDetails {...mockProps} icon="savings" />);

        expect(queryByTestId('topic-details-icon')).toBeVisible();
    });
});
