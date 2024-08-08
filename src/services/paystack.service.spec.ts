import { PSCountry } from "../enums/country.enum";
import { PaystackService } from "./paystack.service";

describe("Fetch banks", () => {
  const country = PSCountry.nigeria;
  const banks = PaystackService.fetchBanks({
    country,
  });
  test("received an array", async () => {
    expect(await banks).toBeInstanceOf(Array);
  });
  test("country in the response matches request", async () => {
    const _banks = await banks;
    for (const item of _banks) {
      expect(item.country).toBeDefined();
      expect(item.country.toLowerCase()).toEqual(country.toLowerCase());
    }
  });
});
