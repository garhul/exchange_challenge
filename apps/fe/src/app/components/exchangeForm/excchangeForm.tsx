import { rateItem, rateList } from "@exchange/sharedTypes";




type currencySelectorProps = {
  onChange: (code: string) => void;
  options: [string, string][];
  label: string;
}

export function CurrencySelector({ onChange, options, label }: currencySelectorProps) {
  return (
    <div>
      <label htmlFor="opt">{label}</label>
      <select id="opt">
        {options.map(opt => (<option value={opt[0]}>{opt[1]}</option>))}
      </select>
    </div >
  )
}

export default function ExchangeForm({ rates }: { rates: Record<string, rateItem> }) {
  return (
    <form>
      <CurrencySelector onChange={console.log} options={Object.keys(rates).map(k => [k, rates[k].currency])} label="Currency to convert from" />
      <CurrencySelector onChange={console.log} options={Object.keys(rates).map(k => [k, rates[k].currency])} label="Currency to convert to" />
      <button>Calculate</button>
    </form>
  )
}