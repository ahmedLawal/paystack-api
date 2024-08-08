/**
 * Payload for registering a new payout recipient
 */
export interface PSCreateRecipient {
    /**Account number of the recipient */
    account_number: string;
    /**Bank code of the recipient */
    bank_code: string;
    /**Currency of the recipient's bank account */
    currency: string;
    /**Name of the recipient*/
    name: string;
    /**Type of bank account */
    type: string;
}
/**The response of the recipient registration */
export interface ICreatePaystackRecipientResponse {
    /**Active */
    active: boolean;
    /**Created at */
    createdAt: string;
    /**Currency */
    currency: string;
    /**Details */
    details: Details;
    /**Domain */
    domain: string;
    /**Id */
    id: number;
    /**Integration */
    integration: number;
    /**Is deleted */
    is_deleted: boolean;
    /**Name */
    name: string;
    /**Recipient code */
    recipient_code: string;
    /**Type */
    type: string;
    /**Updated at */
    updatedAt: string;
}
/**Details of the created recipient */
interface Details {
    /**Authorization code */
    authorization_code?: string;
    /**Account number */
    account_number: string;
    /**Account name */
    account_name: string;
    /**Bank code */
    bank_code: string;
    /**Bank name */
    bank_name: string;
}
export {};
