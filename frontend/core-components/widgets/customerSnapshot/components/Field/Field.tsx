import { Icon } from '@fluentui/react/lib/components/Icon';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React, { FC } from 'react';
import { IFieldData, IFieldMetadata } from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import { iconStyles, tagsStyles, textStyles, valueTextStyles } from './Field.styles';
import { Link } from '@fluentui/react/lib/components/Link/Link';
import Tag from '../../../../components/atoms/Tag/Tag';
import { useTranslation } from '../../../../context/hooks/useTranslation';

export interface IField {
    icon?: string;
    fieldLabel?: string;
    fieldData?: IFieldData;
    metadata?: IFieldMetadata;
    onClick?: (fieldData?: IFieldData) => void;
    tags?: string[];
    href?: string;
    currencyId?: string;
    hideLabel?: boolean;
    horizontal?: boolean;
    tabIndex?: number;
    as?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
}

const Field: FC<IField> = ({ icon, fieldLabel, fieldData, href, onClick, children, tags, hideLabel, horizontal, as, tabIndex }) => {
    const translate = useTranslation();
    const fieldValue = fieldData?.formattedValue || fieldData?.value;
    const TextComponent = (href || onClick) && fieldValue ? Link : Text;

    const onTextComponentClick = () => onClick!(fieldData);

    return (
        <Stack horizontal={horizontal} tokens={{ childrenGap: 4 }} data-testid="field-wrapper">
            {!hideLabel && fieldLabel && (
                <Stack horizontal tokens={{ childrenGap: 8 }} verticalAlign="center">
                    {icon && !horizontal && <Icon styles={iconStyles} iconName={icon}></Icon>}
                    <Text styles={horizontal ? valueTextStyles({ horizontal }) : textStyles}>{fieldLabel}</Text>
                </Stack>
            )}
            <Stack tokens={{ childrenGap: 8 }}>
                {children || (
                    <TextComponent
                        as={as}
                        tabIndex={tabIndex}
                        data-testid="field-text"
                        styles={valueTextStyles({ horizontal })}
                        onClick={onClick && onTextComponentClick}
                        href={href}
                    >
                        {fieldValue || translate('N_A')}
                    </TextComponent>
                )}

                {tags?.length && fieldValue && (
                    <Stack horizontal>
                        {tags.map(tag => (
                            <Tag key={tag} text={tag} styles={tagsStyles} />
                        ))}
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default Field;
