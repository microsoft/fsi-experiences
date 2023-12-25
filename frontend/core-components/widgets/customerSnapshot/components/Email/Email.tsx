import React, { FC } from 'react';
import Field, { IField } from '../Field/Field';

const Email: FC<IField> = props => <Field href={props.fieldData?.value ? `mailto:${props.fieldData.value}` : undefined} icon="Mail" {...props} />;

export default Email;
