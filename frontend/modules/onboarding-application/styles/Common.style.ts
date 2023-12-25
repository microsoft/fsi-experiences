import { IStackStyles } from '@fluentui/react/lib/Stack';
import { FontSizes, FontWeights } from '@fluentui/react/lib/Styling';
import { NeutralColors } from '@fluentui/react/lib/Theme';

export const sectionTextStyle = {
    root: {
        fontSize: FontSizes.size16,
        fontWeight: FontWeights.regular,
        color: NeutralColors.gray160,
    },
};

export const headerMainTextStyle = {
    root: {
        fontSize: FontSizes.size20,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
        maxWidth: '100%',
    },
};

export const headerSecondaryTextStyle = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.regular,
        color: NeutralColors.gray160,
    },
};

export const partyPersonaNameTextStyle = {
    root: {
        fontSize: FontSizes.size14,
        fontWeight: FontWeights.semibold,
        color: NeutralColors.gray160,
    },
};

export const basicStackTokens = {
    childrenGap: '12px',
};

export const dataBoxTokens = {
    childrenGap: '2px',
};

export const phoneAndEmailStackTokens = {
    childrenGap: '16px',
};

export const emptyStateStyles = { container: { marginTop: 'auto', marginBottom: 'auto' } };

export const summaryDataStyles: IStackStyles = {
    root: {
        position: 'relative',
        padding: 16,
        textAlign: 'start',
    },
};

export const maxWidthPartyListMediaChange = 1500;

export const SCREEN_S_TABLE_WRAPPER_PADDING = '10px 5px 20px';

export const BaseLoanEntityWidgetZIndex = 9;
