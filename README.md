# crypto-ohlcv

Get last 24 hours OHLCV(open, high, low, close, volume) of all pairs.

## Quick start

```bash
npx crypto-ohlcv Binance
```

## How to use

```javascript
/* eslint-disable import/no-unresolved,no-console */
const getOHLCV = require('crypto-ohlcv').default;

(async () => {
  console.info(await getOHLCV('Binance'));
})();
```

## API Manual

There is only one API in this library:

```typescript
/**
 * Get last 24 hours OHLCV(open, high, low, close, volume) of all pairs.
 *
 * @param exchange Thee exchange name
 * @returns Last 24 hours OHLCV
 */
export default function getOHLCV(exchange: string): Promise<{ [key: string]: OHLCV }>;
```
