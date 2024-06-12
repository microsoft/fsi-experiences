import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Collapse from './Collapse';

describe('Collapse', () => {
    it('Should render collapse', async () => {
        const { queryByTestId, getByTestId } = render(
            <Collapse content={<div>content</div>}>
                <div data-testid="content-test-div">just check</div>
            </Collapse>
        );

        expect(queryByTestId('content-test-div')).not.toBeInTheDocument();
        fireEvent.click(getByTestId('collapse-icon'));
        expect(queryByTestId('content-test-div')).toBeInTheDocument();
    });
});
