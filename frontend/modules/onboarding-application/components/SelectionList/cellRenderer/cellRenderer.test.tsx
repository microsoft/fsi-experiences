import { CommunicationColors } from '@fluentui/react/lib/Theme';
import { render, fireEvent } from '@testing-library/react';
import onRenderCell from './cellRenderer';

describe('onRenderCell', () => {
    it('renders the cell renderer and click it', () => {
        const item = {
            id: 1,
            name: 'name1',
            role: 'role1',
            isPrimary: false,
            task: {
                statusCode: 1,
                updateStatus: jest.fn(),
            },
        };
        const onChange = jest.fn();
        const { getByTestId } = render(onRenderCell({ onChange, value: '1' })(item, 0));
        const rootDiv = getByTestId('selection-list-row');
        expect(rootDiv).toBeInTheDocument();
        // check onChange with fireEvent
        fireEvent.click(rootDiv);
        expect(onChange).toBeCalled();
    });
    it('renders the correct number of columns', () => {
        const item = {
            id: 1,
            name: 'name1',
            role: 'role1',
            isPrimary: false,
        };
        const onChange = jest.fn();
        const { getByText } = render(onRenderCell({ onChange, value: '1' })(item, 0));
        const firstColumn = getByText(item.name);
        const secondColumn = getByText(item.role);
        expect(firstColumn).toBeInTheDocument();
        expect(secondColumn).toBeInTheDocument();
    });

    it('renders disabled status', () => {
        const item = {
            id: 1,
            name: 'name1',
            role: 'role1',
            isPrimary: false,
            task: {
                processStage: '1',
                status: 1,
                updateStatus: () => null,
                name: '1',
            },
        };
        const onChange = jest.fn();
        const { getByTestId } = render(onRenderCell({ onChange, value: '1', processStage: '2' })(item, 0));
        expect(getByTestId('task-status-dropdown').getAttribute('aria-disabled')).toEqual('true');
    });

    it('renders colored background if selected', () => {
        const item = {
            id: '1',
            name: 'name1',
            role: 'role1',
            isPrimary: false,
        };
        const onChange = jest.fn();
        const { getByTestId } = render(onRenderCell({ onChange, value: '1' })(item, 0));
        expect(getByTestId('selection-list-row')).toHaveStyle({ background: CommunicationColors.tint40 });
    });
});
