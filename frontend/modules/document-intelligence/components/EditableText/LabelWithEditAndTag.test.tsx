import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { LabelWithEditAndTag } from './LabelWithEditAndTag';

describe('LabelWithEditAndTag', () => {
    it('should render with label only', () => {
        const { queryByText, queryByTestId } = render(<LabelWithEditAndTag text="Label" inputId="test-label" />);

        expect(queryByText('Label')).toBeDefined();
        expect(queryByTestId('tag-text')).toBeNull();
        expect(queryByTestId('label-edit-icon-btn')).toBeNull();
    });

    it('should render with label and tag', () => {
        const { getByTestId, getByText } = render(<LabelWithEditAndTag text="Label" tagProps={{ text: 'Tag' }} inputId="test-label" />);

        expect(getByTestId('tag-text').textContent).toEqual('Tag');
        expect(getByText('Label')).toBeDefined();
    });

    it('should render with label and tag and edit button', () => {
        const { getByTestId, getByText } = render(
            <LabelWithEditAndTag text="Label" tagProps={{ text: 'Tag' }} withEditButton inputId="test-label" />
        );
        expect(getByTestId('label-edit-icon-btn')).toBeDefined();
        expect(getByTestId('tag-text').textContent).toEqual('Tag');
        expect(getByText('Label')).toBeDefined();
    });

    it('should render with label and tag and edit button and edit mode', () => {
        const { getByTestId, queryByTestId } = render(
            <LabelWithEditAndTag text="Label" tagProps={{ text: 'Tag' }} withEditButton editMode inputId="test-label" />
        );
        expect(getByTestId('label-edit-icon-btn').getAttribute('aria-label')).toEqual('Save');
        expect(queryByTestId('tag-text')).toBeNull();
    });

    it('should trigger onEditClick', async () => {
        const onEditClickMock = jest.fn();

        const { getByTestId, queryByTestId } = render(
            <LabelWithEditAndTag text="Label" tagProps={{ text: 'Tag' }} withEditButton editMode inputId="test-label" onEditClick={onEditClickMock} />
        );
        expect(getByTestId('label-edit-icon-btn').getAttribute('aria-label')).toEqual('Save');
        expect(queryByTestId('tag-text')).toBeDefined();

        await act(async () => {
            await fireEvent.click(getByTestId('label-edit-icon-btn'));
        });

        expect(onEditClickMock).toBeCalled();
    });

    it('should use aria-label passed', async () => {
        const onEditClickMock = jest.fn();

        const { getByTestId } = render(
            <LabelWithEditAndTag text="Label" tagProps={{ text: 'Tag' }} withEditButton inputId="test-label" onEditClick={onEditClickMock} />
        );
        expect(getByTestId('tag-text')).toBeDefined();
    });

    it('should not render tag if none passed', () => {
        const { queryByTestId } = render(<LabelWithEditAndTag text="Label" inputId="test-label" />);
        expect(queryByTestId('tag-text')).toBeNull();
    });
});
