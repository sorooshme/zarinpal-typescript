import { ZarinpalGeneralResponse } from "../types";
import { BaseZarinpalError } from "./BaseZarinpalError";

/**
 * ZarinpalAuthorityNotPresentError
 */
export class ZarinpalAuthorityNotPresentError extends BaseZarinpalError {
  /**
   *
   * @param zarinpalStatus Zarinpal status code
   * @param statusCode Response status
   * @param body Response body
   */
  constructor(
    public zarinpalStatus: number,
    public statusCode: number,
    public body: ZarinpalGeneralResponse
  ) {
    super(
      "ZarinpalAuthorityNotPresentError",
      `Response from zarinpal with zarinpalStatus of ${zarinpalStatus} and statusCode of ${statusCode} does not have valid authority. .body can be used to see the full body.`
    );
  }
}
