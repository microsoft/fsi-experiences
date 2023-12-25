import { EntityMetadata, EntityMetadataWithOptionSet } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import FHAccount from './FHAccount';
import FHCredit from './FHCredit';
import FHInvestment from './FHInvestment';
import FHLoan from './FHLoan';
import FHSavings from './FHSavings';
import FinancialInstrumentFields from './FinancialInstrumentFields';

interface FHEntity extends FHAccount, FHInvestment, FHLoan, FHCredit, FHSavings {}

export declare type FHIMetadata = {
    [P in keyof FinancialInstrumentFields]-?: EntityMetadata | EntityMetadataWithOptionSet;
};
export declare type MergedMetadata = {
    [P in keyof FHEntity]-?: EntityMetadata | EntityMetadataWithOptionSet;
};
export interface FHFieldsMetadata {
    categories: EntityMetadataWithOptionSet;
    types: EntityMetadataWithOptionSet;
}
export interface CustomerFHMetadata {
    role: EntityMetadataWithOptionSet;
}

export interface FHMetadata extends MergedMetadata, FHIMetadata, FHFieldsMetadata, CustomerFHMetadata {
    financialMarketProductType: EntityMetadataWithOptionSet;
}
