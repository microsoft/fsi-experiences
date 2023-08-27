import { ComboBox as FluentComboBox } from '@fluentui/react/lib/ComboBox';
import React, { FC, useCallback, useState } from 'react';
import { getClassNameStyleSets } from '../../../utilities/GetClassNameStyleSets';
import { baseClassName, comboboxBaseStyles, underlinedBaseClass } from '../ComboBox/ComboBox.style';
import type { IComboBoxProps } from './ComboBox.interface';

export const ComboBox: FC<IComboBoxProps> = props => {
    const {
        className: customClassNames,
        underlined,
        autoComplete = true,
        styles,
        allowFreeform,
        options: initialOptions,
        selectedKey: initialSelected,
    } = props;

    const [options, setOptions] = useState(initialOptions);
    const [selectedKey, setSelectedKey] = useState(initialSelected);

    const comboboxClasses = getClassNameStyleSets({
        baseClassName,
        styles,
        customClassNames,
        underlinedClass: underlined ? underlinedBaseClass : undefined,
    });

    const onChangeHandler = useCallback(
        (e, option, index, value) => {
            const selectedOption = option || { key: value as string, text: value as string };

            if (allowFreeform && !option && value) {
                setOptions([...options, selectedOption]);
            }

            props.onChange?.(selectedOption, index);
            setSelectedKey(selectedOption.key);
        },
        [options]
    );

    return (
        <FluentComboBox
            {...props}
            autoComplete={autoComplete ? 'on' : 'off'}
            className={comboboxClasses[baseClassName]}
            onChange={onChangeHandler}
            allowFreeform={allowFreeform}
            options={options}
            styles={comboboxBaseStyles}
            selectedKey={selectedKey}
        />
    );
};

export default ComboBox;
