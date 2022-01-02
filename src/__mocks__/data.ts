import { GetAddressResponse } from "types";

export const ADDRESS_WITHOUT_FROM_ADDRESS = {
  balance: "49.5",
  transactions: [
    { toAddress: "Bob", amount: "49.5", timestamp: "2021-12-17T00:52:39.092Z" },
  ],
} as never as GetAddressResponse;

export const ADDRESS_WITH_FROM_ADDRESS = {
  balance: "49.5",
  transactions: [
    {
      toAddress: "Bob",
      fromAddress: "Alice",
      amount: "49.5",
      timestamp: "2021-12-17T00:52:39.092Z",
    },
  ],
} as never as GetAddressResponse;

export const NO_ADDRESS_FOUND = {
  balance: "0",
  transactions: [],
} as never as GetAddressResponse;

export const SUCCESSFULL_POST = {
  status: "OK",
} as const;

export const INSUFFICIENT_FUNDS_POST = {
  error: "Insufficient Funds",
} as const;
