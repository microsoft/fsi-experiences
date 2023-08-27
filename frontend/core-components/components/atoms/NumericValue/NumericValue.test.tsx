import React from 'react';
import { render } from '@testing-library/react';
import NumericValue from './NumericValue';
import { FSIContainer } from '../../../context/FSIContext';
import { INumericValueProps } from './NumericValue.interface';
import * as numberUtils from '../../../utilities/NumberUtils';

const renderNumericValue = (props: INumericValueProps, local = 'en-US') => {
    return render(
        <FSIContainer locale={local}>
            <NumericValue {...props} />
        </FSIContainer>
    );
};

describe('NumericValue', () => {
    it('should render number using the context locale', () => {
        const { getByText } = renderNumericValue({ value: 10000 }, 'de-DE');

        expect(getByText('10.000')).toBeVisible();
    });

    it('should render number with positive sign', () => {
        const { getByText } = renderNumericValue({ value: 10000, signed: true });

        expect(getByText('+10,000')).toBeVisible();
    });

    it('should render number with negative sign', () => {
        const { getByText } = renderNumericValue({ value: -10000, signed: true });

        expect(getByText('-10,000')).toBeVisible();
    });

    it('should call formatNumber with the right params', () => {
        const formatNumberSpy = jest.spyOn(numberUtils, 'formatNumber');
        renderNumericValue({ value: -10000, compact: true, fricationDigits: 2 }, 'de-DE');

        expect(formatNumberSpy).toHaveBeenCalledWith(-10000, 'de-DE', true, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
});
