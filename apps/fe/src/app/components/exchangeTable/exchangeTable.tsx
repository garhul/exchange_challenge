import styled from "styled-components";
import { rateItem } from "@exchange/sharedTypes";


const StyledTable = styled.table`
  width:80%;
  caption-side:bottom;
  border-spacing: 0;
  border:.5em solid #677282;
  border-radius:.5em;  
  color:#333;
  box-shadow:.25em .25em .5em rgba(0,0,0,.2);

  tbody tr {
    background-color:#ddd;
    :nth-of-type(odd) {
      background-color: #eee;
    }
    :hover {
      background-color: #b5d9db;
      color:#000;
    }
  }

  tbody tr td {
    padding: .2em .5em;
    :nth-child(4) {
      text-align:right;
    }
  }

  tbody tr.to {
    background-color:#ffc0cc;
  }

  tbody tr.from {
    background-color:#c0ffcc;
  }

  caption {
    font-size:.9em;
    color:#9f9f9f;
    text-align:right;
    text-transform:lowercase;
    margin-top:.5em;
  }

  thead tr {
    font-size:1em;
    font-weight:400;
    text-transform:uppercase;
    background-color: #677282;
    color:#f0f0f0;
    height:2em;    
    text-align:left;
    th {
      padding-left:.5em;
      :nth-child(4) {
        text-align:right;
        padding-right:.5em;
      }
    }
    
  }
`;

const TableContainer = styled.div`
  padding:.5em;    
  display:flex;
  width:100%;
  justify-content:center;
`;

export type exchangeTableProps = {
  lastUpdate: Date;
  rates: Record<string, rateItem>;
  selectedExchanges: { from: string, to: string };
}

export default function ExchangeTable({ rates, lastUpdate, selectedExchanges }: exchangeTableProps) {
  console.log({ rates, lastUpdate, selectedExchanges });

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Code</th>
            <th>Exchange (1 CZK)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates).map(code => (
            <tr
              key={`row_${code}`}
              className={(code === selectedExchanges.from) ? 'from' : (code === selectedExchanges.to) ? 'to' : ''}
            >
              <td>{rates[code].country}</td>
              <td>{rates[code].currency}</td>
              <td>{code}</td>
              <td>{rates[code].rate.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
        <caption>rates last update: {new Date(lastUpdate).toLocaleDateString()}</caption>
      </StyledTable>
    </TableContainer>
  );
}