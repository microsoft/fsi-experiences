import React from 'react';
import { render } from '@testing-library/react';
import LoadingComponent from './LoadingComponent';

describe('Group Loading component test', () => {
    const tstMsg = 'test msg';

    it('Should render loading with given label', async () => {
        const { getByRole, getByText } = render(<LoadingComponent msg={tstMsg} />);

        expect(getByText(tstMsg)).toBeVisible();
        expect(getByRole('progressbar')).toBeVisible();
    });
});
