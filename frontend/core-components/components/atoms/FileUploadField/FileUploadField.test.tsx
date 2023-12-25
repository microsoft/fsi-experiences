import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FileUploadField } from './FileUploadField';

const buttonText = 'Upload';
const file = new Blob([''], { type: 'text/plain' });

describe('FileUploadField', () => {
    let onUpload;

    beforeEach(() => {
        onUpload = jest.fn();
    });

    it('should show children', async () => {
        const { getByText } = render(
            <FileUploadField id="id" onUpload={onUpload}>
                {buttonText}
            </FileUploadField>
        );

        expect(getByText(buttonText)).toBeVisible();
    });

    it('should render enabled button', async () => {
        const { getByTestId } = render(
            <FileUploadField id="id" onUpload={onUpload}>
                {buttonText}
            </FileUploadField>
        );

        expect(getByTestId('upload-button')).toBeEnabled();
    });

    it('should render disabled button', async () => {
        const { getByTestId } = render(
            <FileUploadField id="id" onUpload={onUpload} disabled={true}>
                {buttonText}
            </FileUploadField>
        );

        expect(getByTestId('upload-button')).toBeDisabled();
    });

    it('should call onUpload when file selected', async () => {
        const { getByTestId } = render(
            <FileUploadField id="id" onUpload={onUpload}>
                {buttonText}
            </FileUploadField>
        );

        const uploadButton = getByTestId('upload-button');
        const inputFile = getByTestId('input-file');

        expect(uploadButton).toBeVisible();
        expect(inputFile).not.toBeVisible();

        fireEvent.click(uploadButton);
        fireEvent.change(inputFile, { target: { files: [file] } });

        expect(onUpload).toBeCalledWith(file);
    });

    it('should not call onUpload if no file selected', async () => {
        const { getByTestId } = render(
            <FileUploadField id="id" onUpload={onUpload}>
                {buttonText}
            </FileUploadField>
        );

        const inputFile = getByTestId('input-file');

        fireEvent.change(inputFile, { target: { files: null } });

        expect(onUpload).toBeCalledTimes(0);
    });

    it('should render icon props', async () => {
        const container = render(
            <FileUploadField id="id" onUpload={onUpload} iconProps={{ iconName: 'test' }}>
                {buttonText}
            </FileUploadField>
        );

        const icon = document.querySelector('.ms-Icon');
        expect(icon).toBeVisible();
    });

    it('should render as primary button', async () => {
        const { getByText, getByTestId } = render(
            <FileUploadField primary id="id" onUpload={onUpload} iconProps={{ iconName: 'test' }}>
                {buttonText}
            </FileUploadField>
        );

        expect(getByText(buttonText)).toBeVisible();
        const uploadButton = getByTestId('upload-button-primary');
        const inputFile = getByTestId('input-file');

        fireEvent.click(uploadButton);
        fireEvent.change(inputFile, { target: { files: [file] } });

        expect(onUpload).toBeCalledWith(file);
    });

    it('should render input element that accept every type of file', async () => {
        const { getByTestId } = render(
            <FileUploadField id="id" onUpload={onUpload} iconProps={{ iconName: 'test' }}>
                {buttonText}
            </FileUploadField>
        );

        const inputFile = getByTestId('input-file');
        expect(inputFile).toHaveProperty('accept', '*');
    });

    it('should render input element that accept only specific file formats', async () => {
        const { getByTestId } = render(
            <FileUploadField id="id" onUpload={onUpload} iconProps={{ iconName: 'test' }} supportedFileFormats={['pdf']}>
                {buttonText}
            </FileUploadField>
        );

        const inputFile = getByTestId('input-file');
        expect(inputFile).toHaveProperty('accept', '.pdf');
    });

    it('Should stop propagation on click', async () => {
        const onParentClickMock = jest.fn();
        const { getByTestId } = render(
            <div onClick={onParentClickMock}>
                <FileUploadField stopClickPropagation id="id" onUpload={onUpload}>
                    {buttonText}
                </FileUploadField>
            </div>
        );

        const uploadButton = getByTestId('upload-button');
        const inputFile = getByTestId('input-file');

        fireEvent.click(uploadButton);
        fireEvent.change(inputFile, { target: { files: [file] } });

        expect(onUpload).toBeCalledWith(file);
        expect(onParentClickMock).not.toHaveBeenCalled();
    });
});
