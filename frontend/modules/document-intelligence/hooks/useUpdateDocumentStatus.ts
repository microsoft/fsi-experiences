import { useMutation } from 'react-query';
import { queryClient } from '@fsi/core-components/dist/context/FSIContext';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DocumentStatus, IDocumentRequest } from '../interfaces/IDocument';
import { IDocumentBaseFetcher } from '../interfaces/IDocumentsFetcher';
import { useNotificationService } from '@fsi/core-components/dist/hooks/useNotificationService/useNotificationService';
import { DI_NAMESPACE } from '../constants/DocumentIntelligence.const';
import { GROUPED_DOCUMENTS_QUERY_KEY, SINGLE_DOCUMENTS_QUERY_KEY } from '../constants/DocumentQueries.const';

export interface IUpdateDocumentMutationParams {
    document: IDocumentRequest;
    status: number;
}

export const useUpdateDocumentStatus = (fetcher: IDocumentBaseFetcher, contextId = '') => {
    const { show: showNotification } = useNotificationService();
    const translate = useTranslation(DI_NAMESPACE);
    return useMutation((params: IUpdateDocumentMutationParams) => fetcher.updateDocumentStatus(params.document, params.status), {
        onSuccess: async data => {
            await Promise.all([
                queryClient.resetQueries([GROUPED_DOCUMENTS_QUERY_KEY, contextId]),
                queryClient.resetQueries([SINGLE_DOCUMENTS_QUERY_KEY, data.id]),
            ]);

            const isApproved = data.status === DocumentStatus.Approved;
            const isRejected = data.status === DocumentStatus.Rejected;
            if (isApproved || isRejected) {
                const messageProps = {
                    regarding: data.regarding.name,
                    docName: data.name,
                };
                showNotification({
                    message: isApproved
                        ? translate('DOC_APPROVED_SUCCESS_MESSAGE', messageProps)
                        : translate('DOC_REJECTED_SUCCESS_MESSAGE', messageProps),
                    type: isApproved ? 'success' : 'error',
                });
            }
        },
    });
};
