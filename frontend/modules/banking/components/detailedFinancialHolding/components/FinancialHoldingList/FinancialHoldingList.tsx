import React, { FC, useMemo } from 'react';
import { selectedItemStyle, allItemsStyle } from './FinancialHoldingList.style';
import Widget from '@fsi/core-components/dist/components/atoms/Widget';
import { IMAGE_SRC } from '@fsi/core-components/dist/constants';
import { IFinancialHoldingCard } from '../../../FinancialHoldingCard';
import FinancialHoldingCard from '../../../FinancialHoldingCard/FinancialHoldingCard';
import { namespaces, useTranslation } from '@fsi/core-components/dist/context/hooks/useTranslation';
import { FocusZone, FocusZoneDirection } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/components/List/List';
import { useTheme } from '@fluentui/react/lib/utilities/ThemeProvider/useTheme';

export interface IFinancialHoldingListProps {
    items: IFinancialHoldingCard[];
    onChange: (item: IFinancialHoldingCard) => void;
    selectedId?: string;
    isLoading?: boolean;
    isError?: boolean;
    isRestricted?: boolean;
}

const onRenderCell =
    ({ onChange, selectedId, selectedFHItemStyle }) =>
    item => {
        const itemStyle = item.id === selectedId ? selectedFHItemStyle : allItemsStyle;
        return (
            <FinancialHoldingCard
                id={item.id}
                styles={itemStyle}
                onClick={() => onChange(item)}
                name={item.name}
                type={item.type}
                value={item.value}
                currencyId={item.currencyId}
            />
        );
    };

const FinancialHoldingList: FC<IFinancialHoldingListProps> = ({ items, onChange, selectedId, isError, isLoading, isRestricted }) => {
    const {
        palette: { themePrimary },
    } = useTheme();
    const translate = useTranslation(namespaces.FINANCIAL_HOLDINGS);

    const selectedFHItemStyle = useMemo(() => selectedItemStyle({ themePrimary }), [themePrimary]);

    const emptyProps = useMemo(() => {
        if (isRestricted) {
            return { title: translate('CUSTOMER_INFORMATION_RESTRICTED'), icon: IMAGE_SRC.no_access100, iconSize: 100 };
        }

        if (items?.length === 0) {
            return { title: translate('NO_FINANCIAL_HOLDINGS'), icon: IMAGE_SRC.emptyState48, iconSize: 48 };
        }

        return undefined;
    }, [isRestricted, items.length, translate]);

    return (
        <Widget isLoading={isLoading} isError={isError} errorIconSize={100} name="financial-holding-list" emptyProps={emptyProps}>
            <FocusZone direction={FocusZoneDirection.vertical}>
                <List
                    key={selectedId}
                    data-testid="fh-list"
                    style={{ flex: 1 }}
                    items={items}
                    onRenderCell={onRenderCell({ onChange, selectedId, selectedFHItemStyle })}
                />
            </FocusZone>
        </Widget>
    );
};

export default FinancialHoldingList;
