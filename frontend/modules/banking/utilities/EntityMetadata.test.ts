import { FHMetadataMock } from '../interfaces/FHEntity/mocks/FHMetadata.mock';
import { getFHEntityDisplayName, getOptionSetText, toPickListMap } from './EntityMetadata';

describe('EntityMetadata', () => {
    describe('getOptionSetText', () => {
        it('get option-set text for valid option', () => {
            const text = getOptionSetText(104800000, FHMetadataMock.categories);

            expect(text).toEqual('Lines of credit');
        });

        it('get empty string for invalid option', () => {
            const text = getOptionSetText(104811, FHMetadataMock.categories);

            expect(text).toEqual('');
        });

        it('get empty string for empty metadata', () => {
            const text = getOptionSetText(104800000, undefined);

            expect(text).toEqual('');
        });

        it('get empty string for empty params', () => {
            const text = getOptionSetText();

            expect(text).toEqual('');
        });

        it('get empty for non option set', () => {
            const text = getOptionSetText(104800000, FHMetadataMock.fhAccountBlockedAmount);

            expect(text).toEqual('');
        });
    });

    describe('toPickListMap', () => {
        it('Should convert option set to pick list map', async () => {
            const pickList = toPickListMap({
                121212: { text: 'testField1', value: 121212 },
                121213: { text: 'testField2', value: 121213 },
            });

            expect(pickList).toEqual(
                new Map([
                    [121212, 'testField1'],
                    [121213, 'testField2'],
                ])
            );
        });
    });

    describe('getFHEntityDisplayName', () => {
        it('Should return display name of specific entity', async () => {
            const text = getFHEntityDisplayName('fhNumberOfTransactions', FHMetadataMock);

            expect(text).toEqual('Number of transactions');
        });

        it('get empty string for empty metadata', () => {
            const text = getFHEntityDisplayName('fhNumberOfTransactions', undefined);

            expect(text).toEqual('');
        });
    });
});
