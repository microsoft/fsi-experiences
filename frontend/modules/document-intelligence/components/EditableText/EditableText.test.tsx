import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { EditableText } from './EditableText';

describe('EditableText', () => {
    it('should render with self-edit readonly input', async () => {
        const { queryByText, queryByTestId, container } = render(
            <EditableText label="Label" selfEdit readOnly id="test-input" placeholder="test placeholder" defaultValue="test value" />
        );

        expect(queryByText('Label')).toBeDefined();
        const btn = queryByTestId('label-edit-icon-btn');
        expect(btn).toBeDefined();
        const input = container.querySelector('#test-input');
        expect(input).toBeDefined();
        expect(input?.getAttribute('value')).toEqual('test value');
        expect(input?.getAttribute('placeholder')).toEqual('-');
        expect(input?.hasAttribute('readonly')).toEqual(true);

        await act(async () => {
            await fireEvent.click(btn as Element);
        });

        expect(input?.hasAttribute('readonly')).toEqual(false);

        await act(async () => {
            await fireEvent.click(btn as Element);
        });

        expect(input?.hasAttribute('readonly')).toEqual(true);
    });

    it('should render with self-edit editable input', async () => {
        let changedValue = '';
        const onDoneEditingMock = jest.fn(value => (changedValue = value));
        const { queryByText, queryByTestId, container } = render(
            <EditableText
                label="Label"
                selfEdit
                onDoneEditing={onDoneEditingMock}
                id="test-input"
                placeholder="test placeholder"
                defaultValue="test value"
                styles={{ root: { width: '100px' } }}
            />
        );

        expect(queryByText('Label')).toBeDefined();
        const btn = queryByTestId('label-edit-icon-btn');
        expect(btn).toBeDefined();
        const input = container.querySelector('#test-input');
        expect(input).toBeDefined();
        expect(input?.getAttribute('value')).toEqual('test value');
        expect(input?.getAttribute('placeholder')).toEqual('test placeholder');
        expect(input?.hasAttribute('readonly')).toEqual(false);

        await act(async () => {
            await fireEvent.change(input as Element, { target: { value: 'new value' } });
            await fireEvent.click(btn as Element);
        });

        expect(input?.hasAttribute('readonly')).toEqual(true);
        expect(onDoneEditingMock).toBeCalled();
        expect(changedValue).toEqual('new value');
    });

    it('should not trigger onKeyUp when not in selfEdit', async () => {
        const onKeyUpMock = jest.fn();
        const onDoneEditingMock = jest.fn();
        const { container, queryByTestId } = render(
            <EditableText
                label="Label"
                onDoneEditing={onDoneEditingMock}
                selfEdit
                onKeyDown={onKeyUpMock}
                id="test-input"
                placeholder="test placeholder"
                defaultValue="test value"
            />
        );

        const input = container.querySelector('#test-input');

        jest.useFakeTimers();
        act(() => {
            fireEvent.keyDown(input as Element, { key: 'Enter', code: 'Enter' });
            jest.runAllTimers();
        });
        const btn = queryByTestId('label-edit-icon-btn');
        expect(onKeyUpMock).not.toBeCalled();
        expect(onDoneEditingMock).toBeCalled();
        expect(document.activeElement).toEqual(btn);
        jest.useRealTimers();
    });

    it('should trigger onKeyUp when not in selfEdit', async () => {
        const onKeyUpMock = jest.fn();
        const { container } = render(
            <EditableText label="Label" onKeyDown={onKeyUpMock} id="test-input" placeholder="test placeholder" defaultValue="test value" />
        );

        const input = container.querySelector('#test-input');
        act(() => {
            fireEvent.keyDown(input as Element, { key: 'Enter', code: 'Enter' });
        });

        expect(onKeyUpMock).toBeCalled();
    });

    it('should not trigger onSave when not enter in self-edit', async () => {
        const onKeyUpMock = jest.fn();
        const { container } = render(
            <EditableText label="Label" onKeyDown={onKeyUpMock} selfEdit id="test-input" placeholder="test placeholder" defaultValue="test value" />
        );

        const input = container.querySelector('#test-input');
        act(() => {
            fireEvent.keyDown(input as Element, { key: '12', code: '12' });
        });

        expect(onKeyUpMock).not.toBeCalled();
    });
});
