import React, { FC } from 'react';
import { useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { Stack } from '@fluentui/react/lib/Stack';
import { OverflowText } from '@fsi/core-components/dist/components/atoms/OverflowText/OverflowText';
import { documentRegardingStyles, documentRegardingTokens, regardingRoleStyles } from './DocumentRegarding.style';
import { DI_NAMESPACE } from '../../constants/DocumentIntelligence.const';
import { IDocumentRegardingProps } from './DocumentRegarding.interface';

const DocumentRegarding: FC<IDocumentRegardingProps> = ({ regarding, stackStyles }) => {
    const { name, isPrimary, role } = regarding;
    const translate = useTranslation(DI_NAMESPACE);
    const showRole = role && !isPrimary;
    return (
        <Stack horizontal verticalAlign="center" tokens={documentRegardingTokens} styles={stackStyles}>
            <OverflowText text={name} styles={documentRegardingStyles} overflowModeSelf />
            {showRole && <OverflowText text={`(${role})`} styles={regardingRoleStyles} overflowModeSelf />}
            {isPrimary && <OverflowText text={`(${translate('PRIMARY_REGARDING')})`} styles={regardingRoleStyles} overflowModeSelf />}
        </Stack>
    );
};

export default DocumentRegarding;
