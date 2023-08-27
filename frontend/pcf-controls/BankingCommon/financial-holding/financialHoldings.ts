import { FINANCIAL_HOLDINGS_FLAGS, FINANCIAL_HOLDINGS_FLAGS_DEFAULTS } from '@fsi/banking/constants/features';
import { extractContextualFlags } from '@fsi/pcf-common/utilities/extractContextualConfig';

export const extractFinancialHoldingsFlags = context => ({
    flags: extractContextualFlags(context, Object.values(FINANCIAL_HOLDINGS_FLAGS), FINANCIAL_HOLDINGS_FLAGS_DEFAULTS),
});
