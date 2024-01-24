import React from 'react';
import { act, render, waitForElementToBeRemoved } from '@testing-library/react';
import FHSummary from './FHSummary';
import { sleep } from '@fsi/core-components/dist/utilities/TimeUtils';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import ProviderWrapper, { testingQueryClient } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import { MockFHFetcher } from '../../constants/MockFHFetcher';

const ProviderFHSummary = ProviderWrapper(FHSummary);

describe('FH summary screen Widget', () => {
    beforeEach(() => {
        testingQueryClient.clear();
    });

    it('Should render summary screen on overview table tab', async () => {
        const { getByText, getAllByRole } = render(
            <ProviderFHSummary fetcher={new MockFHFetcher()} contactId={'2bf9f548-b449-eb11-a813-000d3a3b70e0'} />
        );

        await waitForElementToBeRemoved(() => getByText(/Loading/i));

        const categoryMenu = getAllByRole('tab');
        expect(categoryMenu).toHaveLength(6);
        expect(categoryMenu[0].lastChild?.textContent).toContain('Overview');
        expect(categoryMenu[1].lastChild?.textContent).toContain('Accounts');
        expect(categoryMenu[2].lastChild?.textContent).toContain('Investments');
        expect(categoryMenu[3].lastChild?.textContent).toContain('Loans');
        expect(categoryMenu[4].lastChild?.textContent).toContain('Lines of credit');
        expect(categoryMenu[5].lastChild?.textContent).toContain('Long-term savings');
    });

    it('Should render error state', async () => {
        const fhMockFetcher = new MockFHFetcher();

        fhMockFetcher.fetchFHData = async () => {
            throw new Error();
        };

        const { getByText, getByTestId } = render(<ProviderFHSummary fetcher={fhMockFetcher} contactId={'2bf9f548-b449-eb11-a813-000d3a3b70e0'} />);
        await act(() => sleep(1000));

        expect(getByTestId('error-state')).toBeVisible();
        expect(getByText(commonStrings.ERROR_STATE_TITLE)).toBeVisible();

        const displayedImage = document.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.error100);
    });
});
