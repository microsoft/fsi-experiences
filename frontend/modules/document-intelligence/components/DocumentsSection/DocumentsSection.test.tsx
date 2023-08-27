import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import DocumentsSection from './DocumentsSection';

const SectionContent = () => <span data-testid="test-section-content" />;
describe('DocumentsSection', () => {
    it('Should render document section', () => {
        const { getByText, getByTestId } = render(
            <DocumentsSection count={2} title="Test section">
                <SectionContent />
            </DocumentsSection>
        );

        expect(getByTestId('test-section-content')).toBeVisible();
        expect(getByText('Test section (2)')).toBeVisible();
    });

    it('Should hide docs when collapsing', () => {
        const { getByText, queryByTestId, getByTestId } = render(
            <DocumentsSection count={2} title="Test section">
                <SectionContent />
            </DocumentsSection>
        );
        fireEvent.click(getByTestId('collapse-icon'));
        expect(getByText('Test section (2)')).toBeVisible();
        expect(queryByTestId('test-section-content')).toBeNull();
    });

    it('Should be disabled when count equal 0', () => {
        const { getByText, queryByTestId, getByTestId } = render(
            <DocumentsSection count={0} title="Test section">
                <SectionContent />
            </DocumentsSection>
        );
        expect(getByTestId('collapse-icon')).toBeDisabled();
        expect(queryByTestId('test-section-content')).toBeNull();
    });

    it('Should have accessible labels (plural)', () => {
        const { getAllByLabelText } = render(
            <DocumentsSection count={2} title="Test section">
                <SectionContent />
            </DocumentsSection>
        );
        expect(getAllByLabelText('Document items')).toHaveLength(2);
    });

    it('Should have accessible labels (singular)', () => {
        const { getAllByLabelText } = render(
            <DocumentsSection count={1} title="Test section">
                <SectionContent />
            </DocumentsSection>
        );
        expect(getAllByLabelText('Document item')).toHaveLength(2);
    });
});
