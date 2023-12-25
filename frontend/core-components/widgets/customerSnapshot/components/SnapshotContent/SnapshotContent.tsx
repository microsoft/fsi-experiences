import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { IStackTokens } from '@fluentui/react/lib/components/Stack/Stack.types';
import Header from '../Header';
import {
    ICustomerSnapshotData,
    ICustomerSnapshotLayout,
    ICustomerSnapshotMetadata,
} from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import isEmpty from 'lodash/isEmpty';
import { contentStyles, contentTokens } from './SnapshotContent.styles';
import { namespaces, useTranslation } from '../../../../context/hooks/useTranslation';
import { EmptyState } from '../../../../components/atoms/EmptyState/EmptyState';
import { IMAGE_SRC } from '../../../../constants/ImageSrc';
import ErrorState from '../../../../components/containers/ErrorState/ErrorState';
import SnapshotSections from '../SnapshotSections/SnapshotSections';

interface ISnapshotSnapshotContent {
    layout?: ICustomerSnapshotLayout;
    data?: ICustomerSnapshotData;
    metadata?: ICustomerSnapshotMetadata;
    invalidConfig?: boolean;
    stackTokens?: IStackTokens;
}

const SnapshotContent: FC<ISnapshotSnapshotContent> = ({ layout, data, metadata, invalidConfig, stackTokens }) => {
    const translate = useTranslation(namespaces.CUSTOMER_SNAPSHOT_CONTROL);

    if (invalidConfig || !metadata || !layout) {
        return <ErrorState title={translate('INVALID_CONFIGURATION')} subtitle={translate('CONTACT_SYSTEM_ADMIN')} iconSize={100} />;
    }

    if (!data || isEmpty(data.fields)) {
        return (
            <EmptyState
                title={translate('NO_DATA_TO_SHOW_YET')}
                subtitle={translate('TRY_REFRESH_CONTACT_ADMIN')}
                icon={IMAGE_SRC.emptyState100}
                iconSize={100}
            />
        );
    }
    const { headerSection } = layout;
    return (
        <Stack tokens={stackTokens || contentTokens} styles={contentStyles}>
            <Header titleField={headerSection.titleField} subtitleFields={headerSection.subtitleFields} data={data} metadata={metadata} />
            <SnapshotSections data={data} metadata={metadata} sections={layout?.sections} hasHeader={!!headerSection.titleField} />
        </Stack>
    );
};

export default SnapshotContent;
