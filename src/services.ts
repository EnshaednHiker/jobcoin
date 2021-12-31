import ky from "ky-universal";

import { AddressResponse } from "./types";
export const getAddress = async (
  address: string
): Promise<AddressResponse | undefined> =>
  await ky
    .get(`http://jobcoin.gemini.com/graph-sprinkler/api/addresses/${address}`)
    .json();
