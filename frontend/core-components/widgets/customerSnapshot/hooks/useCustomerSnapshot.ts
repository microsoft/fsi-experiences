import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { ICustomerSnapshot } from '../CustomerSnapshot';

const isConfigurationError = e => e?.name === 'CustomerSnapshotConfigError';

const useCustomerSnapshot = (props: ICustomerSnapshot) => {
    const { entityId, formId, fetcher } = props;

    const {
        data: layoutResponse,
        isLoading: isLoadingLayout,
        isError: isErrorLayout,
        isFetched: isFetchedLayout,
        error: layoutError,
    } = useQuery(`layout-${formId}`, () => fetcher.fetchSnapshotLayout(formId), {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const { layout, entityName } = layoutResponse || {};
    const allFields = useMemo(() => {
        const subTitleFields = layout?.headerSection?.subtitleFields?.map(f => f.name) || [];
        const titleField = layout?.headerSection?.titleField?.name ? [layout.headerSection.titleField.name] : [];

        const _allFields =
            layout?.sections.reduce(
                (fields: string[], section) => {
                    return fields.concat(section.fields.map(f => f.name));
                },
                [...titleField, ...subTitleFields]
            ) || [];

        return _allFields;
    }, [layout]);

    const {
        data: metadata,
        isLoading: isLoadingMetadata,
        isError: isErrorMetadata,
        isFetched: isFetchedMetadata,
    } = useQuery(`metadata-${formId}`, () => fetcher.fetchSnapshotMetadata(entityName!, allFields!), {
        enabled: !!allFields && !!entityName,
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    const {
        data,
        isLoading: isLoadingData,
        isError: isErrorData,
        error: dataError,
    } = useQuery(`data-${entityId}`, () => fetcher.fetchSnapshotData(entityName!, entityId!, allFields!), {
        enabled: !!allFields && !!entityName && !!entityId,
    });

    const isLoading = (isLoadingLayout || isLoadingMetadata || isLoadingData || !isFetchedMetadata || !isFetchedLayout) && !isErrorLayout;
    const isError = isErrorLayout || isErrorMetadata || isErrorData;

    const invalidConfig = (isErrorLayout && isConfigurationError(layoutError)) || (isErrorData && isConfigurationError(dataError));

    return { layoutResponse, data: entityId ? data : { fields: {} }, metadata, isLoading, isError, invalidConfig };
};

export default useCustomerSnapshot;
