import React from 'react';
import { render } from '@testing-library/react';
import renderText from './renderText';

describe('DetailedMembersGroup-renderText', () => {
    it('should render text', () => {
        const name = 'test-name';

        const { getByTestId } = render(<div>{renderText({ styles: { root: {} }, text: 'test', name })}</div>);
        expect(getByTestId(`group-detailed-holdings-row-cell-${name}`)).toBeInTheDocument();
    });
});
