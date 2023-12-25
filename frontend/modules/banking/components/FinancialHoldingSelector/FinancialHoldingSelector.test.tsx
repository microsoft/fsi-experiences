import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import FinancialHoldingSelector from './FinancialHoldingSelector';
import { QueryClientWrapper } from '@fsi/core-components/dist/utilities/tests/ProviderWrapper';
import { emptyFHFetcher, MockFHFetcher } from '../../constants/MockFHFetcher';
import { renderHook } from '@testing-library/react-hooks';
import FSIContext, { FSIDefaultContextValue } from '@fsi/core-components/dist/context/FSIContext';
import { fhVal6 } from '../../components/summaryFH/FHData.mock';
import useFinancialHoldingsByCategory from '../../hooks/financialHoldings/useFinancialHoldingsByCategory';

const props = { contactId: '1', fetcher: new MockFHFetcher(), onChange: () => {} };
let isMobile = false;
jest.mock('@fsi/core-components/dist/hooks/useMediaQueryListener/useMediaQueryListener', () => {
    return jest.fn(() => isMobile);
});

describe('FinancialHoldingSelector', () => {
    it('Should render FinancialHoldingSelector', async () => {
        const { getByTestId } = render(<FinancialHoldingSelector {...props} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('financial-holding-list')).toBeVisible();
    });

    it('Should call onChange if nothing selected', async () => {
        const { result } = renderHook(() => useFinancialHoldingsByCategory({ contactId: props.contactId, fetcher: props.fetcher }), {
            wrapper: QueryClientWrapper,
        });
        const mockedOnChange = jest.fn();
        const { getByTestId } = render(<FinancialHoldingSelector {...props} onChange={mockedOnChange} />, { wrapper: QueryClientWrapper });
        expect(getByTestId('financial-holding-list')).toBeVisible();

        waitFor(() => {
            expect(mockedOnChange).toBeCalledWith(result.current.entities[0]);
        });
    });

    it('Should not call onChange if selected', async () => {
        const mockedOnChange = jest.fn();
        const { getByTestId } = render(<FinancialHoldingSelector {...props} onChange={mockedOnChange} selectedFinancialHoldingId="1" />, {
            wrapper: QueryClientWrapper,
        });
        expect(getByTestId('financial-holding-list')).toBeVisible();

        expect(mockedOnChange).not.toBeCalled();
    });

    it('Should not call onChange if no entities', async () => {
        const mockedOnChange = jest.fn();
        const { getByTestId } = render(
            <FinancialHoldingSelector {...props} onChange={mockedOnChange} fetcher={emptyFHFetcher} selectedFinancialHoldingId="1" />,
            {
                wrapper: QueryClientWrapper,
            }
        );

        expect(getByTestId('financial-holding-list')).toBeVisible();

        expect(mockedOnChange).not.toBeCalled();
    });

    it('Should call openForm in financialHoldingSelector when mobile', async () => {
        isMobile = true;
        const mockedOnChange = jest.fn();
        const openForm = jest.fn();
        const FSIContextValueMock = {
            ...FSIDefaultContextValue,
            navigation: { openForm },
        };
        const { queryByTestId, getByTestId } = render(
            <FSIContext.Provider value={FSIContextValueMock}>
                <FinancialHoldingSelector
                    {...props}
                    financialHoldingsCategory={`${fhVal6.category}`}
                    onChange={mockedOnChange}
                    selectedFinancialHoldingId="1"
                />
            </FSIContext.Provider>,
            {
                wrapper: QueryClientWrapper,
            }
        );
        await waitFor(() => {
            expect(queryByTestId('loading-spinner')).not.toBeInTheDocument();
        });

        fireEvent.click(getByTestId('fh-card-view'));

        expect(openForm).toBeCalled();
    });
});
