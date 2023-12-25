import React, { AriaAttributes, FC, useMemo } from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { documentsCollapseStyles, iconButtonStyles, lockedSectionTitleStyle, sectionTitleStyle } from './DocumentsSection.style';
import { useId } from '@fluentui/react-hooks';
import ScreenReaderText from '@fsi/core-components/dist/components/atoms/ScreenReaderText/ScreenReaderText';
import Collapse from '@fsi/core-components/dist/components/atoms/Collapse/Collapse';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { IDocumentsSectionProps } from './DocumentsSection.interface';

export const DocumentsSection: FC<IDocumentsSectionProps> = ({ children, title, count }) => {
    const translate = useTranslation(DI_NAMESPACE);

    const documentHeaderTextID = useId('documentHeaderText');
    const srDocumentHeaderTextID = useId('srDocumentHeaderText');

    const headerAria = useMemo<AriaAttributes>(
        () => ({ 'aria-live': 'polite', 'aria-labelledby': `${documentHeaderTextID} ${srDocumentHeaderTextID}` }),
        [documentHeaderTextID, srDocumentHeaderTextID]
    );
    const iconAria = useMemo<AriaAttributes>(
        () => ({ 'aria-labelledby': `${documentHeaderTextID} ${srDocumentHeaderTextID}` }),
        [documentHeaderTextID, srDocumentHeaderTextID]
    );
    const noDocuments = count === 0;
    return (
        <Collapse
            key={noDocuments ? 'noDocuments' : 'documents'}
            styles={documentsCollapseStyles}
            iconButtonStyles={iconButtonStyles}
            defaultOpen={!noDocuments}
            headerRole="region"
            headerAria={headerAria}
            iconAria={iconAria}
            disabled={noDocuments}
            content={
                <>
                    <Text styles={noDocuments ? lockedSectionTitleStyle : sectionTitleStyle} data-testid="section-header" id={documentHeaderTextID}>
                        {title} ({count})
                    </Text>
                    <ScreenReaderText id={srDocumentHeaderTextID}>
                        {count === 1 ? translate('DOCUMENT_ITEM_SR_TEXT') : translate('DOCUMENT_ITEMS_SR_TEXT')}
                    </ScreenReaderText>
                </>
            }
        >
            {children}
        </Collapse>
    );
};

export default DocumentsSection;
