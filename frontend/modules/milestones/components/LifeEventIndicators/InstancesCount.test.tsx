import React from 'react';
import { render } from '@testing-library/react';
import InstancesCount from './InstancesCount';

describe('LifeEvent InstancesCount', () => {
    it('Should change visibility according to hide flag', () => {
        const { container, rerender } = render(<InstancesCount hide={true} instances={0} />);

        expect(container.querySelector('div')).not.toBeVisible();

        rerender(<InstancesCount hide={false} instances={0} />);

        expect(container.querySelector('div')).toBeVisible();
    });

    it('Should show number of instances', async () => {
        const { rerender, getByText } = render(<InstancesCount hide={false} instances={0} />);

        expect(getByText('0')).toBeVisible();

        rerender(<InstancesCount hide={false} instances={2} />);

        expect(getByText('2')).toBeVisible();
    });
});
