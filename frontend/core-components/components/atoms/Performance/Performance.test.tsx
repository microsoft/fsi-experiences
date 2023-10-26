import React from 'react';
import { render } from '@testing-library/react';
import Performance from './Performance';
import { COLORS } from '../../../constants/Colors';

describe('Performance', () => {
    it('Should render with two numbers after zero', async () => {
        const { getByText, queryByTestId } = render(<Performance percentage={5.1} />);
        const databox = queryByTestId(/performance-market-up/i);

        expect(databox).toBeVisible();
        expect(getByText('+5.10%')).toBeVisible();
    });

    it('Should render with two numbers after zero even with 3 numbers after zero percentage', async () => {
        const { getByText, queryByTestId } = render(<Performance percentage={5.154} />);
        const databox = queryByTestId(/performance-market-up/i);

        expect(databox).toBeVisible();
        expect(getByText('+5.15%')).toBeVisible();
    });

    it('Should render trent up', async () => {
        const { getByText, queryByTestId } = render(<Performance percentage={3} />);
        const databox = queryByTestId(/performance-market-up/i);

        expect(databox).toBeVisible();
        expect(getByText('+3.00%')).toBeVisible();
        expect(databox).toHaveStyle({ color: COLORS.successIcon });
        expect(getByText('+3.00%')).toHaveStyle({ color: COLORS.successIcon });
    });

    it('Should render trend down', async () => {
        const { getByText, queryByTestId } = render(<Performance percentage={-3} />);
        const databox = queryByTestId(/performance-market-down/i);

        expect(databox).toBeVisible();
        expect(getByText('-3.00%')).toBeVisible();
        expect(databox).toHaveStyle({ color: COLORS.red });
        expect(getByText('-3.00%')).toHaveStyle({ color: COLORS.red });
    });

    it('Should render flat', async () => {
        const { getByText, queryByTestId } = render(<Performance percentage={0} />);
        const databox = queryByTestId(/performance-market-flat/i);

        expect(databox).toBeVisible();
        expect(getByText('0.00%')).toBeVisible();
        expect(databox).toHaveStyle({ color: COLORS.primaryTagText });
    });

    it('Should render flat with undefined', async () => {
        const { getByText, queryByTestId } = render(<Performance percentage={undefined} />);
        const databox = queryByTestId(/performance-market-flat/i);

        expect(databox).toBeVisible();
        expect(getByText('N/A')).toBeVisible();
        expect(databox).toHaveStyle({ color: COLORS.primaryTagText });
    });
});
