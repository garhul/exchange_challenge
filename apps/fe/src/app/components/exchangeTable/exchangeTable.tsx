import styled from "styled-components";
import { rateItem } from "@exchange/sharedTypes";

export type exchangeTableProps = {
  lastUpdate: Date;
  rates: Record<string, rateItem>;
}

const StyledTable = styled.table`
  width:80%;
  caption-side:bottom;
  border-spacing: 0;
  border:.5em solid

  tbody tr {
    background-color:#9fb6d5;
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #739ed7;
      color:#fff;
    }
  }

  caption {
    font-size:.9em;
    color:#9f9f9f;
    text-align:right;
    text-transform:lowercase;
  }

  thead tr {
    font-size:1.1em;
    font-weight:normal;
    background-color: #739ed7;
    color:#fff;
    height:2em;    
  }

  td {
    border:none;
  }
`;

const TableContainer = styled.div`
  padding:.5em;  
  display:flex;
  width:100%;
  justify-content:center;
`;



export default function ExchangeTable({ rates, lastUpdate }: exchangeTableProps) {
  console.log({ rates, lastUpdate });

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
            <tr key={`row_${code}`}>
              <td>{rates[code].country}</td>
              <td>{rates[code].currency}</td>
              <td>{code}</td>
              <td>{rates[code].rate.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
        <caption>Table last update: {new Date(lastUpdate).toLocaleDateString()}</caption>
      </StyledTable>
    </TableContainer>
  );
}