import { Stack } from '@fluentui/react/lib/components/Stack';
import { Link } from '@fluentui/react/lib/Link';
import React, { FC } from 'react';
import { linkTooltipStyles, textAndLinkWrapperTooltipStyles, textTooltipStyles } from './StepInfoHeaderTooltip.style';
import { IStepInfoHeaderTooltip } from './StepInfoHeaderTooltip.interface';

export const StepInfoHeaderTooltip: FC<IStepInfoHeaderTooltip> = props => {
    const { step, description, linkInfoLabel, prefixLinkInfoLabel } = props;

    return (
        <Stack>
            <Stack.Item styles={textTooltipStyles}>{description}</Stack.Item>
            {step.link && (
                <Stack.Item styles={textAndLinkWrapperTooltipStyles}>
                    {prefixLinkInfoLabel && <Stack.Item styles={linkTooltipStyles}>{prefixLinkInfoLabel}</Stack.Item>}
                    <Link styles={textTooltipStyles} target="_blank" href={step.link}>
                        {linkInfoLabel}
                    </Link>
                </Stack.Item>
            )}
        </Stack>
    );
};
