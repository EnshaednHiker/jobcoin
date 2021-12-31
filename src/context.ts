import { createContext, Dispatch, SetStateAction } from "react";

import { AddressResponse } from "./types";

export const DEFAULT_ADDRESS_VALUE = {
  balance: "0",
  transactions: [],
};

export const AddressContext = createContext<{
  address: AddressResponse;
  setAddress: Dispatch<SetStateAction<AddressResponse>>;
}>({ address: DEFAULT_ADDRESS_VALUE, setAddress: () => undefined });
