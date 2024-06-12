import React from 'react';
import { render } from '@testing-library/react';
import Tag, { TagProps } from './Tag';

describe('test group tag component', () => {
    it('should render tag component', () => {
        const { getByText, getByTestId } = render(<Tag {...params} />);

        expect(getByText('mock')).toBeVisible();
        expect(getByTestId('tag-component')).toHaveStyle({ color: 'white', background: 'red' });
    });

    const params: TagProps = {
        text: 'mock',
        styles: {
            root: {
                background: 'red',
                color: 'white',
            },
        },
    };
});
