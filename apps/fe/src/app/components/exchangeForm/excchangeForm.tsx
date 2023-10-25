import { rateItem } from "@exchange/sharedTypes";
import { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.div`
  display:inline-flex;
  padding:1em;  
  font-size:1.2em;
  align-items:center;

  label{
    padding-left:1em;
  }

  select {
    background:none;
    border:none;
    padding:.5em;
    font-size:1em;
    cursor:pointer;
    :focus {
      outline:none;
    }
  }

  input[type=number] {
    color:${({ theme }) => theme.colors.fgLighter};
    width:6em;
    margin:0em 1em;  
    font-size:1.2em;
    background:none;
    border:none;    
    border-bottom:2px solid ${({ theme }) => theme.colors.primary} ;
    :focus {
      outline: none;
      color:${({ theme }) => theme.colors.fg};    
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {  
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
      -moz-appearance:textfield;
  }
`

const ConversionResult = styled.div`
  font-size:1.4em;
  height:2em;
  span {  
    font-weight:bold;
    margin:0em .5em;    
  }
  .placeholder {
    font-weight:400;
  }
`;

type currencySelectorProps = {
  onChange: (code: string) => void;
  value: string;
  options: [string, string][];
  label: string;

};

export function CurrencySelector({ onChange, options, label, value }: currencySelectorProps) {
  return (
    <div>
      <label htmlFor="opt">{label}</label>
      <select id="opt" onChange={(ev) => onChange(ev.target.value)} value={value}>
        {options.map(opt => (<option key={`opt_${opt[0]}`} value={opt[0]}>{`${opt[0]} - ${opt[1]}`}</option>))}
      </select>
    </div>
  )
}

export type exchangeFormProps = {
  onCurrencySelected: (currency: string) => void;
  selectedCurrency: string;
  rates: Record<string, rateItem>;
}

export default function ExchangeForm({ rates, onCurrencySelected, selectedCurrency }: exchangeFormProps) {
  const [amount, setAmount] = useState<number>(0);

  const updateAmount = (value: string) => {
    const n = parseFloat(value);
    if (n < 0) return;
    setAmount(n);
  };

  return (
    <>
      <StyledForm>
        convert
        <input placeholder="amount" type='number' value={amount === 0 ? '' : amount} onChange={(ev) => updateAmount(ev.target.value)} />
        CZK
        <CurrencySelector
          onChange={onCurrencySelected}
          value={selectedCurrency}
          options={Object.keys(rates).map(k => [k, rates[k].currency])}
          label="to"
        />
      </StyledForm>
      <ConversionResult>
        {(amount > 0) ?
          <>
            <span>{amount.toFixed(2)} CZK</span>=
            <span>{(amount * rates[selectedCurrency].rate).toFixed(2)} {selectedCurrency}</span>
          </>
          :
          <span className="placeholder">enter an amount to begin conversion</span>
        }
      </ConversionResult>
    </>
  )
}