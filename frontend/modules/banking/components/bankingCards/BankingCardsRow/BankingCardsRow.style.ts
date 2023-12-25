import { IStackStyles } from '@fluentui/react/lib/components/Stack/Stack.types';
import { HORIZONTAL_PADDING } from '../BankingCards.style';

export const cardLine: IStackStyles = {
    root: {
        padding: `${HORIZONTAL_PADDING}px`,
        overflowX: 'hidden',
        position: 'relative',
        paddingTop: '18px',
        paddingBottom: '18px',
    },
};

export const cardStyle = {
    root: {
        padding: '0px 15px 0px 0px',
    },
};
