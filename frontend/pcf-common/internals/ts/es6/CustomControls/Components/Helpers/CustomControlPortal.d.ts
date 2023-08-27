import * as React from "react";
interface ICustomControlPortalProps {
    renderReactSubtree: (element: JSX.Element, domNode: Element) => void;
    onError?: (exception: Error) => void;
}
interface ICustomControlHostState {
    portals?: Map<Element, {
        element: JSX.Element;
        id: string;
    }>;
}
declare class CustomControlPortal extends React.Component<ICustomControlPortalProps, ICustomControlHostState> {
    constructor(props: ICustomControlPortalProps);
    bindDOMElement(newChildComponent: JSX.Element, DOMNode: Element, id: string, callback?: () => void): void;
    unbindDOMComponent(componentId: string, callback?: () => void): void;
    componentDidCatch(error: Error): void;
    render(): any[];
}
export { CustomControlPortal };
