import React from 'react';
import { render } from '@testing-library/react';
import CustomerIndicatorContent from './CustomerIndicatorContent';
import keyObservations from '../../../../../assets/strings/KeyObservations/KeyObservations.1033.json';

import commonStrings from '../../../../../assets/strings/common/common.1033.json';

const mockData = {
    value: 'testValue',
    label: 'This is test',
    staleness: new Date('2022-03-08'),
};

describe('Content', () => {
    it('Should render Content', async () => {
        const { getByText } = render(<CustomerIndicatorContent customerIndicators={[mockData]} />);

        expect(getByText(mockData.label)).toBeVisible();
    });

    it('Should render Content without data', async () => {
        const { getByText } = render(<CustomerIndicatorContent customerIndicators={[]} />);

        expect(getByText(keyObservations.NO_INDICATORS_TO_SHOW_YET)).toBeVisible();
        expect(getByText(commonStrings.CONTACT_SYSTEM_ADMIN)).toBeVisible();
    });
    it('Should render Content with invalid config and error from the fetch', async () => {
        const { getByText } = render(<CustomerIndicatorContent customerIndicators={[]} invalidConfig />);

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
        expect(getByText(keyObservations.TRY_REFRESH_CONTACT_ADMIN)).toBeVisible();
    });
});
