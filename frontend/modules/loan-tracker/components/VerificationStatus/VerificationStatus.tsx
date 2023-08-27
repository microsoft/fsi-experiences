import React, { FC, useCallback } from 'react';
import { Checkbox } from '@fluentui/react/lib/components/Checkbox/Checkbox';
import { VERIFICATION_STATUSES } from '../../constants/LoanStateMap.consts';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { ICheckboxProps } from '@fluentui/react//lib/components/Checkbox/Checkbox.types';
import { VerificationStatusesValues } from '../../interfaces/IVerificationStatus/IVerificationStatusFetcher';

interface IVerificationStatusProps extends Omit<ICheckboxProps, 'onChange'> {
    verificationStatus: VerificationStatusesValues;
    onChange: (newVerificationStatus: VerificationStatusesValues) => void;
    isDisabled?: boolean;
}

const toggleVerificationStatus = (verificationStatus: VerificationStatusesValues) => {
    if (verificationStatus === VERIFICATION_STATUSES.Unverified) {
        return VERIFICATION_STATUSES.Verified;
    }

    return VERIFICATION_STATUSES.Unverified;
};

const VerificationStatus: FC<IVerificationStatusProps> = props => {
    const { verificationStatus, onChange, isDisabled } = props;
    const translate = useTranslation(namespaces.VERIFICATION_STATUS_CONTROL);
    const customOnChange = useCallback(() => {
        onChange(toggleVerificationStatus(verificationStatus));
    }, [onChange, verificationStatus]);

    return (
        <Checkbox
            {...props}
            label={translate('VERIFIED')}
            checked={verificationStatus === VERIFICATION_STATUSES.Verified}
            disabled={isDisabled}
            onChange={customOnChange}
        />
    );
};

export default VerificationStatus;
