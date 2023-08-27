import React from 'react';
import { render } from '@testing-library/react';
import ChoiceGroup from './ChoiceGroup';
import { IChoiceGroupProps } from './ChoiceGroup.interface';

describe('ChoiceGroup', () => {
    const mockProps: IChoiceGroupProps = {
        options: [
            {
                text: 'Choice 1',
                key: '0',
            },
            {
                text: 'Choice 2',
                key: '1',
            },
        ],
        selectedKey: 0,
    };
    it('should render component', () => {
        const { container } = render(<ChoiceGroup {...mockProps} />);

        expect(container).toBeInTheDocument();
    });
});
