import { ZarinpalGeneralResponse } from "../types";
import { BaseZarinpalError } from "./BaseZarinpalError";

/**
 * RejectedZarinpalInvalidCodeResponseError
 */
export class RejectedZarinpalInvalidCodeResponseError extends BaseZarinpalError {
  /**
   *
   * @param zarinpalStatus Zarinpal status code
   * @param statusCode Response status code
   * @param body Response body
   */
  constructor(
    public zarinpalStatus: number,
    public statusCode: number,
    public body: ZarinpalGeneralResponse
  ) {
    super(
      "RejectedZarinpalInvalidCodeResponseError",
      `Rejected Response from Zarinpal with invalid zarinpalStatus of ${zarinpalStatus} and statusCode of ${statusCode} was received. .body can be used to see the full body.`
    );
  }
}
