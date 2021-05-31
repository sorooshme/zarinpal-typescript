/**
 * All errors should extends this class.
 */
export abstract class BaseZarinpalError extends Error {
  /**
   *
   * @param name Name of the error
   * @param message Message of the error
   */
  constructor(public name: string, message: string) {
    super(message);
  }
}
