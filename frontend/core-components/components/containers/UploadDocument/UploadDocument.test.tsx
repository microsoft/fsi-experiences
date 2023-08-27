import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import UploadDocument from './UploadDocument';

const dataTestId = 'upload-button';

describe('UploadDocument', () => {
    const mockProps = {
        onUpload: jest.fn(),
        onRemove: jest.fn(),
        id: '1',
        uploadLabel: 'Upload',
        removeLabel: 'Remove',
    };

    const mockFile = new File([new ArrayBuffer(1)], 'file.jpg');

    it('should render component', () => {
        const { container, getByTestId, queryByTestId } = render(<UploadDocument {...mockProps} />);

        expect(container).toBeInTheDocument();
        expect(getByTestId(dataTestId)).toBeVisible();
        expect(queryByTestId('delete-file-button')).toBeNull();
    });

    it('should call onUpload', () => {
        const { getByTestId } = render(<UploadDocument {...mockProps} />);
        fireEvent.change(getByTestId('input-file'), { target: { files: [mockFile] } });
        expect(mockProps.onUpload).toHaveBeenCalled();
        expect(mockProps.onUpload).toHaveBeenCalledWith(mockFile);
    });

    it('should render custom label', () => {
        const customLabel = 'Custom label';
        const { getByText } = render(<UploadDocument {...mockProps} label={customLabel} />);

        expect(getByText(customLabel)).toBeVisible();
    });

    it('should call onRemove', () => {
        const { getByTestId } = render(<UploadDocument {...mockProps} label="custom" />);
        fireEvent.click(getByTestId('delete-file-button'));
        expect(mockProps.onRemove).toHaveBeenCalled();
    });

    afterEach(() => {
        mockProps.onRemove.mockClear();
        mockProps.onUpload.mockClear();
    });
});
