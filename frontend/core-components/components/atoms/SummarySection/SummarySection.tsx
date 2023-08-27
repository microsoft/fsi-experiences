import React, { FC, useMemo } from 'react';
import type { ISummarySectionProps } from './SummarySection.interface';
import { Text } from '@fluentui/react/lib/Text';
import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { SummarySectionStyles } from './SummarySection.style';

const SummarySection: FC<ISummarySectionProps> = ({ icon, title, subtitle, children }) => {
    const Lines = useMemo(
        () =>
            subtitle?.split('\n').map((item, index) => (
                <Text key={index} className={headerSubtitle}>
                    {item}
                </Text>
            )),
        [subtitle]
    );
    const { root, headerTitle, sectionIcon, headerSubtitle, headerSection } = SummarySectionStyles;

    return (
        <Stack horizontal tokens={{ childrenGap: '12px' }} className={root}>
            {icon && <FontIcon iconName={icon} className={sectionIcon} data-testid="summary-section-icon" />}
            <Stack.Item className={headerSection}>
                <Text className={headerTitle}>{title}</Text>
                <Stack data-testid="summary-section-subinfo">{Lines}</Stack>
                {children}
            </Stack.Item>
        </Stack>
    );
};
export default SummarySection;
