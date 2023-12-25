import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import EmptyState from './EmptyState';
import { IEmptyStateProps } from './EmptyState.interface';
import { IMAGE_SRC } from '../../../constants';

const SUB_TITLE_TEST_ID = 'empty-state-sub-title';
const ICON_TEST_ID = 'empty-state-icon';
const ACTION_TEST_ID = 'empty-state-action';

describe('EmptyState', () => {
    const onCallToAction = jest.fn();
    const callsToAction = [
        {
            title: 'call to action',
            callback: onCallToAction,
        },
    ];

    const emptyStateProps: IEmptyStateProps = {
        title: 'empty state title',
    };

    beforeEach(() => {
        onCallToAction.mockClear();
    });

    it('Should render empty state with only title', () => {
        const { getByText, queryByTestId } = render(<EmptyState {...emptyStateProps} />);

        expect(getByText(emptyStateProps.title)).toBeVisible();
        expect(queryByTestId(SUB_TITLE_TEST_ID)).toBeNull();
        expect(queryByTestId(ACTION_TEST_ID)).toBeNull();
        expect(queryByTestId(ICON_TEST_ID)).toBeNull();
    });

    it('Should render empty state with  subtitle', () => {
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            subtitle: 'subtitle',
        };
        const { getByText, queryByTestId, getByTestId } = render(<EmptyState {...props} />);

        expect(getByTestId(SUB_TITLE_TEST_ID)).toBeVisible();
        expect(getByText(props.subtitle!)).toBeVisible();
    });

    it('Should render empty state with icon', () => {
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            icon: IMAGE_SRC.create100,
            iconSize: 100,
        };
        const { getByTestId } = render(<EmptyState {...props} />);

        const displayedImage = getByTestId(ICON_TEST_ID);
        expect(displayedImage).toBeVisible();
        expect((displayedImage.querySelector('img') as HTMLImageElement).src).toContain(IMAGE_SRC.create100);
    });

    it('Should render empty state with action button', () => {
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            callsToAction,
        };
        const { getByTestId, getByRole } = render(<EmptyState {...props} />);

        const button = getByRole('button', { name: callsToAction[0].title });

        expect(getByTestId(ACTION_TEST_ID)).toBeVisible();
        expect(button).toBeVisible();

        fireEvent.click(button);

        expect(onCallToAction).toHaveBeenCalled();
    });

    it('Should render empty state with footer', () => {
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            footer: <span data-testid="mocked-footer" />,
        };
        const { getByTestId } = render(<EmptyState {...props} />);

        expect(getByTestId('mocked-footer')).toBeVisible();
    });

    it('Should render empty state with custom style', () => {
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            styles: {
                container: {
                    padding: 0,
                },
            },
        };
        const { getByTestId } = render(<EmptyState {...props} />);

        expect(getByTestId('empty-state')).toHaveStyle({
            padding: '0px 0px 0px 0px',
        });
    });

    it('Should render empty horizontal buttons', () => {
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            callsToAction,
            horizontalActions: true,
        };
        const { getByTestId } = render(<EmptyState {...props} />);

        expect(getByTestId('empty-state-actions')).toHaveStyle({
            'flex-direction': 'row',
        });
    });

    it('Should render empty state with icons in action button', () => {
        const callsToAction = [
            {
                title: 'call to action',
                callback: onCallToAction,
                iconProps: {
                    iconName: 'Add',
                },
            },
        ];
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            callsToAction,
        };
        const { getByTestId, getByRole } = render(<EmptyState {...props} />);

        const button = getByRole('button', { name: callsToAction[0].title });

        expect(getByTestId(ACTION_TEST_ID)).toBeVisible();
        expect(button).toBeVisible();
        expect(button.querySelector('i[data-icon-name="Add"]')).toBeVisible();

        fireEvent.click(button);

        expect(onCallToAction).toHaveBeenCalled();
    });

    it('Should render disabled empty state with icons in action button', () => {
        const callsToAction = [
            {
                title: 'call to action',
                callback: onCallToAction,
                disabled: true,
                iconProps: {
                    iconName: 'Add',
                },
            },
        ];
        const props: IEmptyStateProps = {
            ...emptyStateProps,
            callsToAction,
        };
        const { getByRole } = render(<EmptyState {...props} />);

        const button = getByRole('button', { name: callsToAction[0].title });

        fireEvent.click(button);

        expect(onCallToAction).not.toHaveBeenCalled();
    });
});
