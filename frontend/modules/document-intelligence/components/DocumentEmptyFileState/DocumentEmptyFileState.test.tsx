/* eslint-disable jest/expect-expect */
import React from 'react';
import { render } from '@testing-library/react';
import DocumentEmptyFileState from './DocumentEmptyFileState';
import { IUploadFileButtonProps } from '../UploadFileButton/UploadFileButton.interface';

let mockUploadFunction;
const file = new File([], 'test');
jest.mock('../UploadFileButton/UploadFileButton', () => (props: IUploadFileButtonProps) => {
    mockUploadFunction = () => props.onUpload(file);
    return <span data-testid={`upload-file-btn-mocked-primary-${props.primary}`} />;
});

describe('[Document Intelligence] DocumentEmptyFileState', () => {
    beforeEach(() => {});

    it('Should render empty state with upload button', () => {
        const { getByTestId } = render(<DocumentEmptyFileState onUpload={() => {}} disabled={false} />);
        expect(getByTestId('document-empty-file-state')).toBeVisible();
        expect(getByTestId('upload-file-btn-mocked-primary-true')).toBeVisible();
    });

    it('Should call onUpload callback', () => {
        const onUploadSpy = jest.fn();
        render(<DocumentEmptyFileState onUpload={onUploadSpy} disabled={false} />);

        mockUploadFunction();
        expect(onUploadSpy).toHaveBeenCalled();
    });
});
