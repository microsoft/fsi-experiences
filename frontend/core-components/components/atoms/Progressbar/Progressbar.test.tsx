import React from 'react';
import { render } from '@testing-library/react';
import Progressbar from './Progressbar';

describe('Progressbar', () => {
    const mockProps = {
        percentComplete: 50,
    };

    it('Should render progressbar', () => {
        const { getByTestId } = render(<Progressbar {...mockProps} />);

        const progressbarContainer = getByTestId('progressbar-container');
        expect(progressbarContainer).toBeInTheDocument();
    });

    it('Should render progressbar with a label', () => {
        const labelText = 'label text';
        const { getByText } = render(<Progressbar {...mockProps} label={labelText} />);

        const progressbarLabel = getByText(labelText);
        expect(progressbarLabel).toBeVisible();
    });

    it('Should render progressbar with a description', () => {
        const descriptionText = 'description text';
        const { getByText } = render(<Progressbar {...mockProps} description={descriptionText} />);

        const progressbarDescription = getByText(descriptionText);
        expect(progressbarDescription).toBeVisible();
    });

    it('Should render progressbar with an aside text', () => {
        const asideText = 'aside text';
        const { getByText } = render(<Progressbar {...mockProps} asideText={asideText} />);

        const progressbarAsideText = getByText(asideText);
        expect(progressbarAsideText).toBeVisible();
    });

    it('Should render progressbar with custom styles for indicator', () => {
        const indicatorCustomStyles = {
            styles: {
                root: {
                    padding: '1px',
                },
            },
        };

        const { getByTestId } = render(<Progressbar {...mockProps} indicatorProps={indicatorCustomStyles} />);

        const progressbarContainer = getByTestId('progressbar-container')!;

        const progressIndicatorRoot = progressbarContainer.querySelector('.ms-ProgressIndicator')!;

        expect(progressIndicatorRoot).toHaveStyle({
            padding: '1px 1px 1px 1px',
        });
    });
});
