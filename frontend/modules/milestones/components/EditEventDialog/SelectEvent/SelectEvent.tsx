import React, { FC } from 'react';
import { Label } from '@fluentui/react/lib/components/Label/Label';
import Stack from '@fluentui/react/lib/components/Stack/Stack';
import { labelStyles } from '../EditEventDialog.style';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ComboBox } from '@fluentui/react/lib/components/ComboBox/ComboBox';
import { IComboBoxOption, IComboBoxProps } from '@fluentui/react/lib/components/ComboBox/ComboBox.types';

interface ISelectEventProps {
    hideCategory?: boolean;
    hideType?: boolean;
    categoryOptions: IComboBoxOption[];
    typeOptions: IComboBoxOption[];
    onCategoryOptionsChanged: IComboBoxProps['onChange'];
    onTypeOptionsChanged: IComboBoxProps['onChange'];
    selectedCategoryCode: number;
    selectedType: number;
}

const sectionTokens = { childrenGap: 8 };

const comboBoxStyles = { label: { display: 'none' } };

const SelectEvent: FC<ISelectEventProps> = ({
    hideCategory,
    hideType,
    categoryOptions,
    onCategoryOptionsChanged,
    onTypeOptionsChanged,
    typeOptions,
    selectedCategoryCode,
    selectedType,
}) => {
    const translate = useTranslation(namespaces.LIFE_EVENT_BAR);

    return (
        <Stack tokens={sectionTokens}>
            <Label styles={labelStyles} required>
                {translate(hideCategory ? 'SELECT_LIFE_EVENT_TYPE' : 'SELECT_CATEGORY_AND_TYPE')}
            </Label>
            <Stack tokens={sectionTokens} horizontal>
                {!hideCategory && (
                    <Stack.Item grow>
                        <ComboBox
                            required
                            placeholder={translate('LIFE_EVENT_CATEGORY')}
                            autoComplete="on"
                            selectedKey={selectedCategoryCode}
                            label={translate('SELECT_LIFE_EVENT_CATEGORY')}
                            styles={comboBoxStyles}
                            options={categoryOptions}
                            onChange={onCategoryOptionsChanged}
                        />
                    </Stack.Item>
                )}
                {!hideType && (
                    <Stack.Item grow>
                        <ComboBox
                            disabled={!selectedCategoryCode}
                            required
                            placeholder={translate('LIFE_EVENT_TYPE')}
                            label={translate('SELECT_LIFE_EVENT_TYPE')}
                            styles={comboBoxStyles}
                            autoComplete="on"
                            selectedKey={selectedType}
                            options={typeOptions}
                            onChange={onTypeOptionsChanged}
                        />
                    </Stack.Item>
                )}
            </Stack>
        </Stack>
    );
};

export default SelectEvent;
