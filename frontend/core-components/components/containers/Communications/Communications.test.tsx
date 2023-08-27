/* eslint-disable jest/expect-expect */
import React from 'react';
import { render } from '@testing-library/react';
import Communications from './Communications';
import { PreferredContactMethod } from '../../../enums/PreferredContactMethod';
import { nonPreferredColor } from './CommunicationItem';
import customerSnapshotStrings from '../../../assets/strings/CustomerSnapshotControl/CustomerSnapshotControl.1033.json';
import difference from 'lodash/difference';

const dummyThemePrimary = '#000000';

const allTitles = [
    customerSnapshotStrings.PREFERRED_COMM_PHONE,
    customerSnapshotStrings.PREFERRED_COMM_EMAIL,
    customerSnapshotStrings.PREFERRED_COMM_MAIL,
];
const preferredToTitles = {
    1: allTitles,
    2: [customerSnapshotStrings.PREFERRED_COMM_EMAIL],
    3: [customerSnapshotStrings.PREFERRED_COMM_PHONE],
    5: [customerSnapshotStrings.PREFERRED_COMM_MAIL],
};

jest.mock('@fluentui/react/lib/utilities/ThemeProvider/useTheme', () => ({
    useTheme: () => ({
        palette: {
            themePrimary: '#000000',
        },
    }),
}));
describe('Communications components tests', () => {
    const contactMethodToId: Map<PreferredContactMethod, number> = new Map([
        [PreferredContactMethod.Any, 1],
        [PreferredContactMethod.Email, 2],
        [PreferredContactMethod.Phone, 3],
        [PreferredContactMethod.Mail, 5],
    ]);

    const renderAndVerify = (preferred: number, phoneStyle: string, emailStyle: string, mailStyle: string) => {
        const { getAllByTestId, queryByLabelText } = render(
            <Communications
                preferred={preferred}
                doNotPostalMail={false}
                doNotEmail={false}
                doNotPhone={false}
                contactMethodToId={contactMethodToId}
            />
        );
        expect(getAllByTestId('communication-icon').length).toEqual(3);
        expect(getAllByTestId('communication-icon')[0]).toHaveStyle({ color: phoneStyle });
        expect(getAllByTestId('communication-icon')[1]).toHaveStyle({ color: emailStyle });
        expect(getAllByTestId('communication-icon')[2]).toHaveStyle({ color: mailStyle });

        const visibleTitles: string[] = preferredToTitles[preferred] || [];

        visibleTitles.forEach(visibleTitle => expect(queryByLabelText(visibleTitle)).toBeVisible());

        difference(allTitles, visibleTitles).forEach(nonVisibleTitle => expect(queryByLabelText(nonVisibleTitle)).toBeNull());
    };

    it('Communications should render properly - and "any" should set preferred true', () => {
        renderAndVerify(1, dummyThemePrimary, dummyThemePrimary, dummyThemePrimary);
    });

    it('Communications should render properly - and Email as preferred should set emails preferred true', () => {
        renderAndVerify(2, nonPreferredColor, dummyThemePrimary, nonPreferredColor);
    });

    it('Communications should render properly - and Phone as preferred should set emails preferred true', () => {
        renderAndVerify(3, dummyThemePrimary, nonPreferredColor, nonPreferredColor);
    });

    it('Communications should render properly - and Mail as preferred should set emails preferred true', () => {
        renderAndVerify(5, nonPreferredColor, nonPreferredColor, dummyThemePrimary);
    });

    it('Communications should render properly - and got none is recognized as preferred should set all non preferred', () => {
        renderAndVerify(45, nonPreferredColor, nonPreferredColor, nonPreferredColor);
    });
});
