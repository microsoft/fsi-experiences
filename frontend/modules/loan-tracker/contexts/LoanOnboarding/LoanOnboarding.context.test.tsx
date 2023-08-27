import React, { useContext } from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import LoanOnboardingContextProvider, { LoanOnboardingContext } from './LoanOnboarding.context';
import { MockLoanOnboardingFetcher } from '../../interfaces/ILoanOnboarding/mocks/ILoanOnboardingFetcher.mocks';
import { mockApplications, mockUpdatedLoanApplication } from '../../interfaces/ILoanApplication/mocks/ILoanApplication.mocks';

let messages: any = [];
const postMessage = jest.fn();

jest.mock('@fsi/core-components/dist/hooks/useBrowserCommunication/useBrowserCommunication', () => {
    return jest.fn(() => ({
        messages,
        postMessage,
    }));
});

describe('LoanOnboardingContextProvider', () => {
    it('should render the context provider component', async () => {
        let component;

        await act(async () => {
            component = render(
                <LoanOnboardingContextProvider fetcher={new MockLoanOnboardingFetcher()}>
                    <div>Hello</div>
                </LoanOnboardingContextProvider>
            );
        });

        const { getByText } = component;
        expect(getByText('Hello')).toBeInTheDocument();
    });

    it('should  trigger fetchApplications', async () => {
        const mockFetcher = new MockLoanOnboardingFetcher();

        jest.spyOn(mockFetcher, 'fetchApplications');

        await act(async () => {
            await render(
                <LoanOnboardingContextProvider fetcher={mockFetcher}>
                    <div>Hello</div>
                </LoanOnboardingContextProvider>
            );
        });

        expect(mockFetcher.fetchApplications).toBeCalled();
    });

    it('should  trigger getBusinessFlowSteps', async () => {
        const mockFetcher = new MockLoanOnboardingFetcher();

        jest.spyOn(mockFetcher, 'getBusinessFlowSteps');

        await act(async () => {
            await render(
                <LoanOnboardingContextProvider fetcher={mockFetcher}>
                    <div>Hello</div>
                </LoanOnboardingContextProvider>
            );
        });

        expect(mockFetcher.getBusinessFlowSteps).toBeCalled();
    });

    it('should fallback to first element in list if there is none selected', async () => {
        const mockFetcher = new MockLoanOnboardingFetcher();

        const spy = jest.spyOn(mockFetcher, 'fetchCurrentApplicationId');

        spy.mockImplementationOnce(() => Promise.resolve(''));

        let component;

        const MockComponent = () => {
            const { selectedApplication } = useContext(LoanOnboardingContext);

            return (
                <div>
                    <div>{selectedApplication?.name}</div>
                </div>
            );
        };

        await act(async () => {
            component = await render(
                <LoanOnboardingContextProvider fetcher={mockFetcher}>
                    <MockComponent />
                </LoanOnboardingContextProvider>
            );
        });

        expect(mockFetcher.fetchCurrentApplicationId).toBeCalled();
        expect(component.queryByText(mockApplications[0].name)).toBeVisible();
    });

    it('should trigger setSelected', async () => {
        let component;

        const MockComponent = () => {
            const { setSelected, selectedApplication } = useContext(LoanOnboardingContext);

            return (
                <div>
                    <button onClick={() => setSelected(mockApplications[1])}>Select application</button>
                    <div>{selectedApplication?.name}</div>
                </div>
            );
        };

        await act(async () => {
            component = await render(
                <LoanOnboardingContextProvider fetcher={new MockLoanOnboardingFetcher()}>
                    <MockComponent />
                </LoanOnboardingContextProvider>
            );
        });

        expect(component.queryByText(mockApplications[0].name)).toBeVisible();

        await act(async () => {
            await fireEvent.click(component.queryByText('Select application'));
        });

        expect(component.queryByText(mockApplications[1].name)).toBeVisible();
        expect(component.queryByText(mockApplications[0].name)).toBeNull();
    });

    it('should trigger setSearchTerm', async () => {
        let component;

        const MockComponent = () => {
            const { setSearchTerm, searchTerm } = useContext(LoanOnboardingContext);

            return (
                <div>
                    <button onClick={() => setSearchTerm(mockApplications[1].name)}>Update Search</button>
                    <div>{searchTerm}</div>
                </div>
            );
        };

        await act(async () => {
            component = await render(
                <LoanOnboardingContextProvider fetcher={new MockLoanOnboardingFetcher()}>
                    <MockComponent />
                </LoanOnboardingContextProvider>
            );
        });

        expect(component.queryByText(mockApplications[1].name)).toBeNull();

        await act(async () => {
            await fireEvent.click(component.queryByText('Update Search'));
        });

        expect(component.queryByText(mockApplications[1].name)).toBeVisible();
    });

    it('should trigger updateApplication and return updated data', async () => {
        messages = [mockUpdatedLoanApplication.id];

        let component;
        const mockFetcher = new MockLoanOnboardingFetcher();

        jest.spyOn(mockFetcher, 'getUpdatedLoanApplicationData');

        await act(async () => {
            component = await render(
                <LoanOnboardingContextProvider fetcher={mockFetcher}>
                    <div>Hello</div>
                </LoanOnboardingContextProvider>
            );
        });

        expect(mockFetcher.getUpdatedLoanApplicationData).toBeCalled();
    });

    it('should trigger updateApplication even if data returned not valid', async () => {
        messages = [mockUpdatedLoanApplication.id];

        let component;
        const mockFetcher = new MockLoanOnboardingFetcher();

        jest.spyOn(mockFetcher, 'getUpdatedLoanApplicationData').mockImplementationOnce((loanId: string) => Promise.resolve(undefined));

        await act(async () => {
            component = await render(
                <LoanOnboardingContextProvider fetcher={mockFetcher}>
                    <div>Hello</div>
                </LoanOnboardingContextProvider>
            );
        });

        expect(mockFetcher.getUpdatedLoanApplicationData).toBeCalled();
    });

    it('should trigger archiveApplication', async () => {
        const mockFetcher = new MockLoanOnboardingFetcher();

        jest.spyOn(mockFetcher, 'archiveApplication').mockImplementationOnce((applicationId: string, archiveReason: string, comment?: string) =>
            Promise.resolve()
        );

        const MockComponent = () => {
            const { archiveApplication } = useContext(LoanOnboardingContext);
            return <button onClick={() => archiveApplication('', '')}>Archive application</button>;
        };

        const { getByText } = render(
            <LoanOnboardingContextProvider fetcher={mockFetcher}>
                <MockComponent />
            </LoanOnboardingContextProvider>
        );

        const archiveButton = getByText('Archive application');
        fireEvent.click(archiveButton);

        expect(mockFetcher.archiveApplication).toBeCalled();
    });
});
