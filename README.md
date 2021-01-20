Simple Zarinpal package written in TypeScript.

# Installation

```bash
# Using npm
npm i zarinpal-typescript

# Using yarn
yarn add zarinpal-typescript
```

## Configuration

```typescript
import { Zarinpal } from 'zarinpal-typescript';

const zp = new Zarinpal('merchant-code', {
    /**
     * Sandbox is for development only
     * And should be turned off in production.
     */
    sandbox: true
});
```

## Creating invoice

```typescript
// Create invoice
const invoiceResponse = await zp.requestPayment({
    amount: 1000, // Toman
    callbackUrl: 'https://example.com/my-call-back-url?custom-param=value',
    description: 'Invoice description', // This is required!
});

// Check for any errors
if (invoiceResponse.errorMessage) throw new Error(invoiceResponse.errorMessage);

// Get payment url
const paymentUrl = zp.startPayment(invoiceResponse.Authority);

// Redirect user to the paymentUrl
```

## Verifying the payment (callback)

```typescript
const amount = 1000;
const authority = 'invoice-authority';

const verificationResponse = await zp.verifyPayment({ amount: amount, authority: authority });

// Check for errors
if (verificationResponse.errorMessage) throw new Error(verificationResponse.errorMessage);

switch(verificationResponse.Status) {
    case 100:
        // Invoice paid
        break;
    case 101:
        // Invoice is already paid.
        break;
}
```
