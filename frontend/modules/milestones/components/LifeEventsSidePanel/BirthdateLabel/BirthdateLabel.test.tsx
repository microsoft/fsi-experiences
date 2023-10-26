import React from 'react';
import { render } from '@testing-library/react';
import BirthdateLabel from './BirthdateLabel';
import lifeEventStrings from '@fsi/core-components/dist/assets/strings/LifeEventBar/LifeEventBar.1033.json';

describe('BirthdateLabel', () => {
    const todayDate = new Date('2021-07-27T21:00:00.000Z');
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(todayDate);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('Should render birthdate of today correctly', async () => {
        const { getByText } = render(<BirthdateLabel date={new Date('1997-07-27T21:00:00.000Z')} />);

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_TODAY)).toBeVisible();
    });

    it('Should render birthdate of today yesterday', async () => {
        const { getByText } = render(<BirthdateLabel date={new Date('1997-07-26T21:00:00.000Z')} />);

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_WAS_YESTERDAY)).toBeVisible();
    });

    it('Should render birthdate of today tomrrow', async () => {
        const { getByText } = render(<BirthdateLabel date={new Date('1997-07-28T21:00:00.000Z')} />);

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_IS_TOMORROW)).toBeVisible();
    });

    it('Should render birthdate of today two days ago', async () => {
        const { getByText } = render(<BirthdateLabel date={new Date('1997-07-25T21:00:00.000Z')} />);

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_WAS.replace('{{days}}', '2'))).toBeVisible();
    });

    it('Should render birthdate of today in two days', async () => {
        const { getByText } = render(<BirthdateLabel date={new Date('1997-07-29T21:00:00.000Z')} />);

        expect(getByText(lifeEventStrings.CONTACT_BIRTHDAY_IN.replace('{{days}}', '2'))).toBeVisible();
    });
});
