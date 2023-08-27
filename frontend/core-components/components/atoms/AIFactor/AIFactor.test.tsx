import React from 'react';
import { render } from '@testing-library/react';
import AIFactor from './AIFactor';
import { IAIFactor } from './AIFactor.interface';
import { toRate } from '../../../utilities';
import { COLORS } from '../../../constants/Colors';

describe('AIFactor', () => {
    const defaultFactor: IAIFactor = {
        displayName: 'Factor #1',
        factor: 0.5,
        id: 'factor-1',
    };

    const ICON_TEST_ID = 'ai-factor-icon';
    const ICON_RED = COLORS.red;
    const ICON_GREEN = COLORS.successIcon;

    it('should render AI Factor correctly', () => {
        const { queryByText, getByText, getByTestId, container } = render(<AIFactor factorInfo={defaultFactor} />);

        expect(getByText(defaultFactor.displayName)).toBeVisible();
        expect(queryByText(toRate(defaultFactor.factor))).toBeNull();
        expect(getByTestId(ICON_TEST_ID)).toHaveStyle({ color: ICON_GREEN });
        expect(container.querySelector('i[data-icon-name="Up"]')).toBeVisible();
    });

    it('should render AI Factor with rate', () => {
        const { queryByText, getByText } = render(<AIFactor factorInfo={defaultFactor} showFactorRate />);

        expect(getByText(defaultFactor.displayName)).toBeVisible();
        expect(queryByText(toRate(defaultFactor.factor))).toBeVisible();
    });

    it('should render AI Factor with red color for positive factor when using lowIsGood', () => {
        const { getByTestId, container } = render(<AIFactor factorInfo={defaultFactor} lowIsGood />);

        expect(getByTestId(ICON_TEST_ID)).toHaveStyle({ color: ICON_RED });
        expect(container.querySelector('i[data-icon-name="Up"]')).toBeVisible();
    });

    it('should render AI Factor with green color for negative factor when using lowIsGood', () => {
        const testFactor: IAIFactor = {
            ...defaultFactor,
            factor: -0.3,
        };
        const { container, getByTestId } = render(<AIFactor factorInfo={testFactor} lowIsGood />);

        expect(getByTestId(ICON_TEST_ID)).toHaveStyle({ color: ICON_GREEN });
        expect(container.querySelector('i[data-icon-name="Down"]')).toBeVisible();
    });

    it('should add aria label to positive icon', () => {
        const { getByLabelText } = render(<AIFactor factorInfo={defaultFactor} lowIsGood negativeLabel="bad" positiveLabel="good" />);

        expect(getByLabelText('good')).toBeVisible();
    });

    it('should add aria label to negative icon', () => {
        const testFactor: IAIFactor = {
            ...defaultFactor,
            factor: -0.3,
        };
        const { getByLabelText } = render(<AIFactor factorInfo={testFactor} lowIsGood negativeLabel="bad" positiveLabel="good" />);

        expect(getByLabelText('bad')).toBeVisible();
    });
});
