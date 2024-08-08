import axios, { AxiosRequestConfig } from "axios";
import { ICreatePaystackRecipientResponse } from "../models/recipient.model";
import { PSBank } from "../models/bank.model";
import { PSAccountValidationResponse } from "../models/accountValidationResp.model";
import { PSTransferResponse } from "../models/payout.model";
import { AccountNumberValidation } from "../models/account-number-validation.model";
import { PSCreateRecipient } from "../models/recipient.model";
import { ProcessPayout } from "../models/payout.model";
import { PSFetchBanksQuery } from "../models/fetch-banks.model";
import { PSResponse } from "src/models/paystack-response.model";
import { PSConfig } from "../models/config.model";

/**
 * Paystack API
 */
export class PaystackService {
  private static baseURL = `https://api.paystack.co/`;
  private static config: PSConfig = {};
  private static get secretKey() {
    return this.config.secretKey;
  }

  /**
   * Set the secret key gotten from your Paystack dashboard
   * @param secretKey
   */
  static setConfig(config: PSConfig) {
    this.config = { ...this.config, ...config };
  }
  private static get axiosConfig(): AxiosRequestConfig {
    return {
      headers: { Authorization: `Bearer ${this.secretKey}` },
    };
  }

  /**
   * Check if an account number is valid.
   * @param data
   * @returns
   */
  static verifyAccountNumber(data: AccountNumberValidation) {
    return axios
      .get<PSResponse<PSAccountValidationResponse>>(
        this.baseURL +
          "bank/resolve?" +
          Object.entries({
            account_number: data.accountNumber,
            bank_code: data.bankCode,
          })
            .map(([key, val]) => `${key}=${val}`)
            .join("&"),

        this.axiosConfig
      )
      .then((r) => r.data.data)
      .then((r) => ({
        accountName: r.account_name,
        accountNumber: r.account_number,
      }))
      .catch((e) => {
        // debugger;
        throw e.response.data.message;
      });
  }

  /**
   * Register a payout recipient on Paystack
   * @param recipient
   * @returns
   */
  static createPaystackRecipient(recipient: PSCreateRecipient) {
    const data: {
      type: string;
      name: string;
      account_number: string;
      bank_code: string;
      currency: string;
    } = {
      account_number: recipient.account_number,
      bank_code: recipient.bank_code,
      currency: recipient.currency || this.config.currency!,
      name: recipient.name,
      type: recipient.type,
    };
    return axios
      .post<PSResponse<ICreatePaystackRecipientResponse>>(
        this.baseURL + "transferrecipient",
        data,
        this.axiosConfig
      )
      .then((r) => r.data.data)
      .catch((e) => {
        // debugger;
        throw e.response.data.message;
      });
  }

  /**
   * Fetch banks supported.
   * @param query Listing filter query
   * @returns
   */
  static fetchBanks(query: PSFetchBanksQuery) {
    return axios
      .get<PSResponse<PSBank[]>>(
        `${this.baseURL}bank?country=${query.country}`,
        this.axiosConfig
      )
      .then((r) => r.data.data.sort((a, b) => a.name.localeCompare(b.name)))
      .catch((e) => {
        // debugger;
        throw e.response.data.message;
      });
  }

  /**
   * Transfer function
   * @param data
   * @returns
   */
  private static transfer(data: {
    source: string;
    reason: string;
    amount: number;
    recipient: string;
  }) {
    return axios
      .post<PSResponse<PSTransferResponse>>(
        this.baseURL + "transfer",
        data,
        this.axiosConfig
      )
      .then((r) => r.data)
      .catch((e) => {
        // debugger;
        throw e.response.data.message;
      });
  }

  /**
   * Process payout to recipient
   * @param data
   */
  static async processPayout(data: ProcessPayout) {
    try {
      if (!data.recipientID || !data.recipientCode)
        if (data.recipient) {
          const { id, recipient_code } =
            await PaystackService.createPaystackRecipient(data.recipient);
          data.recipientCode = recipient_code;
          data.recipientID = id;
        } else throw new Error(`Recipient ID and Code are required`);

      return await this.transfer({
        source: "balance",
        reason: data.reason,
        amount: data.amount * 100,
        recipient: data.recipientCode,
      });
    } catch (error) {
      throw (error as any)?.message?.error || error;
    }
  }
}
