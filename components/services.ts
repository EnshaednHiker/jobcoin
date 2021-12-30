import ky from "ky-universal";

interface Transaction {
  amount: string;
  /**
   * in the event the recipient received Jobcoin from the management system directly, there is no fromAddress
   */
  fromAddress?: string;

  /**
   * string is in the the form of UTC time format
   */
  timestamp: string;
  toAddress: string;
}

interface AddressResponse {
  balance: string;
  transactions: Transaction[];
}

export const getAddress = async (
  address: string
): Promise<AddressResponse | undefined> =>
  await ky
    .get(`http://jobcoin.gemini.com/graph-sprinkler/api/addresses/${address}`)
    .json();
