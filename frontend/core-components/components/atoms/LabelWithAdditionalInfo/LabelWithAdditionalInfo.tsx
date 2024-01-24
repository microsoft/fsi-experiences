import React, { FC } from 'react';
import { Label } from '@fluentui/react/lib/Label';
import type { ILabelWithAdditionalInfoProps } from './LabelWithAdditionalInfo.interface';
import { AdditionalTextStyles, LabelWithAdditionalInfoStyles } from './LabelWithAdditionalInfo.style';
import { OverflowText } from '../OverflowText/OverflowText';

export const LabelWithAdditionalInfo: FC<ILabelWithAdditionalInfoProps> = ({ fieldId, id, isRequired, label, description }) => {
    const compoundId = fieldId ? `${fieldId}-label` : undefined;
    return (
        <Label htmlFor={fieldId} required={isRequired} className={LabelWithAdditionalInfoStyles} id={id || compoundId}>
            <OverflowText text={label} overflowModeSelf />
            {description && <span className={AdditionalTextStyles} data-test-id="label--additional-info">{`(${description})`}</span>}
        </Label>
    );
};

export default LabelWithAdditionalInfo;
