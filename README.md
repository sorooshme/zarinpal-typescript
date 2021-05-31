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
import { Zarinpal } from "zarinpal-typescript";

const zp = new Zarinpal("merchant-code", {
  /**
   * Sandbox is for development only
   * And should be turned off in production.
   */
  sandbox: true,
});
```

## Creating invoice

```typescript
// Create invoice
const createdPayment = await zp.requestPayment({
  amount: 1000, // Toman
  callbackUrl: "https://example.com/my-call-back-url?custom-param=value",
  description: "Invoice description", // This is required!
});

// Redirect user to the createdPayment.url
```

## Verifying the payment (callback)

```typescript
const amount = 1000;
const authority = "previously-created-authority";

const verifiedPayment = await zp.verifyPayment({ amount, authority });
```
