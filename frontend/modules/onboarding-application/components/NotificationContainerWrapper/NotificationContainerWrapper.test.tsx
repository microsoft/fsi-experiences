import React from 'react';
import { render } from '@testing-library/react';
import { NotificationContainerWrapper } from './NotificationContainerWrapper';

describe('NotificationContainerWrapper', () => {
    it('should render the component', () => {
        const { getByText } = render(
            <NotificationContainerWrapper>
                <div>Test</div>
            </NotificationContainerWrapper>
        );

        expect(getByText('Test')).toBeTruthy();
    });
});
