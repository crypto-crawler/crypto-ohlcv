import { strict as assert } from 'assert';
import Axios from 'axios';
import normalize from 'crypto-pair';
import { OHLCV } from '../pojo/ohlcv';

interface Ticker24hr {
  symbol: string;
  contract: string;
  currency: string;
  last: number;
  change: number;
  high: number;
  low: number;
  amount: number;
  volume: number;
}

export default async function getOHLCV(): Promise<{ [key: string]: OHLCV }> {
  const response = await Axios.get('https://api.newdex.io/v1/tickers');

  assert.equal(response.status, 200);
  assert.equal(response.data.code, 200);

  const data = response.data.data as Ticker24hr[];

  const result: { [key: string]: OHLCV } = {};
  data.forEach(x => {
    const normalizedPair = normalize(x.symbol, 'Newdex');

    result[normalizedPair] = {
      baseVolume: x.amount,
      quoteVolume: x.volume,
    };
  });

  return result;
}
