import React from 'react';
import { render } from '@testing-library/react';
import DocumentIntelligenceWrapper from './DocumentIntelligenceWrapper';

describe('DocumentIntelligenceWrapper', () => {
    it('Should render DI with the same props', () => {
        const { getByTestId } = render(
            <DocumentIntelligenceWrapper>
                <div data-testid="di-mocked" />
            </DocumentIntelligenceWrapper>
        );

        expect(getByTestId('di-mocked')).toBeVisible();
        expect(getByTestId('responsive-container')).toBeVisible();
    });
});
