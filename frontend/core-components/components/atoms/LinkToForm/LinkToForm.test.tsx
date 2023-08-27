import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LinkToForm from './LinkToForm';
import { FSIContext, FSIDefaultContextValue } from '../../../context/FSIContext';

describe('LinkToForm', () => {
    it('Should render value in a link', () => {
        const { getByTestId } = render(<LinkToForm {...params} />);

        const link = getByTestId('link-link');
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('91071 - Hinuchit Romema, Anywhere');
    });

    it('Should call navigation when clicking link', () => {
        const currContext = {
            value: {
                ...FSIDefaultContextValue,
                navigation: { openForm: jest.fn() },
            },
        };

        const { getByTestId } = render(
            <FSIContext.Provider {...currContext}>
                <LinkToForm {...params} />
            </FSIContext.Provider>
        );

        const link = getByTestId('link-link');
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('91071 - Hinuchit Romema, Anywhere');
        fireEvent.click(link);
        expect(currContext.value.navigation.openForm).toHaveBeenCalledTimes(1);
        expect(currContext.value.navigation.openForm.mock.calls[0][0]).toEqual(params.link);
        expect(currContext.value.navigation.openForm.mock.calls[0][1]).toEqual(params.entityName);
    });

    it('Should render value in a text if no id exists', () => {
        const contactToTest = {
            ...params,
            link: undefined,
        };

        const { getAllByTestId } = render(<LinkToForm {...contactToTest} />);

        const text = getAllByTestId('link-field-value').filter(text => text.textContent?.includes('91071 - Hinuchit Romema, Anywhere'));
        expect(text[0]).toBeVisible();
    });

    it('Should render value in a text if no navigation', () => {
        const currContext = {
            value: {
                ...FSIDefaultContextValue,
                navigation: undefined,
            },
        };

        const { getAllByTestId } = render(
            <FSIContext.Provider {...currContext}>
                <LinkToForm {...params} />
            </FSIContext.Provider>
        );

        const text = getAllByTestId('link-field-value').filter(text => text.textContent?.includes('91071 - Hinuchit Romema, Anywhere'));
        expect(text[0]).toBeVisible();
    });

    const params = {
        value: '91071 - Hinuchit Romema, Anywhere',
        entityName: 'msfsi_branch',
        link: '123',
    };
});
