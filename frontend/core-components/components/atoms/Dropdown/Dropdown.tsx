import { Dropdown as FluentDropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import React, { FC, useCallback } from 'react';
import { getClassNameStyleSets } from '../../../utilities/GetClassNameStyleSets';
import type { IDropdownProps } from './Dropdown.interface';
import { baseClassName, dropdownBaseStyles, errorMessageStyles, underlinedBaseClass } from './Dropdown.style';

export const Dropdown: FC<IDropdownProps> = props => {
    const { underlined, className: customClassNames, onChange } = props;

    const onDropdownChangeHandler = useCallback(
        (e: React.FormEvent<HTMLDivElement>, item?: IDropdownOption, index?: number) => item && onChange(item, e),
        [onChange]
    );

    const dropdownClasses = getClassNameStyleSets({
        baseClassName,
        styles: errorMessageStyles,
        customClassNames,
        underlinedClass: underlined ? underlinedBaseClass : undefined,
    });

    return (
        <FluentDropdown
            {...props}
            styles={concatStyleSets(dropdownBaseStyles, props.styles)}
            className={dropdownClasses[baseClassName]}
            onChange={onDropdownChangeHandler}
        />
    );
};

export default Dropdown;
