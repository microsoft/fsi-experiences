import { CommonPCFContext } from '../common-props';
import { ICurrenciesDetails, ICurrency } from '@fsi/core-components/context/currency/ICurrenciesDetails';
export { ICurrenciesDetails, ICurrency } from '@fsi/core-components/context/currency/ICurrenciesDetails';

export const parseCurrency = (entity: any): ICurrency => ({
    id: entity['transactioncurrencyid'],
    name: entity['currencyname'],
    code: entity['isocurrencycode'],
    precision: entity['currencyprecision'],
    symbol: entity['currencysymbol'],
});

const getCurrenciesFetchXML = () => `
    <fetch>
        <entity name="transactioncurrency" >
            <attribute name="currencyprecision" />
            <attribute name="currencyname" />
            <attribute name="currencysymbol" />
            <attribute name="transactioncurrencyid" />
            <attribute name="isocurrencycode" />
            <filter/>
            <link-entity name="organization" from="basecurrencyid" to="transactioncurrencyid" link-type="outer" >
            <attribute name="organizationid" alias="organizationId"/>
            </link-entity>
        </entity>
    </fetch>
`;

export const parseCurrenciesDetails = (currenciesResponse): ICurrenciesDetails => {
    const details: ICurrenciesDetails = { baseCurrencyCode: 'USD', baseCurrencyId: '', currencies: {} };

    currenciesResponse.entities.forEach(cdmCurrency => {
        const currency = parseCurrency(cdmCurrency);
        details.currencies[currency.id] = currency;
        if (cdmCurrency['organizationId']) {
            details.baseCurrencyCode = currency.code;
            details.baseCurrencyId = currency.id;
        }
    });
    return details;
};
export class CurrencyService {
    private currencyLoadedPromise?: Promise<ICurrenciesDetails | undefined>;

    constructor() {}
    public async getCurrencies(context: CommonPCFContext): Promise<ICurrenciesDetails | undefined> {
        const { webAPI } = context;

        if (!this.currencyLoadedPromise) {
            const encodedFetchXml = encodeURIComponent(getCurrenciesFetchXML());

            this.currencyLoadedPromise = webAPI
                .retrieveMultipleRecords('transactioncurrency', `?fetchXml=${encodedFetchXml}`)
                .then(res => parseCurrenciesDetails(res))
                .catch(() => (this.currencyLoadedPromise = undefined));
        }

        return this.currencyLoadedPromise!;
    }

    public getCurrenciesPromise() {
        return this.currencyLoadedPromise;
    }
}

const currencyService = new CurrencyService();

export default currencyService;
