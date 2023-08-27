import React from 'react';
import { render } from '@testing-library/react';
import VerticalGraphLine from './VerticalGraphLine';
import { IVerticalGraphLineProps } from './VerticalGraphLine.interface';

describe('VerticalGraphLine', () => {
    it('should render vertical line with text', () => {
        const { getByText, getByTestId } = render(<VerticalGraphLine {...params} />);

        expect(getByText('mock')).toBeVisible();
        expect(getByText('10')).toBeVisible();
        expect(getByTestId('vertical-line-component')).toHaveStyle({ background: 'black', color: 'white' });
    });

    it('should render vertical line with no text', () => {
        const currParams = { ...params, showText: false };
        const { queryByText, getByTestId } = render(<VerticalGraphLine {...currParams} />);

        expect(queryByText('mock')).toBeNull();
        expect(queryByText('10')).toBeNull();
        expect(getByTestId('vertical-line-component')).toHaveStyle({ background: 'black', color: 'white' });
    });

    const params: IVerticalGraphLineProps = {
        text: 'mock',
        background: 'black',
        height: 12,
        fontSize: 10,
        showText: true,
        textColor: 'white',
        value: '10',
    };
});
