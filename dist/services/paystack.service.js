import axios from "axios";
/**
 * Paystack API
 */
export class PaystackService {
    static { this.baseURL = `https://api.paystack.co/`; }
    static { this.config = {}; }
    static get secretKey() {
        return this.config.secretKey;
    }
    /**
     * Set the secret key gotten from your Paystack dashboard
     * @param secretKey
     */
    static setConfig(config) {
        this.config = { ...this.config, ...config };
    }
    static get axiosConfig() {
        return {
            headers: { Authorization: `Bearer ${this.secretKey}` },
        };
    }
    /**
     * Check if an account number is valid.
     * @param data
     * @returns
     */
    static verifyAccountNumber(data) {
        return axios
            .get(this.baseURL +
            "bank/resolve?" +
            Object.entries({
                account_number: data.accountNumber,
                bank_code: data.bankCode,
            })
                .map(([key, val]) => `${key}=${val}`)
                .join("&"), this.axiosConfig)
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
    static createPaystackRecipient(recipient) {
        const data = {
            account_number: recipient.account_number,
            bank_code: recipient.bank_code,
            currency: recipient.currency || this.config.currency,
            name: recipient.name,
            type: recipient.type,
        };
        return axios
            .post(this.baseURL + "transferrecipient", data, this.axiosConfig)
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
    static fetchBanks(query) {
        return axios
            .get(`${this.baseURL}bank?country=${query.country}`, this.axiosConfig)
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
    static transfer(data) {
        return axios
            .post(this.baseURL + "transfer", data, this.axiosConfig)
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
    static async processPayout(data) {
        try {
            if (!data.recipientID || !data.recipientCode)
                if (data.recipient) {
                    const { id, recipient_code } = await PaystackService.createPaystackRecipient(data.recipient);
                    data.recipientCode = recipient_code;
                    data.recipientID = id;
                }
                else
                    throw new Error(`Recipient ID and Code are required`);
            return await this.transfer({
                source: "balance",
                reason: data.reason,
                amount: data.amount * 100,
                recipient: data.recipientCode,
            });
        }
        catch (error) {
            throw error?.message?.error || error;
        }
    }
}
//# sourceMappingURL=paystack.service.js.map