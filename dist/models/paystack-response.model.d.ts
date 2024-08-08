/**Paystack's generic response structure */
export interface PSResponse<T> {
    /**Status of the response */
    status: boolean;
    /**Message in the response */
    message: string;
    /**Data in the response */
    data: T;
}
