// react
import React from 'react';
// application
import { useCurrency } from '~/store/currency/currencyHooks';
import { ICurrency } from '~/interfaces/currency';

interface Props {
    value: number;
    currency?: ICurrency;
}

function CurrencyPrice(props: Props) {
    const { value, currency: propCurrency } = props;
    const siteCurrency = useCurrency();
    const currency = propCurrency || siteCurrency;

    return (
        // Create a react component in which one price larger than the other is slashed and the other is bold
        <React.Fragment>
            <span>
                {currency.symbol}
                {(value * currency.rate).toFixed(2)}
            </span>
        </React.Fragment>
    );
}
export default CurrencyPrice;
