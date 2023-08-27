import React, { useContext, useMemo } from 'react';
import { relationshipCardIconStyle } from './RelationshipsMainTable.style';
import { IRelationship } from '../../../interfaces/Relationships/IRelationship';
import { RelationshipsContext } from '../context/RelationshipsContext';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import LinkablePersona from '@fsi/core-components/dist/components/atoms/LinkablePersona/LinkablePersona';
import { IconButton } from '@fluentui/react/lib/components/Button/IconButton/IconButton';
import { DetailsList } from '@fluentui/react/lib/components/DetailsList/DetailsList';
import { IColumn } from '@fluentui/react/lib/components/DetailsList/DetailsList.types';
import { SelectionMode } from '@fluentui/react/lib/components/DetailsList';
import { detailsListStyles } from './RelationshipsMainTable.style';

interface RelationshipsMainTableProps {
    relationships: IRelationship[];
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    showRelationshipDeleteAcceptDialog;
    setClickedRelationship: React.Dispatch<React.SetStateAction<Partial<IRelationship> | undefined>>;
    isCompactMode?: boolean;
    readonly?: boolean;
}

export const RelationshipsMainTable: React.FC<RelationshipsMainTableProps> = props => {
    const relationshipsContext = useContext(RelationshipsContext);
    const { readonly, relationships, setIsModalOpen, showRelationshipDeleteAcceptDialog, setClickedRelationship, isCompactMode } = props;
    const translate = useTranslation(namespaces.RELATIONSHIP);

    const columns: IColumn[] = useMemo(() => {
        let columnToReturn: IColumn[] = [
            {
                key: 'contact',
                name: translate('CONTACT_COLUMN_NAME'),
                fieldName: 'customerTo',
                minWidth: 200,
                maxWidth: 300,
                onRender: (item: IRelationship) => (
                    <div style={{ width: 'max-content' }}>
                        <LinkablePersona
                            personas={[
                                {
                                    personaName: item.contactTo.fullName,
                                    imageUrl: item.contactTo.contactImgUrl,
                                    data: { ...item.contactTo, id: item.contactTo.contactId },
                                },
                            ]}
                            personaProps={{
                                secondaryText: isCompactMode ? relationshipsContext.relationshipTypes.get(item.relationshipType) : undefined,
                            }}
                        />
                    </div>
                ),
                isPadded: true,
            },
        ];

        if (!isCompactMode) {
            columnToReturn = [
                ...columnToReturn,
                {
                    key: 'relationshiptype',
                    name: translate('RELATIONSHIP_TYPE_COLUMN_NAME'),
                    fieldName: 'relationshipType',
                    minWidth: 120,
                    onRender: (item: IRelationship) => (
                        <div data-testid={'relationship-type-value'} style={{ paddingTop: 4 }}>
                            {relationshipsContext.relationshipTypes.get(item.relationshipType)}
                        </div>
                    ),
                },
            ];
        }

        columnToReturn = [
            ...columnToReturn,
            {
                key: 'update',
                name: '',
                minWidth: 15,
                maxWidth: 15,
                isIconOnly: true,
                onRender: (item: IRelationship) => (
                    <IconButton
                        disabled={readonly}
                        className="control-btn"
                        iconProps={{ iconName: 'Edit', 'aria-hidden': true }}
                        aria-label={translate('RELATIONSHIPS_UPDATE_BUTTON')}
                        title={translate('RELATIONSHIPS_UPDATE_BUTTON')}
                        data-testid={`relationship-update-${item.id}`}
                        styles={relationshipCardIconStyle}
                        onClick={() => {
                            setClickedRelationship(item);
                            setIsModalOpen(true);
                        }}
                    />
                ),
            },
            {
                key: 'delete',
                name: '',
                minWidth: 15,
                maxWidth: 15,
                isIconOnly: true,
                onRender: (item: IRelationship) => (
                    <IconButton
                        disabled={readonly}
                        className="control-btn"
                        iconProps={{ iconName: 'Delete', 'aria-hidden': true }}
                        aria-label={translate('RELATIONSHIPS_DELETE_BUTTON')}
                        title={translate('RELATIONSHIPS_DELETE_BUTTON')}
                        data-testid={`relationship-delete-${item.id}`}
                        styles={relationshipCardIconStyle}
                        onClick={() => {
                            setClickedRelationship(item);
                            showRelationshipDeleteAcceptDialog();
                        }}
                    />
                ),
            },
        ];

        return columnToReturn;
    }, [relationships, isCompactMode]);

    return (
        <DetailsList
            items={relationships}
            setKey="set"
            columns={columns}
            selectionMode={SelectionMode.none}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="Row checkbox"
            styles={detailsListStyles}
        />
    );
};
export default RelationshipsMainTable;
