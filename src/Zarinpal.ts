import axios, {
  AxiosInstance,
  AxiosProxyConfig,
  AxiosResponse,
  Method,
} from "axios";
import {
  RejectedZarinpalInvalidCodeResponseError,
  RejectedZarinpalNoCodeResponseError,
  RejectedZarinpalResponseError,
  ZarinpalAuthorityNotPresentError,
} from "./errors";
import {
  CreatedPayment,
  PlainObjectType,
  RequestPayment,
  VerifiedPayment,
  VerifyPayment,
  ZarinpalCreateResponse,
  ZarinpalEndpoints,
  ZarinpalGeneralResponse,
  ZarinpalOptions,
  ZarinpalRequestPayment,
  ZarinpalVerifyPayment,
  ZarinpalVerifyResponse,
} from "./types";
import { ZarinpalErrorCodes } from "./ZarinpalErrorCodes";

/**
 * Zarinpal class to be used for payments.
 */
export class Zarinpal {
  public readonly merchantId: string;
  private readonly endpoints: ZarinpalEndpoints;
  private readonly sandbox: boolean;
  private readonly basicHeaders = {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  };
  private readonly timeout: number;
  private baseAxios: AxiosInstance;

  /**
   * Creates an instance of Zarinpal.
   *
   * @param merchantId MerchantID from Zarinpal (should be 36 characters)
   * @param option Options for Zarinpal
   */
  constructor(merchantId: string, option?: ZarinpalOptions) {
    if (merchantId.length !== 36) {
      throw new Error("Zarinpal merchantId must be 36 characters.");
    }

    this.merchantId = merchantId;
    this.sandbox = option?.sandbox || false;
    this.timeout = option?.timeout || 20000;
    this.baseAxios = this.createAxios(option?.proxy);
    this.endpoints = this.setEndpoints();
  }

  public setProxy(proxy: AxiosProxyConfig) {
    this.baseAxios = this.createAxios(proxy);
  }

  private createAxios(proxy?: AxiosProxyConfig) {
    return axios.create({
      headers: {
        ...this.basicHeaders,
      },
      proxy,
      timeout: this.timeout,
    });
  }

  private setEndpoints(): ZarinpalEndpoints {
    let baseUrl = "https://www.zarinpal.com/";
    if (this.sandbox) {
      baseUrl = "https://sandbox.zarinpal.com/";
    }

    return {
      requestPayment: baseUrl + "pg/rest/WebGate/PaymentRequest.json",
      startPayment: baseUrl + "pg/StartPay/",
      verifyPayment: baseUrl + "pg/rest/WebGate/PaymentVerification.json",
    };
  }

  private async requestZarinpal<
    ZarinpalCustomResponse extends ZarinpalGeneralResponse,
    T extends PlainObjectType
  >(
    url: string,
    method: Method,
    data: T
  ): Promise<AxiosResponse<ZarinpalCustomResponse>> {
    const response = await this.baseAxios.request<ZarinpalCustomResponse>({
      url,
      method,
      data,
    });

    if (response.data.Status === undefined) {
      throw new RejectedZarinpalNoCodeResponseError(
        response.status,
        response.data
      );
    }

    if (response.data.Status < 0) {
      const stringifiedStatus = response.data.Status.toString();
      const error = ZarinpalErrorCodes[stringifiedStatus];

      if (error === undefined) {
        throw new RejectedZarinpalInvalidCodeResponseError(
          response.data.Status,
          response.status,
          response.data
        );
      }

      throw new RejectedZarinpalResponseError(
        response.data.Status,
        error.message,
        response.status,
        response.data
      );
    }

    return response;
  }

  /**
   * Request a payment from Zarinpal
   *
   * @param data Request data
   * @returns
   */
  public async requestPayment(data: RequestPayment): Promise<CreatedPayment> {
    const body: ZarinpalRequestPayment = {
      MerchantID: this.merchantId,
      Amount: data.amount,
      Description: data.description,
      CallbackURL: data.callbackUrl,
      Email: data.contact?.email,
      Mobile: data.contact?.mobile,
    };

    const response = await this.requestZarinpal<
      ZarinpalCreateResponse,
      ZarinpalRequestPayment
    >(this.endpoints.requestPayment, "POST", body);

    if (response.data.Authority === undefined) {
      throw new ZarinpalAuthorityNotPresentError(
        response.data.Status,
        response.status,
        response.data
      );
    }

    return {
      status: response.data.Status,
      authority: response.data.Authority,
      url: this.startPayment(response.data.Authority),
    };
  }

  /**
   * Returns a payment url from Zarinpal authority
   *
   * @param authority Zarinpal authority
   * @returns
   */
  public startPayment(authority: string): string {
    return this.endpoints.startPayment + authority;
  }

  /**
   * Verified a Zarinpal payment
   *
   * @param data Verification data
   * @returns
   */
  public async verifyPayment(data: VerifyPayment): Promise<VerifiedPayment> {
    const body: ZarinpalVerifyPayment = {
      Amount: data.amount,
      Authority: data.authority,
      MerchantID: this.merchantId,
    };

    const response = await this.requestZarinpal<
      ZarinpalVerifyResponse,
      ZarinpalVerifyPayment
    >(this.endpoints.verifyPayment, "POST", body);

    return {
      status: response.data.Status,
      refId: response.data.RefID,
    };
  }
}
