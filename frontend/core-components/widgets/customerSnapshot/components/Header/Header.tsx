import React, { FC } from 'react';
import {
    ICustomerSnapshotData,
    ICustomerSnapshotMetadata,
    IFieldLayout,
} from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import { headerRootStyles, headerStyles } from './Header.styles';
import { Text } from '@fluentui/react/lib/Text';
import SubtitleField from '../SubtitleField';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';

const headerRootTokens = { childrenGap: 8 };
interface IHeader {
    titleField?: IFieldLayout;
    subtitleFields?: IFieldLayout[];
    data?: ICustomerSnapshotData;
    metadata?: ICustomerSnapshotMetadata;
}

const Header: FC<IHeader> = ({ metadata, data, titleField, subtitleFields }) => {
    if (!titleField || !data || !metadata) {
        return null;
    }

    const fieldData = data.fields[titleField.name];
    const label = fieldData.formattedValue || fieldData.value;

    return (
        <Stack styles={headerRootStyles} tokens={headerRootTokens}>
            <h3 style={headerStyles}>{label}</h3>
            {subtitleFields?.length && (
                <Stack wrap horizontal data-testid="subtitle-fields">
                    {subtitleFields.map(subtitleField => (
                        <SubtitleField
                            key={subtitleField.name}
                            fieldData={data.fields[subtitleField.name]}
                            fieldMetadata={metadata[subtitleField.name]}
                            type={metadata[subtitleField.name].type}
                            currencyId={data.currencyId}
                            field={subtitleField}
                            isInline
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default Header;
