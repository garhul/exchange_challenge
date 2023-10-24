import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import Alert from '../../components/alert/alert';
import ExchangeTable from '../../components/exchangeTable/exchangeTable';
import ExchangeForm from '../../components/exchangeForm/excchangeForm';
import getRates from '../../providers/rates';
import { rateList } from '@exchange/sharedTypes';

const Container = styled.div`
  display: flex;  
  width:80vw;
  justify-content:center;
  margin:0 auto;
`;

//padding: ${(theme) => theme.boxes.padding},
// border:  ${(theme) => theme.boxes.border}
export default function MainView() {
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
          <ExchangeForm rates={query.data?.rates} />
          <ExchangeTable rates={query.data?.rates} lastUpdate={query.data.publishedDate} />
        </>
      }

      {query.status === 'error' &&
        <Alert variant='error'>Error fetching data</Alert>
      }

    </Container>
  );
}