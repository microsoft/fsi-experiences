import React, { useContext } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { IRelationship } from '../../interfaces/Relationships/IRelationship';
import { Text } from '@fluentui/react/lib/Text';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants';
import { useCallback } from 'react';
import { RelationshipsContext } from './context/RelationshipsContext';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import LoadingComponent from '../../components/groups/LoadingComponent';
import useResponsiveContainer from '@fsi/core-components/dist/context/hooks/useResponsiveContainer';
import {
    buttonStyles,
    relationshipMainAppHeaderTextStyles,
    relationshipsSeparatorStyles,
    rootStyles,
    tablePadding,
} from './RelationshipsMainApp.style';
import RelationshipsMainTable from './RelationshipsMainTable/RelationshipsMainTable';
import { CommandBarButton } from '@fluentui/react/lib/components/Button';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';
import { EmptyState } from '@fsi/core-components/dist/components/atoms/EmptyState/EmptyState';

interface RelationshipsMainAppProps {
    relationships: IRelationship[];
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showRelationshipDeleteAcceptDialog;
    setClickedRelationship: React.Dispatch<React.SetStateAction<Partial<IRelationship> | undefined>>;
    readonly?: boolean;
}

export const RelationshipsMainApp: React.FC<RelationshipsMainAppProps> = ({
    readonly,
    relationships,
    setIsModalOpen,
    showRelationshipDeleteAcceptDialog,
    setClickedRelationship,
}) => {
    const relationshipsContext = useContext(RelationshipsContext);
    const translate = useTranslation(namespaces.RELATIONSHIP);
    const containerProps = useResponsiveContainer('relationships-table');
    const {
        palette: { themePrimary },
    } = useTheme();

    const onAddRelationshipClick = useCallback(() => {
        setClickedRelationship(undefined);
        setIsModalOpen(true);
    }, [relationships]);

    if (relationshipsContext.loadingState.isLoading) {
        return <LoadingComponent msg={relationshipsContext.loadingState.msg} />;
    }

    if (relationshipsContext.relationships.length > 0) {
        return (
            <Stack grow={1} styles={rootStyles}>
                <Stack horizontal styles={{ root: { textAlign: 'left', paddingTop: '24px', paddingLeft: '24px' } }}>
                    <Stack.Item grow={1000}>
                        <Text styles={relationshipMainAppHeaderTextStyles}>{translate('RELATIONSHIPS')}</Text>
                    </Stack.Item>
                    <Stack.Item grow={1} styles={{ root: { paddingTop: '10px', paddingRight: '10px' } }}>
                        <CommandBarButton
                            styles={buttonStyles}
                            text={
                                /* istanbul ignore next */ containerProps.columns < 4
                                    ? translate('RELATIONSHIP_SHORTENED_ADD_SUBMIT_TEXT')
                                    : translate('RELATIONSHIP_ADD_SUBMIT_TEXT')
                            }
                            iconProps={{ iconName: 'Add', style: { color: themePrimary } }}
                            onClick={onAddRelationshipClick}
                            data-testid="relationship-add-button"
                            disabled={readonly}
                        />
                    </Stack.Item>
                </Stack>
                <Separator styles={relationshipsSeparatorStyles as React.CSSProperties} />
                <div ref={containerProps.ref} className={containerProps.className} style={tablePadding}>
                    <RelationshipsMainTable
                        readonly={readonly}
                        isCompactMode={containerProps.columns < 4}
                        relationships={relationships}
                        setClickedRelationship={setClickedRelationship}
                        setIsModalOpen={setIsModalOpen}
                        showRelationshipDeleteAcceptDialog={showRelationshipDeleteAcceptDialog}
                    />
                </div>
            </Stack>
        );
    }

    return (
        <EmptyState
            icon={IMAGE_SRC.create}
            iconSize={200}
            title={translate('RELATIONSHIPS_CARD_EMPTY_STATE')}
            callsToAction={[{ title: translate('RELATIONSHIP_ADD_SUBMIT_TEXT'), callback: () => setIsModalOpen(true), disabled: readonly }]}
        />
    );
};
export default RelationshipsMainApp;
