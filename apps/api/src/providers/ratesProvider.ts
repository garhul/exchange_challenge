const API_URL = process.env.API_URL || `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`;

export type rateItem = {
  country: string;
  currency: string;
  rate: number;
  code: string;
};

export type rateList = {
  publishedDate: Date;
  rates: Record<string, rateItem>;
}

export default async function getRates(): Promise<rateList> {
  const rsp: Response = await fetch(API_URL, {
    headers: [['Content-Type', 'text/plain']]
  });

  if (!rsp.ok) {
    throw new Error('Error fetching resource');
  }

  const lines = (await rsp.text()).split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const header = lines.shift()?.split('#')[0].trim();

  if (header === undefined) throw new Error('Resource data not valid');

  const items: rateItem[] =
    lines.slice(1).map(l => {
      const parts = l.split('|');
      return {
        country: parts[0],
        currency: parts[1],
        code: parts[3],
        rate: parseFloat(parts[2]) / parseFloat(parts[4])
      }
    });

  return {
    publishedDate: new Date(header),
    rates: Object.fromEntries(items.map(i => [i.code, i])),
  }
}