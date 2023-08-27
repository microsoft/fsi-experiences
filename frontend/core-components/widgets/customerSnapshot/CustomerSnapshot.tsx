import React, { FC } from 'react';
import Widget from '../../components/atoms/Widget/Widget';
import { ICustomerSnapshotFetcher } from '../../dataLayerInterface/service/ICustomerSnapshotFetcher';
import useCustomerSnapshot from './hooks/useCustomerSnapshot';
import { namespaces, useTranslation } from '../../context/hooks/useTranslation';
import SnapshotContent from './components/SnapshotContent/SnapshotContent';
import ResponsiveContainer from '../../components/atoms/ResponsiveContainer/ResponsiveContainer';
import { customerSnapshotPrefix } from './consts/reponsive.consts';
import { noHeaderContentTokens, widgetStyles } from './CustomerSnapshot.styles';
import { useIsFeatureEnabled } from '../../context/hooks/useIsFeatureEnabled';
import { ENTITY_SNAPSHOT_FLAGS } from '../../constants/features/entitySnapshot';
export interface ICustomerSnapshot {
    entityId?: string;
    fetcher: ICustomerSnapshotFetcher;
    formId: string;
}

const CustomerSnapshot: FC<ICustomerSnapshot> = props => {
    const { layoutResponse, invalidConfig, isLoading, isError, data, metadata } = useCustomerSnapshot(props);
    const layout = layoutResponse?.layout;
    const translate = useTranslation(namespaces.CUSTOMER_SNAPSHOT_CONTROL);

    const showHeader = useIsFeatureEnabled(ENTITY_SNAPSHOT_FLAGS.TITLE_VISIBILITY);

    return (
        <ResponsiveContainer classPrefix={customerSnapshotPrefix}>
            <Widget
                header={showHeader ? layout?.cardTitle || translate('SNAPSHOT_HEADER') : undefined}
                isLoading={isLoading}
                isError={!invalidConfig && isError}
                errorIconSize={100}
                styles={isLoading ? widgetStyles : undefined}
                name="customer-snapshot-widget"
            >
                <SnapshotContent
                    layout={layout}
                    invalidConfig={invalidConfig}
                    data={data}
                    metadata={metadata}
                    stackTokens={showHeader ? undefined : noHeaderContentTokens}
                />
            </Widget>
        </ResponsiveContainer>
    );
};
export default CustomerSnapshot;
