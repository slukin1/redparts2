// react
import React from 'react';
// application
import { useCurrency } from '~/store/currency/currencyHooks';
import { ICurrency } from '~/interfaces/currency';

interface Props {
    value: number;
    currency?: ICurrency;
}

function CurrencyFormat(props: Props) {
    const { value, currency: propCurrency } = props;
    const siteCurrency = useCurrency();
    const currency = propCurrency || siteCurrency;
    const nonDiscount = value * 1.2;

    return (
        <React.Fragment>
            <span style={{ textDecoration: 'line-through', color: 'darkred', fontSize: '65%' }}>
                FOB:
                {' '}
                {currency.symbol}
                {(nonDiscount * currency.rate).toFixed(2)}
            </span>
            <br />
            <span style={{ fontWeight: 'bold', color: 'darkred', fontSize: '100%' }}>
                FOB:
                {' '}
                {currency.symbol}
                {(value * currency.rate).toFixed(2)}
            </span>
        </React.Fragment>
    );
}
export default CurrencyFormat;
