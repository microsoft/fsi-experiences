import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ViewWithNotification from './ViewWithNotification';
import { IViewWithNotificationProps } from './ViewWithNotification.interface';
import { MessageBarType } from '@fluentui/react';

describe('ViewWithNotification', () => {
    const mockChildContent = 'Hello World';

    const mockProps: IViewWithNotificationProps = {
        notificationContent: 'test',
        onDismissNotification: jest.fn(),
    };

    it('should render component without notification as default', () => {
        const { queryByText, queryByTestId } = render(<ViewWithNotification {...mockProps}>{mockChildContent}</ViewWithNotification>);

        expect(queryByTestId('message-bar')).toBeNull();
        expect(queryByText(mockChildContent)).toBeVisible();
    });

    it('should render component with notification message string with default notification type', async () => {
        const { queryByText, container, queryByTestId } = render(
            <ViewWithNotification notificationContent="test" displayNotification>
                {mockChildContent}
            </ViewWithNotification>
        );

        expect(queryByTestId('message-bar')).toBeVisible();
        expect(queryByText(mockChildContent)).toBeVisible();

        const icon = container.querySelector('i[data-icon-name="Info"]');
        expect(icon).toBeVisible();
    });

    it('should render view with notification content component', () => {
        const mockNotificationContent = () => <div>Notification</div>;
        const { queryByText, queryByTestId } = render(
            <ViewWithNotification {...mockProps} notificationContent={mockNotificationContent} displayNotification>
                {mockChildContent}
            </ViewWithNotification>
        );

        expect(queryByTestId('message-bar')).toBeVisible();
        expect(queryByText(mockChildContent)).toBeVisible();
    });

    it('should render view with different notification type', () => {
        const { container } = render(
            <ViewWithNotification {...mockProps} displayNotification notificationType={MessageBarType.blocked}>
                {mockChildContent}
            </ViewWithNotification>
        );

        const icon = container.querySelector('i[data-icon-name="Blocked2"]');
        expect(icon).toBeVisible();
    });

    it('should hide the notification on dismiss', () => {
        const { getByRole } = render(
            <ViewWithNotification {...mockProps} notificationContent="test" displayNotification>
                {mockChildContent}
            </ViewWithNotification>
        );

        fireEvent.click(getByRole('button'));

        expect(mockProps.onDismissNotification).toBeCalled();
    });

    afterEach(cleanup);
});
