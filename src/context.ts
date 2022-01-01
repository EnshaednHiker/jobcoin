import { createContext, Dispatch, SetStateAction } from "react";

import { GetAddressResponse } from "./types";

export const DEFAULT_ADDRESS_VALUE = {
  balance: "0",
  transactions: [],
};

export const AddressContext = createContext<{
  address: GetAddressResponse;
  setAddress: Dispatch<SetStateAction<GetAddressResponse>>;
}>({ address: DEFAULT_ADDRESS_VALUE, setAddress: () => undefined });
