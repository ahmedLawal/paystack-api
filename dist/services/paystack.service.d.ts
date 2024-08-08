import { ICreatePaystackRecipientResponse } from "../models/recipient.model";
import { PSBank } from "../models/bank.model";
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
export declare class PaystackService {
    private static baseURL;
    private static config;
    private static get secretKey();
    /**
     * Set the secret key gotten from your Paystack dashboard
     * @param secretKey
     */
    static setConfig(config: PSConfig): void;
    private static get axiosConfig();
    /**
     * Check if an account number is valid.
     * @param data
     * @returns
     */
    static verifyAccountNumber(data: AccountNumberValidation): Promise<{
        accountName: string;
        accountNumber: string;
    }>;
    /**
     * Register a payout recipient on Paystack
     * @param recipient
     * @returns
     */
    static createPaystackRecipient(recipient: PSCreateRecipient): Promise<ICreatePaystackRecipientResponse>;
    /**
     * Fetch banks supported.
     * @param query Listing filter query
     * @returns
     */
    static fetchBanks(query: PSFetchBanksQuery): Promise<PSBank[]>;
    /**
     * Transfer function
     * @param data
     * @returns
     */
    private static transfer;
    /**
     * Process payout to recipient
     * @param data
     */
    static processPayout(data: ProcessPayout): Promise<PSResponse<PSTransferResponse>>;
}
