import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import { FSIErrorTypes } from '../../../context/telemetry';

const ErrorComponent = () => {
    throw new Error('test error');
};

const Component = () => <div data-testid="valid-component"></div>;

const logger = {
    setPcfName: jest.fn(),
    logError: jest.fn(),
    logInfo: jest.fn(),
    logStartPerfTime: jest.fn(),
    setGlobalData: jest.fn(),
    logInteractionOrAction: jest.fn(),
    logActions: jest.fn(),
    logImpression: jest.fn(),
};

describe('ErrorBoundary', () => {
    beforeEach(() => {
        logger.logError.mockClear();
    });
    it('Should catch rendering error and log', () => {
        const { getByText } = render(
            <ErrorBoundary componentName="TestComponent" title="something went wrong" subtitle="contact IT" logger={logger}>
                <ErrorComponent />
            </ErrorBoundary>
        );

        expect(logger.logError).toBeCalledWith(
            'TestComponent',
            'componentDidCatch',
            'test error',
            FSIErrorTypes.GenericError,
            expect.any(Object),
            expect.any(Object)
        );

        expect(getByText('something went wrong')).toBeVisible();
        expect(getByText('contact IT')).toBeVisible();
    });

    it('Should render non throwing component', () => {
        const { getByTestId } = render(
            <ErrorBoundary componentName="TestComponent" title="something went wrong" logger={logger}>
                <Component />
            </ErrorBoundary>
        );

        expect(logger.logError).not.toBeCalled();
        expect(getByTestId('valid-component')).toBeVisible();
    });
});
