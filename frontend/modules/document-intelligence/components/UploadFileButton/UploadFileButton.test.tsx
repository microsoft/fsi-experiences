import React from 'react';
import { render } from '@testing-library/react';
import commonStrings from '@fsi/core-components/dist/assets/strings/common/common.1033.json';
import diStrings from '../../assets/strings/DocumentIntelligence/DocumentIntelligence.1033.json';
import UploadFileButton from './UploadFileButton';

let mockUploadFunction;
const mockFileUpload = jest.fn();
jest.mock('@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField', () => {
    return {
        FileUploadField: props => {
            const { FileUploadField } = jest.requireActual('@fsi/core-components/dist/components/atoms/FileUploadField/FileUploadField');
            mockUploadFunction = props.onUpload;
            mockFileUpload(props);
            return <FileUploadField {...props}>{props.children}</FileUploadField>;
        },
    };
});
const callback = jest.fn();
const file = new Blob([''], { type: 'text/plain' });

describe('UploadFileButton', () => {
    beforeEach(() => {
        callback.mockReset();
        mockFileUpload.mockReset();
    });
    it('Should render upload button', () => {
        const { getByText, getByTestId } = render(<UploadFileButton isMissingFile={true} onUpload={callback} />);

        expect(getByTestId('upload-button')).toBeVisible();
        expect(getByText(commonStrings.UPLOAD)).toBeVisible();
        mockUploadFunction(file);
        expect(callback).toBeCalledWith(file);
    });

    it('Should render upload new button', () => {
        const { getByText, getByTestId } = render(<UploadFileButton onUpload={callback} isMissingFile={false} />);

        expect(getByTestId('upload-button')).toBeVisible();
        expect(getByText(diStrings.DOCUMENTS_UPLOAD_NEW)).toBeVisible();
        mockUploadFunction(file);
        expect(callback).toBeCalledWith(file);
    });

    it('Should render primary upload new button', () => {
        const styles = {
            root: {
                color: 'red',
            },
        };
        const { getByText, queryByTestId, getByTestId } = render(<UploadFileButton styles={styles} onUpload={callback} isMissingFile primary />);

        expect(queryByTestId('upload-button')).toBeNull();
        expect(getByTestId('upload-button-primary')).toBeVisible();
        expect(mockFileUpload).toBeCalledWith(expect.objectContaining({ styles }));
        expect(getByText(commonStrings.UPLOAD)).toBeVisible();
        mockUploadFunction(file);
        expect(callback).toBeCalledWith(file);
    });
});
