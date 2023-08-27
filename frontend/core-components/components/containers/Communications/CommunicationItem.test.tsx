import React from 'react';
import { render } from '@testing-library/react';
import { PreferredContactMethod } from '../../../enums/PreferredContactMethod';
import CommunicationItem, { nonPreferredColor } from './CommunicationItem';

describe('CommunicationItem', () => {
    it('Should render Communication item correctly when isPreferred true', () => {
        const { getByTestId } = render(<CommunicationItem contactMethod={PreferredContactMethod.Email} iconName={'Accounts'} isPreferred={true} />);

        expect(getByTestId('communication-icon')).not.toHaveStyle({ color: nonPreferredColor });
    });

    it('Should render Communication item correctly when isPreferred false', () => {
        const { getByTestId } = render(<CommunicationItem contactMethod={PreferredContactMethod.Email} iconName={'Accounts'} isPreferred={false} />);

        expect(getByTestId('communication-icon')).toHaveStyle({ color: nonPreferredColor });
    });

    it('Should render Communication item with extra text', () => {
        const { getByLabelText } = render(
            <CommunicationItem contactMethod={PreferredContactMethod.Email} iconName={'Accounts'} isPreferred={false} text={'extra info text'} />
        );

        expect(getByLabelText('extra info text')).toBeVisible();
    });
});
