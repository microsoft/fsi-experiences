import { TextField as FluentTextField } from '@fluentui/react/lib/TextField';
import { concatStyleSets } from '@fluentui/react/lib/Styling';
import React, { FC, ReactElement, FormEvent, useCallback } from 'react';
import { getClassNameStyleSets } from '../../../utilities/GetClassNameStyleSets';
import type { ITextFieldProps } from './TextField.interface';
import { baseClassName, defaultErrorStyles, textFieldBaseStyles } from './TextField.style';

export const TextField: FC<ITextFieldProps> = props => {
    const { validateOnFocusOut = true, validateOnLoad = false, className: customClassNames, onValidate, onChange, onValidationComplete } = props;

    const onGetErrorMessage = useCallback((value: string) => onValidate?.(value) || '', [onValidate]);

    const onNotifyValidationResult = useCallback(
        (errorMessage: string | ReactElement, value?: string) => onValidationComplete?.(value as string, !!errorMessage),
        [onValidationComplete]
    );

    const onChangeHandler = useCallback(
        (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>, value?: string) => onChange?.(value, event),
        [onChange]
    );

    const textFieldClasses = getClassNameStyleSets({
        baseClassName,
        styles: defaultErrorStyles,
        customClassNames,
    });

    /* Note: we set `validateOnFocusOut` & `validateOnLoad` explicitly, 
    as otherwise they don't pick up their default values */
    return (
        <FluentTextField
            {...props}
            styles={concatStyleSets(textFieldBaseStyles, props.styles)}
            className={textFieldClasses[baseClassName]}
            validateOnLoad={validateOnLoad}
            validateOnFocusOut={validateOnFocusOut}
            onGetErrorMessage={onGetErrorMessage}
            onNotifyValidationResult={onNotifyValidationResult}
            onChange={onChangeHandler}
        />
    );
};

export default TextField;
