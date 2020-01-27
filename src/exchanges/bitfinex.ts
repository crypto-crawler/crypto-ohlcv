import { strict as assert } from 'assert';
import Axios from 'axios';
import normalize from 'crypto-pair';
import { OHLCV } from '../pojo/ohlcv';

export default async function getOHLCV(): Promise<{ [key: string]: OHLCV }> {
  const response = await Axios.get('https://api-pub.bitfinex.com/v2/tickers?symbols=ALL');
  assert.equal(response.status, 200);

  const arr2D = response.data as (string | number)[][];

  const result: { [key: string]: OHLCV } = {};
  arr2D.forEach(arr => {
    const symbol = arr[0] as string;
    if (symbol[0] !== 't') return;
    assert.equal(arr.length, 11);

    const rawPair = symbol.substring(1).toLowerCase();
    const normalizedPair = normalize(rawPair, 'Bitfinex');

    const baseVolume = arr[8] as number;
    const lastPrice = arr[7] as number;
    const quoteVolume = baseVolume * lastPrice;

    result[normalizedPair] = {
      baseVolume,
      quoteVolume,
    };
  });

  return result;
}
