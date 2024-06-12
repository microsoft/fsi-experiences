import React from 'react';
import { render } from '@testing-library/react';
import SeparatedList from './SeparatedList';

const mockData = {
    value: 'testValue',
    label: 'This is test',
    staleness: new Date('2022-03-08'),
};
const onRenderItem = val => (
    <div>
        <div>{val.value}</div>
        <div>{val.label}</div>
    </div>
);
describe('SeparatedList', () => {
    it('Should render SeparatedList', async () => {
        const { getByText } = render(<SeparatedList items={[mockData]} onRenderItem={onRenderItem} />);

        expect(getByText(mockData.value)).toBeVisible();
        expect(getByText(mockData.label)).toBeVisible();
    });
});
