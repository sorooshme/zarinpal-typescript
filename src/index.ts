import fetch from 'node-fetch';

export interface IZarinpalOption {
  sandbox?: boolean;
}

export interface IZarinpalEndpoints {
  requestPayment: string;
  startPayment: string;
  verifyPayment: string;
}

export type TAllowedMethods = 'POST';

export interface IZarinpalRequestPaymentResponse {
  Status: number;
  Authority: string;
  errorMessage?: string;
}

export interface IZarinpalVerifyPaymentResponse {
  Status: number;
  RefID: number;
  errorMessage?: string;
}

export interface IZarinpalGeneralResponse {
  Status: number;
  [key: string]: any;
}

export interface IZarinpalRequestPayment {
  amount: number;
  description: string;
  callbackUrl: string;
  email?: string;
  mobile?: string;
}

export interface IZarinpalVerifyPayment {
  authority: string;
  amount: number;
}

export class Zarinpal {
  public readonly merchantId: string;
  private readonly endpoints: IZarinpalEndpoints;
  private readonly sandbox: boolean;
  private readonly basicHeaders = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };

  constructor(merchantId: string, option: IZarinpalOption = {}) {
    if (merchantId.length !== 36) {
      throw new Error('Zarinpal merchantId must be 36 characters.');
    }

    this.merchantId = merchantId;
    this.sandbox = option.sandbox || false;
    this.endpoints = this.setEndpoints();
  }

  private setEndpoints = (): IZarinpalEndpoints => {
    let baseUrl = 'https://www.zarinpal.com/';
    if (this.sandbox) {
      baseUrl = 'https://sandbox.zarinpal.com/';
    }

    return {
      requestPayment: baseUrl + 'pg/rest/WebGate/PaymentRequest.json',
      startPayment: baseUrl + 'pg/StartPay/',
      verifyPayment: baseUrl + 'pg/rest/WebGate/PaymentVerification.json',
    };
  };

  private getErrorMessage(code: number | undefined): string {
    let message = 'Zarinpal is down.';
    switch (code) {
      case -1:
        message = 'Insufficient information';
        break;
      case -2:
        message = 'IP or Merchant Code is not correct';
        break;
      case -3:
        message = 'Amount should be greater than 1000';
        break;
      case -4:
        message = 'Insufficient';
        break;
      case -11:
        message = "Requested response didn't find";
        break;
      case -21:
        message = 'No financial action found for this transaction';
        break;
      case -22:
        message = 'Unsuccessful transaction';
        break;
      case -33:
        message = 'Transaction price is not equal to payed amount';
        break;
      case -54:
        message = 'The request had archived';
        break;
    }

    return message;
  }

  private requestZarinpal = async (
    url: string,
    method: TAllowedMethods,
    body: any
  ): Promise<IZarinpalGeneralResponse> => {
    const res = await fetch(url, {
      method,
      headers: this.basicHeaders,
      body: JSON.stringify(body),
    });

    const resBody: IZarinpalGeneralResponse = await res.json();

    if (!res.ok) {
      throw new Error('Zarinpal response was not ok.');
    }

    if (resBody.Status < 0) {
      const errorMessage = this.getErrorMessage(resBody.Status);
      resBody.errorMessage = errorMessage;
    }

    return resBody;
  };

  public requestPayment = async (data: IZarinpalRequestPayment) => {
    const response = <IZarinpalRequestPaymentResponse>(
      await this.requestZarinpal(this.endpoints.requestPayment, 'POST', {
        MerchantID: this.merchantId,
        Amount: data.amount,
        Description: data.description,
        CallbackURL: data.callbackUrl,
        Email: data.email,
        Mobile: data.mobile,
      })
    );

    return response;
  };

  public startPayment = (authority: string) => {
    return this.endpoints.startPayment + authority;
  };

  public verifyPayment = async (data: IZarinpalVerifyPayment) => {
    const response = <IZarinpalVerifyPaymentResponse>await this.requestZarinpal(
      this.endpoints.verifyPayment,
      'POST',
      {
        MerchantID: this.merchantId,
        Authority: data.authority,
        Amount: data.amount,
      }
    );

    return response;
  };
}
