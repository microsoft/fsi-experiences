import React, { FC, useCallback, useContext } from 'react';
import FSIContext from '../../../../context/FSIContext';
import Field, { IField } from '../Field/Field';

const Lookup: FC<IField> = props => {
    const { fieldData, metadata } = props;
    const { navigation } = useContext(FSIContext);

    const onClick = useCallback(() => {
        if (fieldData?.value && metadata?.target) {
            navigation?.openForm(fieldData.value as string, metadata.target as string);
        }
    }, [fieldData, metadata, navigation]);

    return <Field onClick={onClick} {...props} />;
};

export default Lookup;
