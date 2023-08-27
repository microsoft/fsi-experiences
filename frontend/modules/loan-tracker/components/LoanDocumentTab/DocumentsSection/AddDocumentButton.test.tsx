import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import AddDocumentButton from './AddDocumentButton';

const addDocument = jest.fn();

describe('AddDocumentButton', () => {
    it('should render add document button component', async () => {
        let component;

        await act(async () => {
            component = render(<AddDocumentButton addDocumentDisabled={false} addDocument={addDocument} />);
        });

        const { container } = component;

        expect(container).toBeInTheDocument();
    });

    it('should call addDocument function when button clicked', async () => {
        let component;

        await act(async () => {
            component = render(<AddDocumentButton addDocumentDisabled={false} addDocument={addDocument} />);
        });

        const { getByTestId } = component;

        const addButton = getByTestId('add-button');
        fireEvent.click(addButton);

        expect(addDocument).toBeCalled();
    });

    it('should disable add addDocument button', async () => {
        addDocument.mockReset();
        let component;

        await act(async () => {
            component = render(<AddDocumentButton addDocumentDisabled addDocument={addDocument} />);
        });

        const { getByTestId } = component;

        const addButton = getByTestId('add-button');
        expect(addButton).toBeDisabled();
    });
});
