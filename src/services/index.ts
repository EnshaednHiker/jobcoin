import ky from "ky-universal";

import { GetAddressResponse, PostSendCoinResponse } from "types";
export const getAddress = async (
  address: string
): Promise<GetAddressResponse | undefined> =>
  await ky
    .get(`http://jobcoin.gemini.com/graph-sprinkler/api/addresses/${address}`)
    .json();

export const postSendCoinsToAddress = async ({
  toAddress,
  amount,
  fromAddress,
}: {
  toAddress: string;
  /**
   * needs to be a number in string
   */
  amount: string;
  fromAddress: string;
}): Promise<PostSendCoinResponse | undefined> => {
  const formData = new FormData();
  formData.append("toAddress", toAddress);
  formData.append("amount", amount);
  formData.append("fromAddress", fromAddress);

  return await ky
    .post(`http://jobcoin.gemini.com/graph-sprinkler/api/transactions`, {
      body: formData,
    })
    .json();
};

export const doesAddressExist = (address: GetAddressResponse) =>
  address.balance !== "0" && address.transactions.length > 0;
