import { ZarinpalGeneralResponse } from "../types";
import { BaseZarinpalError } from "./BaseZarinpalError";

/**
 * RejectedZarinpalResponseError
 */
export class RejectedZarinpalResponseError extends BaseZarinpalError {
  /**
   *
   * @param zarinpalStatus Zarinpal status code
   * @param description Zarinpal error description
   * @param statusCode Response status
   * @param body Response body
   */
  constructor(
    public zarinpalStatus: number,
    public description: string,
    public statusCode: number,
    public body: ZarinpalGeneralResponse
  ) {
    super(
      "RejectedZarinpalResponseError",
      `Rejected Response from Zarinpal with zarinpalStatus of ${zarinpalStatus} and description of '${description}' and statusCode of ${statusCode} was received. .body can be used to see the full body.`
    );
  }
}
