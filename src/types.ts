import { AxiosProxyConfig } from "axios";

/**
 * Created Payment from Zarinpal
 */
export interface CreatedPayment {
  /**
   * Zarinpal status code
   */
  status: number;
  /**
   * Zarinpal authority
   */
  authority: string;
  /**
   * Zarinpal url to payment
   */
  url: string;
}

export interface PlainObjectType {
  [key: string]: any;
}

/**
 * Zarinpal General Response
 * @internal
 */
export interface ZarinpalGeneralResponse {
  /**
   * Zarinpal status code
   */
  Status: number;
}

/**
 * Zarinpal create response
 */
export interface ZarinpalCreateResponse extends ZarinpalGeneralResponse {
  /**
   * Zarinpal authority
   */
  Authority?: string;
}

/**
 * Zarinpal verify response
 */
export interface ZarinpalVerifyResponse extends ZarinpalGeneralResponse {
  /**
   * Zarinpal ref id
   */
  RefID?: number;
}

export interface ZarinpalAllErrorCodes {
  [key: string]: ZarinpalErrorCode;
}

export interface ZarinpalErrorCode {
  message: string;
}

/**
 * Request payment from Zarinpal
 */
export interface RequestPayment {
  /**
   * Amount of the transaction (in toman)
   */
  amount: number;
  /**
   * Description of the transaction
   */
  description: string;
  /**
   * Callback URL to be redirected after payment
   */
  callbackUrl: string;
  /**
   * Contact information of the payer
   */
  contact?: {
    /**
     * Email of the payer
     */
    email?: string;
    /**
     * Mobile of the payer
     */
    mobile?: string;
  };
}

/**
 * Verified payment from Zarinpal
 */
export interface VerifiedPayment {
  /**
   * Zarinpal status code
   */
  status: number;
  /**
   * Zarinpal ref id
   */
  refId?: number;
}

/**
 * Verify a Zarinpal transaction
 */
export interface VerifyPayment {
  /**
   * Authority of the transaction
   */
  authority: string;
  /**
   * Amount of the transaction (in toman)
   */
  amount: number;
}

/**
 * Zarinpal options
 */
export interface ZarinpalOptions {
  /**
   * Whether environment is sandbox or not
   */
  sandbox?: boolean;
  /**
   * Timeout for requests in miliseconds
   */
  timeout?: number;
  /**
   * Proxy to use for requests
   */
  proxy?: AxiosProxyConfig;
}

/**
 * Used internally for requests.
 * @internal
 */
export interface ZarinpalRequestPayment {
  MerchantID: string;
  Amount: number;
  Description: string;
  CallbackURL: string;
  Email?: string;
  Mobile?: string;
}

/**
 * Used internally for requests.
 * @internal
 */
export interface ZarinpalVerifyPayment {
  MerchantID: string;
  Authority: string;
  Amount: number;
}

/**
 * Used internally for requests.
 * @internal
 */
export interface ZarinpalEndpoints {
  requestPayment: string;
  startPayment: string;
  verifyPayment: string;
}
