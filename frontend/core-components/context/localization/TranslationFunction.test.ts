import { interpolateString, defaultUseTranslation, translations, defaultTranslate } from './TranslationFunction';

translations.common = { CHECK: 'check1', INTERPOLATECHECK: 'INTERPOLOATE {{SOME_VALUE}}', COMMON_TEXT: 'common' };
translations.notCommon = { CHECK: 'check2' };

describe('Default UseTranslation', () => {
    it(`Returns the translated value in common`, () => {
        const translate = defaultUseTranslation();
        const key = 'CHECK';
        const translated = translate(key);

        expect(translated).toEqual(translations.common.CHECK);
    });

    it(`Returns the translated value in notCommon`, () => {
        const translate = defaultUseTranslation('notCommon');
        const key = 'CHECK';
        const translated = translate(key);

        expect(translated).toEqual(translations.notCommon.CHECK);
    });

    it(`Returns the key if didn't find any translation in common`, () => {
        const translate = defaultUseTranslation();
        const key = 'NOT_IN_COMMON';
        const translated = translate(key);

        expect(translated).toEqual(key);
    });

    it(`Returns text from common if no exists in namespace`, () => {
        const translate = defaultUseTranslation('notCommon');

        const translated = translate('COMMON_TEXT');

        expect(translated).toEqual(translations.common.COMMON_TEXT);
    });

    it(`Returns key pluraled`, () => {
        const translate = defaultUseTranslation();
        const key = 'NOT_IN_COMMON';
        const translated = translate(key, { pluralCount: 2 });

        expect(translated).toEqual(key + '_PLURAL');
    });
});

describe('Interpolation function', () => {
    it(`Doesn't interpolate`, () => {
        const strToInterpolate = 'Check';
        const interpolatedString = interpolateString(strToInterpolate, { check1: 'checking1' });

        expect(strToInterpolate).toEqual(interpolatedString);
    });

    it(`Interpolate single word`, () => {
        const strToInterpolate = 'Check {{check1}}';
        const interpolatedString = interpolateString(strToInterpolate, { check1: 'checking1' });

        expect(interpolatedString).toEqual('Check checking1');
    });

    it(`Interpolate two word`, () => {
        const strToInterpolate = '{{check1}} Check {{check2}}';
        const interpolatedString = interpolateString(strToInterpolate, { check1: 'checking1', check2: 'checking2' });

        expect(interpolatedString).toEqual('checking1 Check checking2');
    });

    it(`Doesn't Interpolate when not finding the key`, () => {
        const strToInterpolate = '{{check1}} Check {{check2}} {{check3}}';
        const interpolatedString = interpolateString(strToInterpolate, { check1: 'checking1', check2: 'checking2', check4: 'checking3' });

        expect(interpolatedString).toEqual('checking1 Check checking2 {{check3}}');
    });
});

describe('DefaultTranslate', () => {
    it(`Interpolate via useTranslation`, () => {
        const key = 'INTERPOLATECHECK';
        const translated = defaultTranslate(key, { SOME_VALUE: '1' });

        expect(translated).toEqual(translations.common.INTERPOLATECHECK.replace('{{SOME_VALUE}}', '1'));
    });

    it(`Default value if no string found`, () => {
        const key = 'DEFAULTSTRINGCHECK';
        const defaultString = 'RANDOMSTRING';
        const translated = defaultTranslate(key, defaultString);

        expect(translated).toEqual(defaultString);
    });

    it(`Returns defaultString in case no namespace found`, () => {
        const key = 'DEFAULTSTRINGCHECK';
        const defaultString = 'RANDOMSTRING';
        const translated = defaultTranslate(key, defaultString, 'anything');

        expect(translated).toEqual(defaultString);
    });

    it(`Returns key in case no namespace found`, () => {
        const key = 'DEFAULTSTRINGCHECK';
        const translated = defaultTranslate(key, key, 'anything');

        expect(translated).toEqual(key);
    });
});
