import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import Alert from '../../components/alert/alert';
import ExchangeTable from '../../components/exchangeTable/exchangeTable';
import ExchangeForm from '../../components/exchangeForm/excchangeForm';
import getRates from '../../providers/rates';
import { rateList } from '@exchange/sharedTypes';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;  
  flex-direction:column;  
  justify-content:center;
  align-items:center;
  margin-top:5vh;
`;

export default function MainView() {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const query = useQuery<rateList>({ queryKey: ['rates'], queryFn: getRates });

  if (query.status === 'error') {
    console.error(query.error.message);
  }

  useEffect(() => {
    if (query.status === 'success')
      setSelectedCurrency(Object.keys(query.data.rates)[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.status]);

  return (
    <Container>
      {query.status === 'pending' &&
        <Alert variant='info'>Loading exchange rates</Alert>
      }

      {query.status === 'success' &&
        <>
          <ExchangeForm
            rates={query.data?.rates}
            selectedCurrency={selectedCurrency}
            onCurrencySelected={setSelectedCurrency}
          />

          <ExchangeTable
            rates={query.data?.rates}
            lastUpdate={query.data.publishedDate}
            selectedCurrency={selectedCurrency}
          />
        </>
      }

      {query.status === 'error' &&
        <Alert variant='error'>Error fetching data</Alert>
      }

    </Container>
  );
}