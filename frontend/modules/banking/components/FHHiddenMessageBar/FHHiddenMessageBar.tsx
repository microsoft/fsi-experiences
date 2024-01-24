import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { IFHHiddenMessageBar } from './FHHiddenMessageBar.interface';
import { HttpStatusCode } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { iconStyle, messageBarStyle } from './FHHiddenMessageBar.style';
import HighlightMessageBar from '@fsi/core-components/dist/components/atoms/HighlightMessageBar/HighlightMessageBar';

export const statusCodesForHiddenElements = new Set<HttpStatusCode>([HttpStatusCode.FORBIDEN, HttpStatusCode.NO_CONTENT]);

export const FHHiddenMessageBar: FC<IFHHiddenMessageBar> = props => {
    const { img, requestMetadata, highlightedText, regularText } = props;

    const hiddenInformationExists = useMemo(() => {
        return Object.values(requestMetadata).find(entityMetadata => statusCodesForHiddenElements.has(entityMetadata));
    }, [requestMetadata]);

    if (!hiddenInformationExists) {
        return <></>;
    }

    return (
        <Stack.Item align="auto" data-testid={`hidden-bar`}>
            <HighlightMessageBar
                styles={messageBarStyle}
                highlight={highlightedText}
                regular={regularText}
                messageBarType={MessageBarType.info}
                messageBarIconProps={{ iconName: img || 'lock', styles: { ...iconStyle } }}
            />
        </Stack.Item>
    );
};

export default FHHiddenMessageBar;
