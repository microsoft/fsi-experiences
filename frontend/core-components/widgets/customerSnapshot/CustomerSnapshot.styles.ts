import { minFourColumns } from './consts/reponsive.consts';

export const widgetStyles = {
    root: {
        minHeight: 500,
        [minFourColumns]: {
            minHeight: 300,
        },
    },
};

export const noHeaderContentTokens = { padding: '12px 0px', childrenGap: 24 };
