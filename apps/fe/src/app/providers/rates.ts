import { rateList } from '@exchange/sharedTypes';
import { environment } from '../../environments/environment';

export default async function getRates(): Promise<rateList> {
  const rsp: Response = await fetch(`${environment.apiURL}/rates`, {
    headers: [['Content-Type', 'application/json']]
  });

  if (!rsp.ok) {
    throw new Error('Error fetching resource');
  }
  try {
    return rsp.json();
  } catch (ex) {
    throw new Error('Error parsing response');
  }
}