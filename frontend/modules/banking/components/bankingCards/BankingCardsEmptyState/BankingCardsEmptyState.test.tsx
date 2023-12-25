import React from 'react';
import { render } from '@testing-library/react';
import BankingCardsEmptyState from './BankingCardsEmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';

describe('BankingCardsEmptyState', () => {
    it('Should render credit cards empty state', async () => {
        const { getByText, container } = render(<BankingCardsEmptyState text="It's empty here" />);

        expect(getByText("It's empty here")).toBeVisible();

        const displayedImage = container.querySelector('img') as HTMLImageElement;
        expect(displayedImage.src).toContain(IMAGE_SRC.emptyState48);
    });
});
