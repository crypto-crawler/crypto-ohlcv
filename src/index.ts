import { strict as assert } from 'assert';
import getOHLCVBinance from './exchanges/binance';
import getOHLCVBitfinex from './exchanges/bitfinex';
import getOHLCVBitstamp from './exchanges/bitstamp';
import getOHLCVCoinbase from './exchanges/coinbase';
import getOHLCVHuobi from './exchanges/huobi';
import getOHLCVNewdex from './exchanges/newdex';
import getOHLCVWhaleEx from './exchanges/whaleex';
import { OHLCV } from './pojo/ohlcv';

export { OHLCV } from './pojo/ohlcv';

/**
 * Get last 24 hours trade volume of all pairs.
 *
 * @param exchange Thee exchange name
 * @returns Last 24 hours trade volume
 */
export default async function getOHLCV(exchange: string): Promise<{ [key: string]: OHLCV }> {
  assert.ok(exchange);

  switch (exchange) {
    case 'Binance': {
      return getOHLCVBinance();
    }
    case 'Bitfinex': {
      return getOHLCVBitfinex();
    }
    case 'Bitstamp': {
      return getOHLCVBitstamp();
    }
    case 'Coinbase': {
      return getOHLCVCoinbase();
    }
    case 'Huobi': {
      return getOHLCVHuobi();
    }
    case 'Newdex': {
      return getOHLCVNewdex();
    }
    case 'WhaleEx': {
      return getOHLCVWhaleEx();
    }
    default:
      throw new Error(`Unsupported exchange: ${exchange}`);
  }
}
