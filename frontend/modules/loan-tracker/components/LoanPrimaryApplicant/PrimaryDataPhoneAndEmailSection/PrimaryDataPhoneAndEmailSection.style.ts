import { MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT } from '../../../constants/StyleSelectors.consts';

export const primaryDataPhoneEmailSectionStyle = {
    root: {
        [MEDIA_QUERY_LOAN_INFORMATION_PRIMARY_APPLICANT_COLUMNS_LAYOUT]: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'baseline',
            '& :nth-last-child': {
                margin: 0,
            },
            '& > *': {
                overflow: 'hidden',
            },
        },
    },
};
