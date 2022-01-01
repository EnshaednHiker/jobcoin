import ky from "ky-universal";

import { DEFAULT_ADDRESS_VALUE } from "./context";
import { GetAddressResponse, PostSendCoinResponse } from "./types";
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

//   import fetch from "node-fetch";

// export const getAddress = async (address: string) => {
//   const response = await fetch(
//     `http://jobcoin.gemini.com/graph-sprinkler/api/addresses/${address}`
//   );

//   const data = await response.json();
//   return data as GetAddressResponse | undefined;
// };

// export const postSendCoinsToAddress = async (body: {
//   toAddress: string;
//   /**
//    * needs to be a number in string
//    */
//   amount: string;
//   fromAddress: string;
// }): Promise<PostSendCoinResponse | undefined> => {
//   // const formData = new FormData();
//   // formData.append("toAddress", toAddress);
//   // formData.append("amount", amount);
//   // formData.append("fromAddress", fromAddress);

//   // return await ky
//   //   .post(`http://jobcoin.gemini.com/graph-sprinkler/api/transactions`, {
//   //     body: formData,
//   //   })
//   //   .json();

//   const response = await fetch(
//     "http://jobcoin.gemini.com/graph-sprinkler/api/transactions",
//     {
//       method: "post",
//       body: JSON.stringify(body),
//       headers: { "Content-Type": "application/json" },
//     }
//   );
//   const data = await response.json();
//   return data as PostSendCoinResponse | undefined;
// };
