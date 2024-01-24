import React, { FC } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import {
    sidMainDataRowFontStyle,
    sidMainDataCellStyles,
    SID_COMPACT_CLASS,
    sidMainDataRowCurrencyStyle,
    SID_MOBILE_CLASS,
} from './SIDMainDataRow.style';
import { ISIDMainDataRowProps } from './SIDMainDataRow.interface';
import FHDataBox from '../../FHDataBox/FHDataBox';
import { ICurrencyDisplayBox } from '../../FHDataBox/FHDataBox.interface';

const currencyDisplay: ICurrencyDisplayBox = {
    styles: sidMainDataRowCurrencyStyle,
    fricationDigits: 2,
};

export const SIDMainDataRow: FC<ISIDMainDataRowProps> = ({ list, compact, entity, isMobile }) => {
    const className = isMobile ? SID_MOBILE_CLASS : compact ? SID_COMPACT_CLASS : '';

    return (
        <Stack wrap={isMobile ? undefined : compact} horizontal={!isMobile} horizontalAlign="start" data-testid={`main-sid-row`}>
            {list.map((item, idx) => (
                <Stack.Item
                    key={idx}
                    className={className}
                    grow={1}
                    styles={sidMainDataCellStyles(compact)}
                    align="auto"
                    data-testid={`main-sid-databox`}
                >
                    <div className="sid-main-cell-inner">
                        <FHDataBox entity={entity} styles={sidMainDataRowFontStyle} boxDetails={item} currencyDisplay={currencyDisplay} />
                    </div>
                </Stack.Item>
            ))}
        </Stack>
    );
};

export default SIDMainDataRow;
