/**
 * Account number validation DTO
 */
export interface AccountNumberValidation {
    /**Account number to check */
    accountNumber: string;
    /**Bank code of the account number */
    bankCode: string;
}
