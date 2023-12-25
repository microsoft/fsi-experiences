import ICustomerFH from '../../../interfaces/FHEntity/CustomerFH';
import { EntityMetadata } from '@fsi/core-components/dist/dataLayerInterface/entity/Metadata/EntityMetadata';
import { LoadingState } from '@fsi/core-components/dist/enums/LoadingState';

export interface ICustomersTableProps {
    customers: ICustomerFH[];
    customersLoadingState: LoadingState;
    roleMetaData?: EntityMetadata;
    isCompact?: boolean;
}
