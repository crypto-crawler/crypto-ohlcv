import { strict as assert } from 'assert';
import Axios from 'axios';
import normalize from 'crypto-pair';
import { OHLCV } from '../pojo/ohlcv';

interface SymbolInfo {
  name: string;
  baseCurrency: string;
  quoteCurrency: string;
  baseVolume: string;
  quoteVolume: string;
  priceChangePercent: string;
  enable: boolean;
  status: 'ON' | 'OFF';
}

export default async function getOHLCV(): Promise<{ [key: string]: OHLCV }> {
  const result: { [key: string]: OHLCV } = {};

  const response = await Axios.get('https://api.whaleex.com/BUSINESS/api/public/symbol');
  assert.equal(response.status, 200);
  assert.equal(response.statusText, 'OK');

  const arr = response.data as Array<SymbolInfo>;

  arr.forEach(x => {
    const normalizedPair = normalize(x.name, 'WhaleEx');

    result[normalizedPair] = {
      baseVolume: parseFloat(x.baseVolume),
      quoteVolume: parseFloat(x.quoteVolume),
    };
  });

  return result;
}
