import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import Alert from '../../components/alert/alert';
import ExchangeTable from '../../components/exchangeTable/exchangeTable';
import ExchangeForm from '../../components/exchangeForm/excchangeForm';
import getRates from '../../providers/rates';
import { rateList } from '@exchange/sharedTypes';
import { useState } from 'react';

const Container = styled.div`
  display: flex;  
  flex-direction:column;
  margin-top:10vh;
  height:80vh;  
  justify-content:center;
  align-items:center;  
`;

//padding: ${(theme) => theme.boxes.padding},
// border:  ${(theme) => theme.boxes.border}

export default function MainView() {
  const [selectedExchanges, setSelectedExchanges] = useState<{ from: string, to: string } | null>(null)
  const query = useQuery<rateList>({ queryKey: ['rates'], queryFn: getRates });

  if (query.status === 'error') {
    console.error(query.error.message);
  }

  return (
    <Container>
      {query.status === 'pending' &&
        <Alert variant='notice'>Loading data</Alert>
      }

      {query.status === 'success' &&
        <>
          <ExchangeForm
            rates={query.data?.rates}
            onSelectionChange={(from: string, to: string) => ()}
          />

          <ExchangeTable
            rates={query.data?.rates}
            lastUpdate={query.data.publishedDate}
            selectedExchanges={selectedExchanges}
          />
        </>
      }

      {query.status === 'error' &&
        <Alert variant='error'>Error fetching data</Alert>
      }

    </Container>
  );
}