export interface PerCurrencyBalance {
  currency: string;
  exchange: Array<string> | null;
  funding:  Array<string> | null;
  margin:  Array<string> | null;
}
