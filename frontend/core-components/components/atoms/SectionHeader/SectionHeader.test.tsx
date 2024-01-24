import React from 'react';
import { render } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

describe('SectionHeader', () => {
    it('Should render header', () => {
        const { getByText } = render(<SectionHeader titleString="Test Title" />);

        expect(getByText('Test Title')).toBeVisible();
    });

    it('Should render header with a11y roles', () => {
        const headerLevel = 3;
        const { getByRole } = render(<SectionHeader titleString="Test Title" headingLevel={headerLevel} />);

        expect(getByRole('heading', { level: headerLevel })).toBeVisible();
    });

    it('should render header without default title', () => {
        const { getByText } = render(<SectionHeader titleString="">Hello</SectionHeader>);

        expect(getByText('Hello')).toBeVisible();
    });

    it('should render header when title is hidden', () => {
        const { getByText } = render(<SectionHeader titleString="Test Title" hideTitle={true} />);

        expect(getByText('Test Title')).toBeInTheDocument();
    });
});
