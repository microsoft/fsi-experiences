import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import LinkablePersona from './LinkablePersona';
import FSIContext, { FSIDefaultContextValue } from '../../../context/FSIContext';

describe('LinkablePersona', () => {
    const FSIContextValueMock = {
        ...FSIDefaultContextValue,
        navigation: { openForm: jest.fn() },
    };
    const personaName = 'Ben Gold';
    const customerInitials = 'BG';
    const personas = [{ personaName, data: { personaName, id: '123' } }];

    beforeEach(() => {
        FSIContextValueMock.navigation.openForm.mockClear();
    });

    it('Should render persona', () => {
        const { getByText } = render(<LinkablePersona personas={personas} />);

        expect(getByText(personaName)).toBeVisible();
        expect(getByText(customerInitials)).toBeVisible();
    });

    it('Should render clickable persona and call openForm from context', () => {
        const entityName = 'contact';
        const { getByText } = render(
            <FSIContext.Provider value={FSIContextValueMock}>
                <LinkablePersona personas={personas} personaProps={{ secondaryText: 'test' }} />
            </FSIContext.Provider>
        );

        const persona = getByText(personas[0].personaName);
        expect(persona).toBeVisible();

        fireEvent.click(persona);
        expect(FSIContextValueMock.navigation.openForm).toHaveBeenCalledWith(personas[0].data.id, entityName, '');
    });
});
