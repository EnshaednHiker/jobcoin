export interface Transaction {
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

export interface GetAddressResponse {
  balance: string;
  transactions: Transaction[];
}

export interface PostSendCoinResponse {
  status?: "OK";
  error?: "Insufficient Funds";
}
