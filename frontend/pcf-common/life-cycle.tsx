import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants/ImageSrc';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { CommonPCFContext } from './common-props';
import { PCFContainerProps } from './containers/PCFContainer';
import contextService from './services/ContextService';
import { default as loggerService } from '@fsi/core-components/dist/context/telemetry/ILoggerService.mock'

export const setImage = (fileType: string, fileContent: string, imgName: string): void => {
    if (!fileContent) {
        return;
    }
    const imageUrl = `data:image/${fileType};base64, ${fileContent}`;
    IMAGE_SRC[imgName] = imageUrl;
};

export const init = (context: CommonPCFContext, PCFName: string, featureName?: string) => {
    contextService.setContext(context);
    loggerService.setPcfName(PCFName, featureName);
    loggerService.logImpression({ componentName: PCFName });
};

export const loadImage = (context: CommonPCFContext, img: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        context.resources.getResource(
            `${img}.png`,
            data => {
                setImage('png', data, img);
                resolve(img);
            },
            reject
        );
    });
};

export const loadImages = (context: CommonPCFContext, images: string[]): Promise<string[]> => {
    return Promise.all(images.map(img => loadImage(context, img)));
};

export const updateView = <T extends PCFContainerProps>(container: HTMLDivElement, component: React.FC<T>, props: T) => {
    try {
        ReactDOM.render(React.createElement(component, props), container);
    } catch (e: any) {
        ReactDOM.render(
            <EmptyState
                title={props.context.resources.getString('SOMETHING_WENT_WRONG')}
                subtitle={props.context.resources.getString('SOMETHING_WENT_WRONG_DESC')}
                icon={IMAGE_SRC.error100}
                iconSize={100}
            ></EmptyState>,
            container
        );
    }
};

export const getReactElement = <T extends PCFContainerProps>(component: React.FC<T>, props: T) => {
    try {
        return React.createElement(component, props);
    } catch (e: any) {
        return (
            <EmptyState
                title={props.context.resources.getString('SOMETHING_WENT_WRONG')}
                subtitle={props.context.resources.getString('SOMETHING_WENT_WRONG_DESC')}
                icon={IMAGE_SRC.error100}
                iconSize={100}
            ></EmptyState>
        );
    }
};

export const destroy = (container: HTMLDivElement) => {
    ReactDOM.unmountComponentAtNode(container);
};
