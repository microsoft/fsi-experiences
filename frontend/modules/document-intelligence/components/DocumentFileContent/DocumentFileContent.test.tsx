/* eslint-disable jest/expect-expect */
import React from 'react';
import { render } from '@testing-library/react';
import DocumentFileContent from './DocumentFileContent';

describe('[Document Intelligence] DocumentFileContent', () => {
    beforeEach(() => {});

    const label = 'file view';

    it('Should render loading state', () => {
        const { getByTestId } = render(<DocumentFileContent label={label} isLoading={true} isError={false} />);
        expect(getByTestId('loading-spinner')).toBeVisible();
    });

    it('Should render error state', () => {
        const { getByTestId } = render(<DocumentFileContent label={label} isLoading={false} isError={true} />);
        expect(getByTestId('error-state')).toBeVisible();
    });

    it('Should render file', () => {
        const { getByTestId, queryByTestId, getByTitle } = render(
            <DocumentFileContent label={label} isLoading={false} isError={false} file={{ fileURL: 'http://test.com/', fileId: '2' }} />
        );
        expect(queryByTestId('error-state')).toBeNull();
        expect(queryByTestId('loading-spinner')).toBeNull();
        const iframe: HTMLIFrameElement = getByTestId('document-frame-view') as HTMLIFrameElement;
        expect(iframe).toBeVisible();
        expect(iframe.src).toEqual('http://test.com/');
        expect(getByTitle(label)).toBeVisible();
    });

    it('Should render image file', () => {
        const { getByTestId, queryByTestId, getByAltText } = render(
            <DocumentFileContent label={label} isLoading={false} isError={false} file={{ fileURL: 'http://test.com/', fileId: '2', isImage: true }} />
        );
        expect(queryByTestId('error-state')).toBeNull();
        expect(queryByTestId('loading-spinner')).toBeNull();
        const image = getByTestId('document-image-view');
        expect(image).toBeInTheDocument();
        expect((image as HTMLImageElement).src).toContain('http://test.com/');
        expect(getByAltText(label)).toBeInTheDocument();
    });
});
