import { FontIcon } from '@fluentui/react/lib/components/Icon/FontIcon';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { FontWeights, NeutralColors } from '@fluentui/react/lib/Theme';
import React, { FC } from 'react';
import { ITopicDetailsProps } from './TopicDetails.interface';

export const TopicDetails: FC<ITopicDetailsProps> = ({ name, description, icon }) => {
    return (
        <Stack verticalAlign="center" tokens={{ childrenGap: 12 }}>
            {icon && <FontIcon iconName={icon} data-testid="topic-details-icon" />}
            <Text variant="medium" block styles={{ root: { fontWeight: FontWeights.semibold, color: NeutralColors.gray160 } }}>
                {name}
            </Text>
            {description && (
                <Text variant="smallPlus" data-testid="topic-details-description" styles={{ root: { marginTop: '5px' } }}>
                    {description}
                </Text>
            )}
        </Stack>
    );
};

export default TopicDetails;
