import { StepInfoHeaderTooltip } from '../components/StepInfoHeaderTooltip/StepInfoHeaderTooltip';
import { StepTypes } from './StepTypes.const';

export const StepHeadersByTypes = {
    [StepTypes.Extraction]: {
        title: 'DOCUMENT_EXTRACTED_TAB_INFO_SECTION',
        infoCallout: {
            content: StepInfoHeaderTooltip,
            ariaLabel: 'DOCUMENT_EXTRACTED_TAB_INFO_SECTION_DESC_ARIA_LABEL',
            description: 'DOCUMENT_EXTRACTED_TAB_INFO_SECTION_DESC',
            linkInfoLabel: 'DOCUMENT_EXTRACTED_TAB_INFO_SECTION_MORE_INFO_LINK_LABEL',
            prefixLinkInfoLabel: 'DOCUMENT_EXTRACTED_TAB_INFO_SECTION_MORE_INFO',
        },
        subHeader: {
            hoverTitle: 'COLLECTION_TYPE',
        },
    },
    [StepTypes.Enrichment]: {
        title: 'DOCUMENT_EXTRACTED_TAB_SUPPORT_SECTION',
        infoCallout: {
            content: StepInfoHeaderTooltip,
            ariaLabel: 'DOCUMENT_EXTRACTED_TAB_SUPPORT_SECTION_DESC_ARIA_LABEL',
            description: 'DOCUMENT_EXTRACTED_TAB_SUPPORT_SECTION_DESC',
            linkInfoLabel: 'LEARN_MORE',
        },
    },
};

export const CollectionsMap: { [key: string]: string } = {
    ['idDocument.driverLicense']: 'DRIVER_LICENSE',
    ['idDocument.usSocialSecurityCard']: 'SOCIAL_SECURITY',
    ['idDocument.passport']: 'PASSPORT',
    ['idDocument.residencePermit']: 'RESIDENCE_PERMIT',
    ['idDocument.nationalIdentityCard']: 'NATIONAL_IDENTITY_CARD',
    ['idDocument']: 'UNKNOWN_COLLECTION',
    ['Unknown']: 'UNKNOWN_COLLECTION',
};
