import React, { FC } from 'react';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { PCFContainer, PCFContainerProps } from '@fsi/pcf-common/containers/PCFContainer';
import { loadingStyles, errorStateStyles } from '@fsi/core-components/dist/components/atoms/Widget/Widget.style';

interface FormStateProps extends PCFContainerProps {
    isLoading?: boolean;
    isError?: boolean;
}

const Content = ({ isLoading, isError }) => {
    if (isLoading) return <Loading styles={loadingStyles} />;

    if (isError) return <ErrorState styles={errorStateStyles} iconSize={100} />;

    return null;
};

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.13)',
};

export const ApplicantFormPlaceholder: FC<FormStateProps> = ({ isLoading, isError, context }) => {
    return (
        context && (
            <PCFContainer context={context} containerStyle={containerStyle}>
                <Content isLoading={isLoading} isError={isError} />
            </PCFContainer>
        )
    );
};
