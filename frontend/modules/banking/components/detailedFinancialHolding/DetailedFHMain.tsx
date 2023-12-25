import React, { FC, useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { DetailedFHBody } from './components/DetailedFHBody/DetailedFHBody';
import Loading from '@fsi/core-components/dist/components/atoms/Loading/Loading';
import { IFHFetcher } from '../../interfaces/IFHFetcher';
import { DETAILED_FH_RESPONSIVE_CLASS, itemAlignmentsStackTokens, stackItemStyles, stackStyles } from './DetailedFHMain.style';
import ResponsiveContainer from '@fsi/core-components/dist/components/atoms/ResponsiveContainer/ResponsiveContainer';
import ErrorState from '@fsi/core-components/dist/components/containers/ErrorState/ErrorState';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { FHHiddenMessageBar } from '../FHHiddenMessageBar';
import useDetailedFHMain from '../../hooks/financialHoldings/useDetailedFHMain';

export interface DetailedMainProps {
    fetcher: IFHFetcher;
    contactId: string;
}

export const DetailedFHMain: FC<DetailedMainProps> = ({ fetcher, contactId }) => {
    const { fhStructure, isError, isLoading, entities, metadata, categoriesMetadata } = useDetailedFHMain({ fetcher, contactId });
    const translate = useTranslation(namespaces.DETAILED_FH_CONTROL);

    const content = useMemo(() => {
        if (isLoading && !isError) {
            return <Loading />;
        }

        if (isError || !entities) {
            return <ErrorState iconSize={200} />;
        }

        return (
            <>
                <FHHiddenMessageBar
                    requestMetadata={categoriesMetadata || {}}
                    highlightedText={translate('HIDDEN_INFORMATIOM_MAIN')}
                    regularText={translate('HIDDEN_INFORMATIOM_SUB')}
                />
                <Stack.Item align="stretch" grow={1} verticalFill styles={stackItemStyles}>
                    <DetailedFHBody metadata={metadata} fhItems={entities} fhStructure={fhStructure} fetcher={fetcher} contactId={contactId} />
                </Stack.Item>
            </>
        );
    }, [isLoading, isError, entities, metadata, fhStructure, fetcher, contactId, categoriesMetadata]);

    return (
        <ResponsiveContainer classPrefix={DETAILED_FH_RESPONSIVE_CLASS}>
            <Stack styles={stackStyles} tokens={itemAlignmentsStackTokens}>
                <Stack.Item align="stretch" verticalFill>
                    <Stack verticalFill tokens={{ childrenGap: 8 }}>
                        {content}
                    </Stack>
                </Stack.Item>
            </Stack>
        </ResponsiveContainer>
    );
};

export default DetailedFHMain;
