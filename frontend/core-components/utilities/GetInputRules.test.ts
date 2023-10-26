import { getEmailValidation, getRules } from './GetInputRules';

describe('getRules', () => {
    it('should return the correct input rules', () => {
        const rules = getRules(
            {
                required: true,
            },
            jest.fn(str => str)
        );

        expect(rules).toEqual({
            required: {
                value: true,
                message: 'INPUT_REQUIRED_MESSAGE',
            },
        });
    });

    it('should return the correct min input rules > 0', () => {
        const rules = getRules(
            {
                min: 10,
            },
            jest.fn(str => str)
        );

        expect(rules).toEqual({
            min: {
                value: 10,
                message: 'MIN_NUMBER_MESSAGE',
            },
        });
    });

    it('should return the correct min input rules = 0', () => {
        const rules = getRules(
            {
                min: 0,
            },
            jest.fn(str => str)
        );

        expect(rules).toEqual({
            min: {
                value: 0,
                message: 'NON_NEGATIVE_NUMBER_ONLY',
            },
        });
    });

    it('should return the correct max input rules', () => {
        const rules = getRules(
            {
                max: 10,
            },
            jest.fn(str => str)
        );

        expect(rules).toEqual({
            max: {
                value: 10,
                message: 'WITHIN_LIMIT_ONLY',
            },
        });
    });

    it('should return empty object', () => {
        const rules = getRules(
            {},
            jest.fn(str => str)
        );

        expect(rules).toEqual({});
    });

    it('should return the correct max length input rules', () => {
        const rules = getRules(
            {
                maxLength: 100,
            },
            jest.fn(str => str)
        );

        expect(rules).toEqual({
            maxLength: {
                value: 100,
                message: 'MAX_LENGTH',
            },
        });
    });

    it('should return the correct no white space input rules', () => {
        const noWhiteSpaceMessage = 'NO_WHITE_SPACE_MESSAGE';
        const rules = getRules(
            {
                noWhiteSpace: true,
            },
            jest.fn(str => str)
        );

        const isNoWhiteSpaceForNonEmptyString = rules.validate.noWhiteSpace('Test string');
        const isNoWhiteSpaceForEmptyString = rules.validate.noWhiteSpace(' ');
        expect(rules).toEqual(
            expect.objectContaining({
                validate: {
                    noWhiteSpace: expect.any(Function),
                },
            })
        );
        expect(isNoWhiteSpaceForNonEmptyString).toEqual(true);
        expect(isNoWhiteSpaceForEmptyString).toEqual(noWhiteSpaceMessage);
    });

    it('should return the correct validEmail input rules', () => {
        const rules = getRules(
            {
                validEmail: true,
            },
            jest.fn(str => str)
        );

        expect(rules).toEqual(
            expect.objectContaining({
                validate: {
                    validEmail: expect.any(Function),
                },
            })
        );
    });

    it('should return the correct only digits input rules', () => {
        const onlyDigitsMessage = 'ONLY_DIGITS_MESSAGE';
        const rules = getRules(
            {
                onlyDigits: true,
            },
            jest.fn(str => str)
        );
        const isOnlyDigitsForEmptyString = rules.validate.onlyDigits();
        const isOnlyDigitsForDigitsString = rules.validate.onlyDigits('12345');

        expect(rules).toEqual(
            expect.objectContaining({
                validate: {
                    onlyDigits: expect.any(Function),
                },
            })
        );
        expect(isOnlyDigitsForEmptyString).toEqual(onlyDigitsMessage);
        expect(isOnlyDigitsForDigitsString).toEqual(true);
    });
});

describe('getEmailValidation', () => {
    it('should return message when isRequired true and email is invalid', () => {
        const emailValidationFunction = getEmailValidation({ isRequired: true, message: 'custom message' });

        expect(emailValidationFunction('')).toEqual('custom message');
    });

    it('should return true when isRequired true and email is valid', () => {
        const emailValidationFunction = getEmailValidation({ isRequired: true, message: 'custom message' });

        expect(emailValidationFunction('gf@rt.com')).toBeTruthy();
    });
});
