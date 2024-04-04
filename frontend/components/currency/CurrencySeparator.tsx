import React from 'react'

interface Props {
  currencyCode: string;
  amount: number;
}

export const CurrencySeparator = ({ currencyCode, amount }: Props) => {
    const formattedCurrency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
    }).format(amount);

    return <span>{formattedCurrency}</span>;

}