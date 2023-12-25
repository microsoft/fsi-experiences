import React from 'react';
import { render } from '@testing-library/react';
import ResponsiveContainer from './ResponsiveContainer';
import { ContainerProperties } from '../../../context/hooks/useResponsiveContainer';
import { createClassName } from '../../../utilities/responsive/ResponsiveUtil';

const MOCK_NUMBER_OF_COLUMNS = 6;
jest.mock('../../../context/hooks/useResponsiveContainer', () => (prefix: string, columnWidth: number): ContainerProperties => {
    return {
        columns: MOCK_NUMBER_OF_COLUMNS,
        className: createClassName(MOCK_NUMBER_OF_COLUMNS, prefix),
    };
});

describe('ResponsiveContainer', () => {
    const renderComponents = (prefix?: string) => {
        return render(
            <ResponsiveContainer classPrefix={prefix}>
                <div>MOCKED CHILDREN</div>
            </ResponsiveContainer>
        );
    };

    it('Should render children', () => {
        const { getByText } = renderComponents();

        expect(getByText('MOCKED CHILDREN')).toBeVisible();
    });

    it('Should add the correct class name to the container (default prefix)', () => {
        const { getByTestId } = renderComponents();

        expect(getByTestId('responsive-container')).toHaveClass(createClassName(MOCK_NUMBER_OF_COLUMNS));
    });

    it('Should add the correct class name to the container with custom prefix', () => {
        const { getByTestId } = renderComponents('test');

        expect(getByTestId('responsive-container')).toHaveClass(createClassName(MOCK_NUMBER_OF_COLUMNS, 'test'));
    });
});
