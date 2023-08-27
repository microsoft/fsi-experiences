import { IIconStyles } from '@fluentui/react/lib/components/Icon/Icon.types';
import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { maxFourColumnsDetailedFHSelector } from '../../../../../components/detailedFinancialHolding/DetailedFHMain.style';

export const cardsWrapperStyles = {
    root: {
        padding: '12px 70px',
        [maxFourColumnsDetailedFHSelector]: {
            padding: 12,
        },
        '& > div > *': {
            margin: 0,
        },
    },
};

export const collapseIconStyles: IIconStyles = {
    root: { position: 'absolute', width: 20, height: 32, zIndex: 9, left: 46, cursor: 'pointer', fontSize: 12 },
};

export const collapseWrapperStyles: IStackStyles = { root: { '.ms-GroupSpacer': { display: 'flex' }, position: 'relative' } };

export const collapseContentWrapperStyles: IStackStyles = {
    root: {
        maxWidth: `calc(100% - 590px)`,
    },
};
