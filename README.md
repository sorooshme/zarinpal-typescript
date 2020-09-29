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
  const request = await zp.requestPayment({
    amount: 1000,
    callbackUrl: 'https://myCallbackUrl.com',
    description: 'my Description',
  });

  // Check for errors
  if (request.errorMessage) {
    throw new Error(request.errorMessage);
  }

  // Get Payment Url
  const paymentUrl = zp.startPayment(authority);

  // Verify Payment
  const verify = await zp.verifyPayment({ amount: 1000, authority });

  // Check for errors
  if (verify.errorMessage) {
    throw new Error(verify.errorMessage);
  }
})();
```
