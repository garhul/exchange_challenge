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
