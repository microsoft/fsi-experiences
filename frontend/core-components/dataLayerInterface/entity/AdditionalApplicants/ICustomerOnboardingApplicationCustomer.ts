export interface ICustomerOnboardingApplicationCustomer {
    id: string;
    role: string;
    fullName: string;
    firstName: string;
    lastName: string;
    isPrimary: boolean;
    phone?: string;
    email?: string;
}
