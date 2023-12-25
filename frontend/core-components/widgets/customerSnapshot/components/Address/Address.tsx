import React, { FC } from 'react';
import Field, { IField } from '../Field/Field';

const Address: FC<IField> = props => <Field fieldData={props.fieldData} icon="Home" {...props} />;

export default Address;
