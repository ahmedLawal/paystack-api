/**Bank*/
export interface PSBank {
    /**The name of the bank */
    name: string;
    /**Slug identifier */
    slug: string;
    /**Bank code */
    code: string;
    /**Full bank code */
    longcode: string;
    /**Gateway */
    gateway?: any;
    /**Pay with bank */
    pay_with_bank: boolean;
    /**Active */
    active: boolean;
    /**Is deleted */
    is_deleted: boolean;
    /**Country */
    country: string;
    /**Currency */
    currency: string;
    /**Type */
    type: string;
    /**Id */
    id: number;
    /**Created at */
    createdAt: string;
    /**Updated at */
    updatedAt: string;
}
