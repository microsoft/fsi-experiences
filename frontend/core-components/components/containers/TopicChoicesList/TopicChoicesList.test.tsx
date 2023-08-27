import React from 'react';
import { render } from '@testing-library/react';
import TopicChoicesList from './TopicChoicesList';
import { ITopicChoicesListProps } from './TopicChoicesList.interface';

const mockProps: ITopicChoicesListProps = {
    header: 'Select choices',
    topics: [
        {
            name: 'Choice 1',
        },
        {
            name: 'Choice 2',
        },
    ],
    onSelect: jest.fn(),
};

describe('TopicChoicesList', () => {
    it('should render list with a header', () => {
        const { queryByLabelText } = render(<TopicChoicesList {...mockProps} />);

        expect(queryByLabelText(mockProps.header)).toBeVisible();
    });

    it('should render choices list', () => {
        const { queryByRole } = render(<TopicChoicesList {...mockProps} />);

        const groupContainer = queryByRole('radiogroup');

        expect(groupContainer).toBeVisible();

        const listWrapper = groupContainer?.lastElementChild;

        expect(listWrapper?.children.length).toBe(mockProps.topics.length);
    });

    it('should render with selected topic', () => {
        const { queryByText } = render(<TopicChoicesList {...mockProps} selectedTopic={mockProps.topics[0].name} />);

        const inputText = queryByText(mockProps.topics[0].name);

        const label = inputText?.closest('label');
        const inputField = label?.previousElementSibling;

        expect((inputField as HTMLInputElement).checked).toEqual(true);
    });

    it('should render with no selected topic', () => {
        const { queryByRole } = render(<TopicChoicesList {...mockProps} />);

        const groupContainer = queryByRole('radiogroup');

        const inputs = groupContainer?.querySelectorAll('input:checked');
        expect(inputs?.length).toBe(0);
    });

    it('should trigger onSelect when making a choice', () => {
        const { queryByRole } = render(<TopicChoicesList {...mockProps} />);

        const groupContainer = queryByRole('radiogroup');

        const inputs = groupContainer?.getElementsByTagName('input');

        inputs?.item(0)?.click();

        expect(mockProps.onSelect).toBeCalled();
    });
});
