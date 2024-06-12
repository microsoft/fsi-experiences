import { Stack } from '@fluentui/react/lib/components/Stack';
import React, { Fragment, ReactElement } from 'react';
import { horizontalSeparatorStyles, rootContentStyles, verticalSeparatorStyles } from './SeparatedList.style';
import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { separatedListPrefix } from './SeparatedList.const';
import ResponsiveContainer from '../ResponsiveContainer/ResponsiveContainer';

interface ISeparatedList<T> {
    items: T[];
    onRenderItem: (item: T) => ReactElement;
}

export default function SeparatedList<T>({ items, onRenderItem }: ISeparatedList<T>) {
    const itemsLength = items.length;

    return (
        <ResponsiveContainer classPrefix={separatedListPrefix}>
            <Stack styles={rootContentStyles(itemsLength)}>
                {items.map((item, idx) => (
                    <Fragment key={idx}>
                        <Stack className="item">{onRenderItem(item)}</Stack>
                        <Separator vertical styles={verticalSeparatorStyles} />
                        <Separator styles={horizontalSeparatorStyles(itemsLength)} />
                    </Fragment>
                ))}
            </Stack>
        </ResponsiveContainer>
    );
}
