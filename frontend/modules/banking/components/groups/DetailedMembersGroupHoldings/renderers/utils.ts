import { FH_INSTRUMENT_NAME_TO_TYPE, FH_NAME_TO_CATEGORY_MAP } from '../../../../constants/FHValueMaps';
import { IGroupFinancialHolding } from '../../../../interfaces/Groups/IGroupFinancialHolding';

export const getCardInstruments = ({ groupHolding, contactId }: { groupHolding: IGroupFinancialHolding; contactId: string }) =>
    groupHolding.category == FH_NAME_TO_CATEGORY_MAP.Credit
        ? groupHolding.financialInstruments?.filter(
              instrument => instrument?.financialHoldingInstrumentType == FH_INSTRUMENT_NAME_TO_TYPE.card && instrument?.fhiCardholder == contactId
          )
        : [];
