import { PSCreateRecipient } from "./recipient.model";
/**
 * Payout processing payload
 */
export interface ProcessPayout {
  /**Recipient code generated by Paystack during recipient registration */
  recipientCode?: string;
  /**Recipient ID generated by Paystack during recipient registration */
  recipientID?: number;
  /**Reason for the payout */
  reason: string;
  /**Amount to be transferred */
  amount: number;
  /**If recipientCode is not passed, the data here will be used to register a new recipient and trigger the payout */
  recipient?: PSCreateRecipient;
}
/**Response of a payout request */
export interface PSTransferResponse {
    /**Amount */
    amount: number;
    /**Created at */
    createdAt: string;
    /**Currency */
    currency: string;
    /**Domain */
    domain: string;
    /**Id */
    id: number;
    /**Integration */
    integration: number;
    /**Reason */
    reason: string;
    /**Recipient */
    recipient: number;
    /**Source */
    source: string;
    /**Status */
    status: string;
    /**Transfer code */
    transfer_code: string;
    /**Updated at */
    updatedAt: string;
}

