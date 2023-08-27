import { Dropdown, IDropdownOption } from '@fluentui/react/lib/components/Dropdown';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { dropdownStyles, dropdownValueStyle, selectedPerformanceStyle } from './TimedPerformance.style';
import { mergeStyleSets } from '@fluentui/merge-styles/lib/mergeStyleSets';
import isNil from 'lodash/isNil';
import { ITimedPerformance } from './TimedPerformance.interface';
import { Performance } from '../../atoms/Performance';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { namespaces, useTranslation } from '../../../context/hooks/useTranslation';

const TimedPerformance: FC<ITimedPerformance> = props => {
    const { timedPerformancePairs, styles } = props;
    const chooseNonEmptyOption = (): number => {
        const index = timedPerformancePairs.findIndex(pair => !isNil(pair.value));
        return index >= 0 ? index : 0;
    };
    const [dropdownSelection, setDropdownSelection] = useState<number>();

    const options: IDropdownOption[] = useMemo(() => {
        return timedPerformancePairs.map((timePerformancePair, index) => {
            return {
                key: timePerformancePair.time,
                text: timePerformancePair.text,
                disabled: !timePerformancePair.value && timePerformancePair.value !== 0,
                index: index,
            };
        });
    }, [timedPerformancePairs]);

    useEffect(() => setDropdownSelection(chooseNonEmptyOption()), [timedPerformancePairs]);
    const percentage = timedPerformancePairs && timedPerformancePairs[dropdownSelection || 0].value;
    const translateFH = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    return (
        <>
            <Stack styles={{ root: { textAlign: 'left' } }}>
                <Stack.Item>
                    <Dropdown
                        data-testid={'timed-performance-dropdown'}
                        id="performance"
                        defaultSelectedKey={timedPerformancePairs[dropdownSelection || 0].time}
                        options={options}
                        onChange={(e, selection) => setDropdownSelection(/* istanbul ignore next */ selection?.index)}
                        styles={dropdownStyles}
                        ariaLabel={translateFH('ARIA_LABEL_PERFORMANCE_PERIOD')}
                    />
                </Stack.Item>
                <Stack.Item styles={selectedPerformanceStyle} key={dropdownSelection}>
                    <Performance percentage={percentage} styles={mergeStyleSets(styles, dropdownValueStyle)} />
                </Stack.Item>
            </Stack>
        </>
    );
};

export default TimedPerformance;
