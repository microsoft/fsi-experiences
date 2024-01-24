import React from 'react';
import { render } from '@testing-library/react';
import FHDataBox from './FHDataBox';
import { FHDataBoxType, IFHDataBoxProps } from './FHDataBox.interface';
import { SECONDARY_CURR_CODE } from '@fsi/core-components/dist/context/currency/ICurrenciesDetails.mock';
import { getFHFetcherMock } from '../../DetailedFHData.mock';
import { toDate } from '@fsi/core-components/dist/utilities/TimeUtils';
import { toRate } from '@fsi/core-components/dist/utilities/CalcUtils';

describe('FHDataBox', () => {
    const TEST_LABEL = 'test label';
    const TEST_VALUE = 'test value';

    const fhEntity = getFHFetcherMock()[1];

    it('should render simple text box with style', () => {
        const testProps: IFHDataBoxProps = {
            boxDetails: {
                type: FHDataBoxType.Text,
                label: TEST_LABEL,
                labelColor: 'red',
                value: TEST_VALUE,
            },
            styles: {
                root: {
                    fontSize: 20,
                },
            },
        };

        const { getByText } = render(<FHDataBox {...testProps} />);
        expect(getByText(TEST_LABEL)).toBeVisible();
        expect(getByText(TEST_VALUE)).toBeVisible();

        expect(getByText(TEST_VALUE)).toHaveStyle({ fontSize: 20 });
        expect(getByText(TEST_LABEL)).toHaveStyle({ color: 'red' });
    });

    it('should render currency text box', () => {
        const testProps: IFHDataBoxProps = {
            boxDetails: {
                type: FHDataBoxType.Currency,
                label: TEST_LABEL,
                value: 121212,
            },
            entity: {
                ...fhEntity,
                currencyId: SECONDARY_CURR_CODE,
            },
        };

        const { getByText } = render(<FHDataBox {...testProps} />);

        expect(getByText(TEST_LABEL)).toBeVisible();
        expect(getByText('121,212')).toBeVisible();
        expect(getByText(SECONDARY_CURR_CODE)).toBeVisible();
    });

    it('should render signed currency text box', () => {
        const testProps: IFHDataBoxProps = {
            boxDetails: {
                type: FHDataBoxType.SignedCurrency,
                label: TEST_LABEL,
                value: 121212,
            },
            entity: {
                ...fhEntity,
                currencyId: SECONDARY_CURR_CODE,
            },
        };

        const { getByText } = render(<FHDataBox {...testProps} />);

        expect(getByText(TEST_LABEL)).toBeVisible();
        expect(getByText('+121,212')).toBeVisible();
        expect(getByText(SECONDARY_CURR_CODE)).toBeVisible();
    });

    it('should render numeric text box', () => {
        const testProps: IFHDataBoxProps = {
            boxDetails: {
                type: FHDataBoxType.Number,
                label: TEST_LABEL,
                value: 121212,
            },
            entity: {
                ...fhEntity,
                currencyId: SECONDARY_CURR_CODE,
            },
        };

        const { getByText, queryByText } = render(<FHDataBox {...testProps} />);

        expect(getByText(TEST_LABEL)).toBeVisible();
        expect(getByText('121,212')).toBeVisible();
        expect(queryByText(SECONDARY_CURR_CODE)).toBeNull();
    });

    it('should render date text box', () => {
        const date = new Date('12/12/2012');
        const testProps: IFHDataBoxProps = {
            boxDetails: {
                type: FHDataBoxType.Date,
                label: TEST_LABEL,
                value: date,
            },
        };

        const { getByText } = render(<FHDataBox {...testProps} />);

        expect(getByText(TEST_LABEL)).toBeVisible();
        expect(getByText(toDate(date))).toBeVisible();
    });

    it('should render rate text box', () => {
        const testProps: IFHDataBoxProps = {
            boxDetails: {
                type: FHDataBoxType.Rate,
                label: TEST_LABEL,
                value: 51,
            },
        };

        const { getByText } = render(<FHDataBox {...testProps} />);

        expect(getByText(TEST_LABEL)).toBeVisible();

        expect(getByText(toRate(51))).toBeVisible();
    });
});
