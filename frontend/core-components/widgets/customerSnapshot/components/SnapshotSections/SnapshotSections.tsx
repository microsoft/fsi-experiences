import React, { FC, Fragment, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import {
    ICustomerSnapshotData,
    ICustomerSnapshotMetadata,
    ICustomerSnapshotSection,
} from '../../../../dataLayerInterface/entity/CustomerSnapshot/CustomerSnapshot';
import { rootContentStyles, sectionSeparatorStyles, separatorHorizontalStyles, separatorVerticalStyles } from './SnapshotSections.styles';
import SectionField from '../SectionField/SectionField';
import { Separator } from '@fluentui/react/lib/Separator';

interface ISnapshotSectionsProps {
    sections?: ICustomerSnapshotSection[];
    data: ICustomerSnapshotData;
    metadata: ICustomerSnapshotMetadata;
    hasHeader?: boolean;
}

export const SnapshotSections: FC<ISnapshotSectionsProps> = ({ sections, data, metadata, hasHeader }) => {
    const fieldsLength = useMemo(() => sections?.reduce((prevValue, currValue) => prevValue + currValue.fields.length, 0) || 0, [sections]);

    if (!fieldsLength || !sections) {
        return null;
    }
    return (
        <>
            {hasHeader && (
                <>
                    <Separator data-testid="snapshot-header-separator" className="header-seperator-horizontal" styles={separatorHorizontalStyles} />
                    <Separator
                        data-testid="snapshot-header-separator"
                        className="header-seperator-vertical"
                        vertical
                        styles={separatorVerticalStyles}
                    />
                </>
            )}
            <Stack styles={rootContentStyles(fieldsLength)}>
                {sections.map((section, idx) => (
                    <Fragment key={`section-${idx}`}>
                        {section.fields.map((contentField, i) => (
                            <SectionField
                                key={contentField.name + '_' + i}
                                currencyId={data.currencyId}
                                fieldData={data.fields[contentField.name]}
                                fieldMetadata={metadata[contentField.name]}
                                type={metadata[contentField.name].type}
                                preferredContactMethod={data.preferredContactMethod}
                                field={contentField}
                            />
                        ))}
                        <Separator className="section-seperator" styles={sectionSeparatorStyles} />
                    </Fragment>
                ))}
            </Stack>
        </>
    );
};

export default SnapshotSections;
