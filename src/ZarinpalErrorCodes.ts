import { ZarinpalAllErrorCodes } from "./types";

export const ZarinpalErrorCodes: ZarinpalAllErrorCodes = {
  "-9": {
    message: "Validation error",
  },

  "-10": {
    message: "Terminal is not valid, please check merchant_id or ip address.",
  },
  "-11": {
    message: "Terminal is not active, please contact our support team.",
  },
  "-12": { message: "To many attempts, please try again later." },
  "-15": {
    message: "Terminal user is suspend : (please contact our support team).",
  },
  "-16": {
    message:
      "Terminal user level is not valid : ( please contact our support team).",
  },
  "-30": { message: "Terminal do not allow to accept floating wages." },
  "-31": {
    message:
      "Terminal do not allow to accept wages, please add default bank account in panel.",
  },
  "-32": {
    message:
      "Wages is not valid, Total wages(floating) has been overload max amount.",
  },
  "-33": { message: "Wages floating is not valid." },
  "-34": {
    message:
      "Wages is not valid, Total wages(fixed) has been overload max amount.",
  },
  "-35": {
    message:
      "Wages is not valid, Total wages(floating) has been reached the limit in max parts.",
  },
  "-40": { message: "Invalid extra params, expire_in is not valid." },
  "-50": { message: "Session is not valid, amounts values is not the same." },
  "-51": { message: "Session is not valid, session is not active paid try." },
  "-52": { message: "Oops!!, please contact our support team" },
  "-53": { message: "Session is not this merchant_id session" },
  "-54": { message: "Invalid authority." },
};
