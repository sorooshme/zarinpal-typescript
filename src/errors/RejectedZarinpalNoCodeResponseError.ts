import { ZarinpalGeneralResponse } from "../types";
import { BaseZarinpalError } from "./BaseZarinpalError";

/**
 * RejectedZarinpalNoCodeResponseError
 */
export class RejectedZarinpalNoCodeResponseError extends BaseZarinpalError {
  /**
   *
   * @param statusCode Response status
   * @param body Response body
   */
  constructor(public statusCode: number, public body: ZarinpalGeneralResponse) {
    super(
      "RejectedZarinpalNoCodeResponseError",
      `Rejected Response from Zarinpal without errorCode but with statusCode of ${statusCode} was received. .body can be used to see the full body.`
    );
  }
}
