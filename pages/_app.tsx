import type { AppProps } from "next/app";
import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "normalize.css";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "../components/context";
import { AddressResponse } from "../components/types";
function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState<AddressResponse>(
    DEFAULT_ADDRESS_VALUE
  );

  const value = { address, setAddress };
  return (
    <AddressContext.Provider value={value}>
      <Component {...pageProps} />
    </AddressContext.Provider>
  );
}

export default MyApp;
