import { Link } from '@fluentui/react/lib/components/Link/Link';
import React, { FC, useContext } from 'react';
import FSIContext from '../../../context/FSIContext';
import type { ILinkToFormProps } from './LinkToForm.interface';
import { Text } from '@fluentui/react/lib/Text';
import { infoValueStyles, linkValueStyles } from './LinkToForm.style';

const LinkToForm: FC<ILinkToFormProps> = ({ value, entityName, link }) => {
    const { navigation } = useContext(FSIContext);

    return link && navigation ? (
        <Link styles={linkValueStyles} onClick={() => navigation.openForm(link, entityName)} data-testid="link-link">
            {value}
        </Link>
    ) : (
        <Text className="body-detail" styles={infoValueStyles} data-testid="link-field-value">
            {value}
        </Text>
    );
};

export default LinkToForm;
