Simple Zarinpal package written in TypeScript.

# Installation

```npm
npm i zarinpal-typescript
```

Usage:

```typescript
import { Zarinpal } from 'zarinpal-typescript';

// Sandbox is for development
const zp = new Zarinpal('my-Merchant-Id-Here', { sandbox: true });

(async () => {
  // Get Authority
  const authority = await zp.requestPayment({
    amount: 1000,
    callbackUrl: 'https://myCallbackUrl.com',
    description: 'my Description',
  });
  // Get Payment Url
  const paymentUrl = zp.startPayment(authority);
  // Verify Payment
  const refId = await zp.verifyPayment({ amount: 1000, authority });
})();
```
