import React, { FC } from 'react';
import { documentFrameStyle, documentIframeContainerStyle, imageStyles } from './DocumentFileContent.style';
import { Loading } from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { IDocumentFileContentProps } from './DocumentFileContent.interface';

export const DocumentFileContent: FC<IDocumentFileContentProps> = ({ file, isError, isLoading, label }) => {
    if (isLoading) {
        return <Loading styles={{ root: { justifyContent: 'center' } }} />;
    }

    if (isError) {
        return <ErrorState iconSize={200} />;
    }
    return (
        <div className={documentIframeContainerStyle}>
            {file?.isImage ? (
                <Image alt={label} src={file?.fileURL} imageFit={ImageFit.centerContain} styles={imageStyles} data-testid="document-image-view" />
            ) : (
                <iframe title={label} frameBorder="0" src={file?.fileURL} className={documentFrameStyle} data-testid="document-frame-view" />
            )}
        </div>
    );
};

export default DocumentFileContent;
