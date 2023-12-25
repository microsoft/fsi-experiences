import React from 'react';
import { Icon } from '@fluentui/react';
import { Stack } from '@fluentui/react/lib/components/Stack';
import { cellRootStyles, iconAndTextWrapperStyles, iconStyles, mainTextStyles, rootStyles, secondaryTextStyles } from './cellRenderer.styles';
import { defaultTranslate, TranslationFunction } from '@fsi/core-components/dist/context/localization/TranslationFunction';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText';
import TaskStatus from '../../OnboardingApplicationTasks/TasksGroupList/Fields/TaskStatus';

const onRenderCell =
    ({
        onChange,
        value,
        translate = defaultTranslate,
        processStage,
        disableTaskUpdate,
    }: {
        onChange: (item: any) => void;
        value?: string;
        translate?: TranslationFunction;
        processStage?: string;
        disableTaskUpdate?: boolean;
    }) =>
    (item: any, index: number | undefined) => {
        return (
            <Stack data-testid="selection-list-row" data-is-focusable onClick={() => onChange(item)} styles={rootStyles({ item, index, value })}>
                <Stack styles={iconAndTextWrapperStyles} horizontal verticalAlign="center">
                    <Icon iconName="contact" styles={iconStyles} />
                    <OverflowText text={item.name} styles={mainTextStyles} />
                </Stack>
                <Stack styles={cellRootStyles}>
                    <OverflowText text={item.isPrimary ? translate('PRIMARY_APPLICANT') : item.role} styles={secondaryTextStyles} overflowModeSelf />
                    {item.task && (
                        <TaskStatus
                            status={item.task.status}
                            updateTaskStatus={item.task.updateStatus}
                            label={translate('VERIFICATION')}
                            ariaLabel={translate('VERIFICATION_FOR_APPLICANT', { applicant: item.name })}
                            isDisabled={disableTaskUpdate || (item.task.processStage && item.task.processStage !== processStage)}
                        />
                    )}
                </Stack>
            </Stack>
        );
    };

export default onRenderCell;
