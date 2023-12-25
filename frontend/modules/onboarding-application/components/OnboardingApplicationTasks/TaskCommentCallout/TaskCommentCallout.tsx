import React, { FC } from 'react';
import { Callout as CalloutFluent, DirectionalHint } from '@fluentui/react/lib/Callout';
import { Text } from '@fluentui/react/lib/Text';
import { modifiedOnHourStyle, modifiedOnStyle, modifiedOnWrapper, modifiedWrapper, stylesCallout } from './TaskCommentCallout.style';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { DateTime, DateTimePredefinedFormat } from '@fsi/core-components/dist/components/atoms/DateTime';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import { Persona, PersonaSize } from '@fluentui/react';
import { ICalloutProps as ICalloutPropsFluent } from '@fluentui/react/lib/components/Callout/Callout.types';
import { TASK_COMMENT_CALLOUT_CONTENT_TEST_ID, TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID } from './TaskCommentCallout.const';

export interface ITaskCommentCalloutProps extends ICalloutPropsFluent {
    content: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

export const TaskCommentCallout: FC<ITaskCommentCalloutProps> = props => {
    const { content, modifiedOn, modifiedBy } = props;

    const modifiedOnDate = modifiedOn && new Date(modifiedOn);

    return (
        <CalloutFluent styles={stylesCallout} directionalHint={DirectionalHint.bottomCenter} {...props} aria-hidden="true">
            <Text data-testid={TASK_COMMENT_CALLOUT_CONTENT_TEST_ID}>{content}</Text>
            <Separator />
            <Stack styles={modifiedWrapper}>
                {modifiedBy && (
                    <Persona
                        styles={modifiedOnStyle}
                        text={modifiedBy}
                        size={PersonaSize.size8}
                        data-testid={TASK_COMMENT_CALLOUT_MODIFIED_BY_TEST_ID}
                    />
                )}
                {modifiedOnDate && (
                    <Stack styles={modifiedOnWrapper}>
                        <DateTime quickFormat={DateTimePredefinedFormat.HoursMinutes} date={modifiedOnDate} styles={modifiedOnHourStyle} />
                        <DateTime date={modifiedOnDate} styles={modifiedOnStyle} />
                    </Stack>
                )}
            </Stack>
        </CalloutFluent>
    );
};

export default TaskCommentCallout;
