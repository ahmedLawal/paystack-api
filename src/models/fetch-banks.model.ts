import { PSCountry } from "../enums/country.enum";

/**Payload for searching for banks */
export interface PSFetchBanksQuery {
  /**The country to fetch banks from
   *  @default Nigeria {@link PSCountry.nigeria} */
  country: PSCountry;
}
