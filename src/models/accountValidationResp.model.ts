/**The result of an account validation check */
export interface PSAccountValidationResponse {
  /**The account number checked */
  account_number: string;
  /**The account name retrieved during the check */
  account_name: string;
}
