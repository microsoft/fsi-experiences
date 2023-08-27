import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Header from './Header';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('LifeEventBar - Header', () => {
    const handleAddEventButtonClicked = jest.fn();

    beforeEach(() => {
        handleAddEventButtonClicked.mockClear();
    });

    it('Should render Header', async () => {
        const { getByText, queryByTestId } = render(
            <Header addButtonEnabled handleAddEventButtonClicked={handleAddEventButtonClicked} addEventRef={null} />
        );

        expect(getByText(lifeEventStrings.LIFE_EVENT_AND_GOAL_LABEL)).toBeInTheDocument();
        expect(queryByTestId('add-event-header')).toBeInTheDocument();
    });

    it('Should render Header 2', async () => {
        const { getByTestId } = render(<Header addButtonEnabled handleAddEventButtonClicked={handleAddEventButtonClicked} addEventRef={null} />);
        fireEvent.click(getByTestId('add-event-header'));

        expect(handleAddEventButtonClicked).toBeCalled();
    });

    it('Should render Header without add event button', async () => {
        const { queryByTestId } = render(
            <Header addButtonEnabled hideModifyButtons handleAddEventButtonClicked={handleAddEventButtonClicked} addEventRef={null} />
        );

        expect(queryByTestId('add-event-header')).not.toBeInTheDocument();
    });
});
