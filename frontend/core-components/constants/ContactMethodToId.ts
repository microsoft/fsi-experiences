import { PreferredContactMethod } from '../enums/PreferredContactMethod';

export const contactMethodToId: Map<PreferredContactMethod, number> = new Map([
    [PreferredContactMethod.Any, 1],
    [PreferredContactMethod.Email, 2],
    [PreferredContactMethod.Phone, 3],
    [PreferredContactMethod.Mail, 5],
]);
