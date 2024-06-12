import React, { FC } from 'react';
import Field, { IField } from '../Field/Field';

const Phone: FC<IField> = props => <Field href={props.fieldData?.value ? `tel:${props.fieldData.value}` : undefined} icon="Phone" {...props} />;

export default Phone;
