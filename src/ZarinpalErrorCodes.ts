import { ZarinpalAllErrorCodes } from "./types";

export const ZarinpalErrorCodes: ZarinpalAllErrorCodes = {
  "-1": {
    message: "Insufficient information",
  },
  "-2": {
    message: "IP or Merchant Code is not correct",
  },
  "-3": {
    message: "Amount should be greater than 1000",
  },
  "-4": {
    message: "Insufficient",
  },
  "-11": {
    message: "Requested response didn't find",
  },
  "-21": {
    message: "No financial action found for this transaction",
  },
  "-22": {
    message: "Unsuccessful transaction",
  },
  "-33": {
    message: "Transaction price is not equal to payed amount",
  },
  "-54": {
    message: "The request had archived",
  },
};
