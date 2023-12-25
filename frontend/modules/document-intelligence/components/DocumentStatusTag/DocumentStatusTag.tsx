import { Icon } from '@fluentui/react/lib/components/Icon';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import Text from '@fluentui/react/lib/components/Text/Text';
import React, { FC, useMemo } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { DocumentStatus } from '../../interfaces/IDocument';
import { getDocumentStatusTagClassNames } from './DocumentStatusTag.style';
import { IDocumentStatusTagProps } from './DocumentStatusTag.interface';

export const DOCUMENT_STATUS_TEST_ID = 'document-status-tag';

export const DocumentStatusTag: FC<IDocumentStatusTagProps> = ({ status, autoUpdated }) => {
    const translate = useTranslation(DI_NAMESPACE);

    const isApproved = status === DocumentStatus.Approved;
    const isRejected = status === DocumentStatus.Rejected;

    const classNames = useMemo(() => getDocumentStatusTagClassNames(isApproved), [isApproved]);
    if (!isRejected && !isApproved) {
        return null;
    }
    const text = translate(`DOCUMENT${autoUpdated ? '_AUTO' : ''}_${isApproved ? 'APPROVED' : 'REJECTED'}`);
    const icon = isApproved ? 'Completed' : 'ErrorBadge';
    return (
        <Stack horizontal className={classNames.container} data-testid={DOCUMENT_STATUS_TEST_ID}>
            <Icon iconName={icon} className={classNames.icon}></Icon>
            <Stack horizontal>
                <Text className={classNames.text}>{text}</Text>
            </Stack>
        </Stack>
    );
};

export default DocumentStatusTag;
