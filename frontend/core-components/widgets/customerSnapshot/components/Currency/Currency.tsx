import React, { FC } from 'react';
import Field, { IField } from '../Field/Field';
import FSICurrency from '../../../../components/containers/Currency/Currency';

const Currency: FC<IField> = props => (
    <Field {...props}>
        {props.fieldData?.value && <FSICurrency currencyId={props.currencyId} value={props.fieldData.value as number}></FSICurrency>}
    </Field>
);

export default Currency;
