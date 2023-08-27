import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import Tag, { TagStyles } from '../../../../components/atoms/Tag/Tag';
import { CISegment } from '../../../../dataLayerInterface/entity/CISegment';
import { FontSizes } from '@fluentui/style-utilities';
import { contactInsightsSegmentsTokens } from './SegmentsStack.style';
import { namespaces, useTranslation } from '../../../../context/hooks/useTranslation';
import { EmptyState } from '../../../../components/atoms/EmptyState/EmptyState';
import { COLORS } from '../../../../constants/Colors';
interface SegmentsStackProps {
    segments: CISegment[] | undefined;
    isSegmentsSupported: boolean;
}

const segmentTagStyles: TagStyles = {
    root: { fontSize: FontSizes.size12, lineHeight: 16, height: 'auto', padding: '2px 8px', backgroundColor: COLORS.lightGray },
    text: { fontSize: FontSizes.size12 },
};
export const SegmentsStack: FC<SegmentsStackProps> = props => {
    const { segments, isSegmentsSupported } = props;

    const translate = useTranslation(namespaces.KEY_OBSERVATIONS);
    const segmentsNamesForUI: string[] = useMemo(() => {
        return (segments || []).map(segment => segment.segmentName);
    }, [segments]);

    if (!isSegmentsSupported || !segments) {
        return <EmptyState title={translate('INVALID_CONFIGURATION')} subtitle={translate('CONTACT_SYSTEM_ADMIN')} />;
    }

    if (segmentsNamesForUI.length === 0) {
        return <EmptyState title={translate('KEY_SEGMENTS_EMPTY')} />;
    }

    return (
        <Stack horizontal wrap tokens={contactInsightsSegmentsTokens} data-testid="insights-segments">
            {segmentsNamesForUI.map((curr, idx) => (
                <Stack.Item key={idx} data-testid="insights-segments-item">
                    <Tag text={curr} styles={segmentTagStyles} />
                </Stack.Item>
            ))}
        </Stack>
    );
};
