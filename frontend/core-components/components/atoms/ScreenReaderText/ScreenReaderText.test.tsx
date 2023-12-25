import React from 'react';
import { render } from '@testing-library/react';
import ScreenReaderText from './ScreenReaderText';

describe('ScreenReaderText', () => {
    it('Should be rendered in DOM', () => {
        const { getByTestId } = render(<ScreenReaderText id="screenReaderText">Some text</ScreenReaderText>);
        const screenReaderText = getByTestId('screenReaderText');
        expect(screenReaderText).toBeInTheDocument();
    });
});
