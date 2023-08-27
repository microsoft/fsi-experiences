import { hasOnlyDigits, hasValidEmail, isStringNullOrEmpty, notEmptyString, trimValue } from './FormUtils';

describe('Form Utils - hasOnlyDigits', () => {
    it('should return true if the value has only digits', () => {
        const result = hasOnlyDigits('12345');

        expect(result).toBeTruthy();
    });

    it('should return false if the value does not have only digits', () => {
        const result = hasOnlyDigits('(12)+345');

        expect(result).toBeFalsy();
    });
});

describe('Form Utils - hasValidEmail', () => {
    it('should return true if the value has a valid email', () => {
        const result = hasValidEmail('firstname-lastname@example.com');

        expect(result).toBeTruthy();
    });

    it('should return false if the value does not have a valid email', () => {
        const result = hasValidEmail('mysite.org');

        expect(result).toBeFalsy();
    });

    // Unicode and other characters
    it('should return true for a valid unicode email Émanuel@fd.cd', () => {
        const result = hasValidEmail('Émanuel@fd.cd');

        expect(result).toBeTruthy();
    });

    it('should return true for a valid unicode email квіточка@пошта.укр', () => {
        const result = hasValidEmail('квіточка@пошта.укр');

        expect(result).toBeTruthy();
    });

    it('should return true for a valid unicode email χρήστης@παράδειγμα.ελ', () => {
        const result = hasValidEmail('χρήστης@παράδειγμα.ελ');

        expect(result).toBeTruthy();
    });

    it('should return true for a valid unicode email 用户@例子.广告', () => {
        const result = hasValidEmail('用户@例子.广告');

        expect(result).toBeTruthy();
    });

    it('should return true for a valid unicode email अजय@डाटा.भारत', () => {
        const result = hasValidEmail('अजय@डाटा.भारत');

        expect(result).toBeTruthy();
    });

    it('should return true for a valid unicode email ñoñó1234@server.com', () => {
        const result = hasValidEmail('ñoñó1234@server.com');

        expect(result).toBeTruthy();
    });

    it('should return true for a valid email user+mailbox/department=shipping@example.com', () => {
        const result = hasValidEmail('user+mailbox/department=shipping@example.com');

        expect(result).toBeTruthy();
    });

    it("should return true for a valid email !#$%&'*+-/=?^_`.{|}~@example.com", () => {
        const result = hasValidEmail("!#$%&'*+-/=?^_`.{|}~@example.com");

        expect(result).toBeTruthy();
    });

    it('should return false for invalid email "Abc@def"@example.com', () => {
        const result = hasValidEmail('"Abc@def"@example.com');

        expect(result).toBeFalsy();
    });

    it('should return false for invalid unicode email Dörte@Sörensen.example.2c.2k', () => {
        const result = hasValidEmail('Dörte@Sörensen.example.2c.2k');

        expect(result).toBeFalsy();
    });

    it('should return false for invalid email "Fred Bloggs"@example.com', () => {
        const result = hasValidEmail('"Fred Bloggs"@example.com');

        expect(result).toBeFalsy();
    });

    it('should return false for invalid email "Joe.\\Blow"@example.com', () => {
        const result = hasValidEmail('"Joe.\\Blow"@example.com');

        expect(result).toBeFalsy();
    });
});

describe('Form Utils - isStringNullOrEmpty', () => {
    it('should return true if the value has an empty string', () => {
        const result = isStringNullOrEmpty(' ');

        expect(result).toBeTruthy();
    });

    it('should return false if the value does not have an empty string', () => {
        const result = isStringNullOrEmpty('some data');

        expect(result).toBeFalsy();
    });
});

describe('Form Utils - trimValue', () => {
    it('should return trimmed string', () => {
        const result = trimValue(' hello world  ');

        expect(/(?=^\S).+(?<=\S$)/.test(result)).toBeTruthy();
    });

    it('should return undefined when input string is undefined', () => {
        let str;
        const result = trimValue(str);

        expect(result).toBeUndefined();
    });
});

describe('Form Utils - notEmptyString', () => {
    it('should return true if the value is not an empty string', () => {
        const result = notEmptyString('hello world');

        expect(result).toBeTruthy();
    });

    it('should return false if the value is an empty string', () => {
        const result = notEmptyString('');

        expect(result).toBeFalsy();
    });
});
