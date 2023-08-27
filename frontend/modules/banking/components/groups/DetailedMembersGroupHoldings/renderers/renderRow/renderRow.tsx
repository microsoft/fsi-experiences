/* istanbul ignore file */
import React from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import SIDInstrumentsSection from '../../../../../components/detailedFinancialHolding/components/SelectedItemDetails/SIDInstrumentsSection/SIDInstrumentsSection';
import Collapse from '@fsi/core-components/dist/components/atoms/Collapse/Collapse';
import { getCardInstruments } from '../utils';
import { cardsWrapperStyles, collapseContentWrapperStyles, collapseIconStyles, collapseWrapperStyles } from './renderRow.style';

const renderRow =
    ({ isCompact, metadata, contactId, translate }) =>
    (props, defaultRender) => {
        const cardsInstruments = getCardInstruments({ groupHolding: props?.item, contactId });

        return cardsInstruments.length > 0 ? (
            <Collapse
                contentWrapperStyles={isCompact ? {} : collapseContentWrapperStyles}
                styles={collapseWrapperStyles}
                iconButtonStyles={collapseIconStyles}
                content={defaultRender?.(props)}
                iconAria={{ 'aria-label': translate('COLLAPSE_ICON_ARIA_LABEL') }}
            >
                <Stack styles={cardsWrapperStyles}>
                    <SIDInstrumentsSection metadata={metadata} entity={props?.item} data={cardsInstruments} isExtended />
                </Stack>
            </Collapse>
        ) : (
            defaultRender?.(props)
        );
    };

export default renderRow;
