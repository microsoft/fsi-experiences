import React, { FC, useMemo } from 'react';
import { DateTime as FSIDatetime } from '../../../../components/atoms/DateTime';
import Field, { IField } from '../Field/Field';
import { valueTextStyles } from '../Field/Field.styles';

const DateTime: FC<IField> = props => {
    const { fieldData, horizontal } = props;
    const date = useMemo(() => (fieldData?.value ? new Date(fieldData.value as Date) : undefined), [fieldData]);

    return <Field {...props}>{date && <FSIDatetime styles={valueTextStyles({ horizontal })} date={date} />}</Field>;
};

export default DateTime;
