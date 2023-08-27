import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmptyState from './EmptyState';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('EmptyState of LifeEventSideCategory', () => {
    const onClick = jest.fn();

    it('Should render empty state correctly', async () => {
        const { getByText } = render(<EmptyState isBirthdayCategory={false} onClick={onClick} />);

        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_SIDE_PANEL_TITLE)).toBeVisible();
        expect(getByText(lifeEventStrings.ADD_EVENT)).toBeVisible();
    });

    it('Should render empty state of birthday correctly', async () => {
        const { getByText } = render(<EmptyState isBirthdayCategory={true} onClick={onClick} />);

        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_BIRTHDAY_TITLE)).toBeVisible();
        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_BIRTHDAY_SUBTITLE)).toBeVisible();
    });

    it('Should be readonly', async () => {
        const { getByText } = render(<EmptyState isBirthdayCategory={false} onClick={onClick} readonly />);

        fireEvent.click(getByText(lifeEventStrings.ADD_EVENT));

        expect(onClick).not.toHaveBeenCalled();
    });

    it('Should render no event to show empty state correctly', async () => {
        const { getByText } = render(<EmptyState isBirthdayCategory={false} onClick={onClick} hideModifyButtons />);

        expect(getByText(lifeEventStrings.LIFE_EVENT_EMPTY_STATE_NO_EVENT_TITLE)).toBeVisible();
    });

    it('Should call click handler', async () => {
        const { getByText } = render(<EmptyState isBirthdayCategory={false} onClick={onClick} />);

        fireEvent.click(getByText(lifeEventStrings.ADD_EVENT));

        expect(onClick).toHaveBeenCalled();
    });
});
