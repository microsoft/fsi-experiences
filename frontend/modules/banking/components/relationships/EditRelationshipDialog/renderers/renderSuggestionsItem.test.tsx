import { render } from '@testing-library/react';
import { getRelationshipsMock } from '../../../../interfaces/Relationships/mocks/IRelationship.mock';
import renderSuggestionsItems from './renderSuggestionsItem';
import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';

describe('RenderSuggestionsItem', () => {
    const contact: IAbbreviatedContact = getRelationshipsMock()[0].contactTo;

    it('Should render suggestion with contact name', async () => {
        const { getByText, queryByTestId } = render(renderSuggestionsItems(contact));

        expect(queryByTestId(/relationship-contact-persona/i)).toBeVisible();
        expect(getByText(contact.fullName)).toBeVisible();
    });
});
