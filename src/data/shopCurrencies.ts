// application
import { ICurrency } from '~/interfaces/currency';

const dataShopCurrencies: ICurrency[] = [
    {
        code: 'USD',
        symbol: '$',
        name: 'US Dollar',
        rate: 0.0077,
    },
    {
        code: 'JPY',
        symbol: '¥',
        name: 'Japanese Yen',
        rate: 1,
    },
    {
        code: 'EUR',
        symbol: '€',
        name: 'Euro',
        rate: 0.92,
    },
];

const dataShopDefaultCurrencyCode = 'USD';

export const dataShopDefaultCurrency: ICurrency = dataShopCurrencies.find((x) => (
    x.code === dataShopDefaultCurrencyCode
))!;

export default dataShopCurrencies;
