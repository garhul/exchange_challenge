import styled from "styled-components";
import { rateItem } from "@exchange/sharedTypes";

const StyledTable = styled.table`
  min-width:40%;
  caption-side:bottom;
  border-spacing: 0;  
  color:${({ theme }) => theme.colors.fgLighter};
  box-shadow:.25em .25em .5em rgba(0,0,0,.2);

  tbody tr {
    background-color: ${({ theme }) => theme.colors.bgTblRow};
    :nth-of-type(odd) {
      background-color: ${({ theme }) => theme.colors.bgTblRowOdd};
    }
    :hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.fgDarkest};
    }
  }

  tbody tr td {
    padding: .2em .5em;
    :nth-child(4) {
      text-align:right;
    }
  }

  tbody tr.selected {    
    background-color:${({ theme }) => `${theme.colors.primary}99`};    
  }

  caption {
    font-size:.9em;
    color:${({ theme }) => theme.colors.fgLighter2};
    text-align:right;
    text-transform:lowercase;
    margin-top:.5em;
  }

  thead tr {
    font-size:1em;
    font-weight:400;
    text-transform:uppercase;
    background-color: ${({ theme }) => theme.colors.bgTblHeader};
    color:${({ theme }) => theme.colors.fgLightest};
    height:2em;    
    text-align:left;
    th {
      padding-left:.5em;
      text-shadow: 0.1em 0.1em 0.1em rgba(0,0,0,.3);
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
  selectedCurrency: string;
}

export default function ExchangeTable({ rates, lastUpdate, selectedCurrency }: exchangeTableProps) {
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Country</th>
            <th>Currency</th>
            <th>Code</th>
            <th>Exchange (per 1 CZK)</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates).map(code => (
            <tr
              key={`row_${code}`}
              className={(code === selectedCurrency) ? 'selected' : ''}
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