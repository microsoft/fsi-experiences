export const hasOnlyDigits = (value: string) => {
    return /^\d+$/.test(value);
};

/* 
NOTE: This implementation is used by PowerApps and is taken from https://dev.azure.com/dynamicscrm/OneCRM/_git/CRM.Client.UnifiedClient?path=/src/features/validation/src/Validation/EmailAddressValidator.ts&_a=contents&version=GBmaster
It doesn't comply with RFC 2822 standard email validation
*/
export const hasValidEmail = (value: string) => {
    const regExp =
        /^[^@\s\\"<>)([\]:;,.]+(([.]{1}[^@\s\\"<>)([\]:;,.]+)+?|)@([^@\s\\"<>)([\]+:;,.-]+(((\.|\+|-|--)[^@\s\\"<>)([\]+:;,.-]+)+?|)([.][^0-9@\s\\"<>)([\]+:;,.-]+)+?|(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))$/g;
    return regExp.test(value);
};

export const isStringNullOrEmpty = (value: string) => {
    return (
        value == null || // checks for both undefined and null as `undefined == null`
        (typeof value === 'string' && !/\S/.test(value)) // if string contains at least one char which is not white-space (e.g \n\t)
    );
};

export const trimValue = (value: string) => value?.trim();

export const notEmptyString = (value: string) => !isStringNullOrEmpty(value);
