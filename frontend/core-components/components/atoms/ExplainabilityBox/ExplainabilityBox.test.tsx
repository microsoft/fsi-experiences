import React from 'react';
import { render } from '@testing-library/react';
import ExplainabilityBox from './ExplainabilityBox';

describe('ExplainabilityBox', () => {
    const explainabilityText = '123';
    const child = <div>{explainabilityText}</div>;
    const visibleTextMock = 'Mock';

    it('should render box with specific color', () => {
        const { getByTestId } = render(<ExplainabilityBox color={'red'} visibleText={visibleTextMock} />);

        expect(getByTestId('box-stack-wrapper')).toHaveStyle({ background: 'red' });
    });

    it('should render box with no explainability', () => {
        const { getByText } = render(
            <ExplainabilityBox color={''} visibleText={visibleTextMock} showExplainability={true}>
                {child}
            </ExplainabilityBox>
        );

        expect(getByText(explainabilityText)).toBeInTheDocument();
    });

    it('should render box with custom text styles', () => {
        const textSize = '50px';
        const { getByTestId } = render(<ExplainabilityBox color={''} visibleText={visibleTextMock} textStyles={{ root: { fontSize: textSize } }} />);

        expect(getByTestId('visible-text')).toHaveStyle({ fontSize: textSize });
    });
});
