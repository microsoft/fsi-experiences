import React from 'react';
import { IMAGE_SRC } from '../../../constants/ImageSrc';
import { FSIErrorTypes, ILoggerService } from '../../../context/telemetry';
import { EmptyState } from '../../atoms/EmptyState/EmptyState';

export interface IErrorBoundaryProps {
    title: string;
    subtitle?: string;
    logger: ILoggerService;
    componentName: string;
}

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, { hasError: boolean }> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.props.logger.logError(this.props.componentName, 'componentDidCatch', error.message, FSIErrorTypes.GenericError, error, {
            errorInfo,
        });
    }

    render() {
        if (this.state.hasError) {
            return <EmptyState title={this.props.title} subtitle={this.props.subtitle} icon={IMAGE_SRC.error100} iconSize={100}></EmptyState>;
        }

        return <>{this.props.children}</>;
    }
}
