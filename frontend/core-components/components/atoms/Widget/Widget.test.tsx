import React from 'react';
import { render } from '@testing-library/react';
import commonStrings from '../../../assets/strings/common/common.1033.json';
import Widget from './Widget';

describe('Widget', () => {
    it('Should render Widget', () => {
        const { getByText } = render(<Widget header="Test Title">Content</Widget>);

        expect(getByText('Test Title')).toBeVisible();
        expect(getByText('Content')).toBeVisible();
    });

    it('Should render Widget loading', () => {
        const { getByTestId } = render(
            <Widget isLoading header="Test Title">
                Content
            </Widget>
        );

        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('Should render Widget error', () => {
        const { getByText } = render(
            <Widget isError header="Test Title">
                Content
            </Widget>
        );

        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();
    });

    it('Should render Widget empty', () => {
        const { getByText } = render(<Widget emptyProps={{ title: 'Empty', subtitle: 'Subtitle', iconSize: 48, icon: '' }}>Content</Widget>);

        expect(getByText('Empty')).toBeVisible();
        expect(getByText('Subtitle')).toBeVisible();
    });
});
