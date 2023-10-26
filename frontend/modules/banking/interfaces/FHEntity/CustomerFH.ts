import { IAbbreviatedContact } from '@fsi/core-components/dist/dataLayerInterface/entity/contact/AbbreviatedContact';

export interface ICustomerFH {
    contact: IAbbreviatedContact;
    role: number;
}

export default ICustomerFH;
