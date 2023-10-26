import React from 'react';
import { render } from '@testing-library/react';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import FHHiddenMessageBar from './FHHiddenMessageBar';

describe('FHHiddenMessageBar', () => {
    let categoriesMetadata: { [entityName: string]: HttpStatusCode };

    beforeEach(() => {
        categoriesMetadata = {
            msfsi_FH_Account: HttpStatusCode.OK,
            msfsi_FH_Creditline: HttpStatusCode.OK,
            msfsi_FH_Investment: HttpStatusCode.OK,
            msfsi_FH_Loan: HttpStatusCode.OK,
            msfsi_FH_Saving: HttpStatusCode.OK,
        };
    });

    it('Should not render bar', async () => {
        const { queryByTestId } = render(<FHHiddenMessageBar requestMetadata={categoriesMetadata} highlightedText={'test'} />);

        const hiddenBar = queryByTestId(/hidden-bar-/i);
        expect(hiddenBar).toBeNull();
    });

    it('Should render bar', async () => {
        categoriesMetadata = {
            ...categoriesMetadata,
            msfsi_FH_Account: HttpStatusCode.NO_CONTENT,
        };
        const { queryByTestId } = render(<FHHiddenMessageBar requestMetadata={categoriesMetadata} highlightedText={'test'} />);

        const hiddenBar = queryByTestId(/hidden-bar/i);
        expect(hiddenBar).toBeVisible();
    });
});
