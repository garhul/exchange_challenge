import { rateItem } from "@exchange/sharedTypes";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledForm = styled.div`
  display:inline-flex;
  padding:2em;  
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

  button {
    cursor:pointer;
    border-radius:.5em;
    background-color:#ffc79B;
    margin-left:2em;
    font-size:1em;
    padding:.5em;
    border:1px solid #ffaa66;
    box-shadow: .1em .1em .1em rgba(0,0,0,.3);
    :hover {
      filter:brightness(105%);
    }
    :active {
      box-shadow: none;      
    }
    :disabled {
      filter:saturate(10%);
      box-shadow: none;
      cursor:not-allowed;
    }
  }

  input[type=number] {
    color:#444;
    margin-left:1em;  
    font-size:1.2em;
    background:none;
    border:none;    
    border-bottom:2px solid #FFC80A ;
    :focus {
      outline: none;
      color:#222;    
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
        {options.map(opt => (<option value={opt[0]}>{opt[1]}</option>))}
      </select>
    </div>
  )
}

export default function ExchangeForm({ rates }: { rates: Record<string, rateItem> }) {
  const [amount, setAmount] = useState<number | null>(null);
  const [selectedExchanges, setSelectedExchanges] = useState<{ from: string, to: string }>({ from: 'CZK', to: '' });
  const [canConvert, setCanConvert] = useState(false);

  useEffect(() => {
    if (
      (amount !== null && amount > 0) &&
      (selectedExchanges.from !== '' && selectedExchanges.to !== '')
    ) {
      setCanConvert(true)
    } else {
      setCanConvert(false);
    }
  }, [selectedExchanges, amount])


  const updateAmount = (value: string) => {
    const n = parseFloat(value);
    if (n < 0) return;
    setAmount(n);
  };

  const handleExchangeSelection = (type: 'from' | 'to', currency: string) => {

  }

  const doConversion = () => {
    console.log({ amount, selectedExchanges });
  }

  return (
    <StyledForm>
      convert
      <input placeholder="Amount" type='number' value={amount || ''} onChange={(ev) => updateAmount(ev.target.value)} />
      <CurrencySelector
        onChange={(value) => setSelectedExchanges(v => ({ ...v, ...{ from: value } }))}
        value={selectedExchanges.from}
        options={Object.keys(rates).map(k => [k, rates[k].currency])}
        label=""
      />
      <CurrencySelector
        onChange={(value) => setSelectedExchanges(v => ({ ...v, ...{ to: value } }))}
        value={selectedExchanges.to}
        options={Object.keys(rates).map(k => [k, rates[k].currency])}
        label="to"
      />
      <button disabled={!canConvert} onClick={() => doConversion()}>Calculate</button>
    </StyledForm>
  )
}