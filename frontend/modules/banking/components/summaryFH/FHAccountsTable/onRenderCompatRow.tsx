import { Separator } from '@fluentui/react/lib/components/Separator/Separator';
import { Stack } from '@fluentui/react/lib/components/Stack/Stack';
import React from 'react';
import { onRenderAccountName, onRenderIndicator, renderMark, SumItem } from '../FHSummaryColumns';
import { withoutIconClassNames } from '../summaryFHConstants';
import { IAccountsLineProps } from './FHAccountsTable';

const sepratorLinks = { root: { height: 1, padding: 0 } };

const TextAndMark = ({ checked, text, name, translate, className = withoutIconClassNames.BlueIconImg, icon = 'CheckMark' }) => (
    <Stack horizontal horizontalAlign="space-between">
        <Stack>{text}</Stack>
        {renderMark(checked, translate, `${text}-checkbox-${name}`, className, icon)}
    </Stack>
);

const onRenderCompactRow = (item: IAccountsLineProps, translate) => (
    <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal horizontalAlign="space-between" styles={{ root: { paddingInlineEnd: 8 } }}>
            {onRenderAccountName(item)}
            <Stack disableShrink={false} verticalAlign="center" horizontal tokens={{ childrenGap: 10 }}>
                <SumItem sum={item.sum} count={item.sum} />
                {onRenderIndicator({ indicator: item.indicator })}
            </Stack>
        </Stack>
        <Separator styles={sepratorLinks} />
        <Stack tokens={{ childrenGap: 8 }} styles={{ root: { paddingInline: 8 } }}>
            <TextAndMark text={translate('DEBIT_CARD')} translate={translate} checked={!!item.card} name={item.name} />
            <Separator styles={sepratorLinks} />
            <TextAndMark text={translate('STANDING_ORDER')} translate={translate} checked={!!item.standingOrder} name={item.name} />
            <Separator styles={sepratorLinks} />
            <TextAndMark text={translate('DIRECT_DEBIT')} translate={translate} checked={!!item.directDebit} name={item.name} />
            <Separator styles={sepratorLinks} />
            <TextAndMark
                text={translate('OVERDRAFT')}
                translate={translate}
                checked={!!item.overDraft}
                name={item.name}
                className={withoutIconClassNames.RedIconImg}
                icon="Important"
            />
        </Stack>
    </Stack>
);

export default onRenderCompactRow;
