import { Dispatch, SetStateAction } from "react";
import { render, screen } from "test-utils";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "context";
import { ADDRESS_WITH_FROM_ADDRESS } from "__mocks__/data";
import { GetAddressResponse } from "types";

import { SendPage, SEND_PAGE_TEST_IDS } from "..";

jest.mock(
  "next/link",
  () =>
    // @ts-ignore
    ({ children }) =>
      children
);

describe("SendPage", () => {
  it("should render with the balance amount", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: ADDRESS_WITH_FROM_ADDRESS,
      setAddress: mockSetAddress,
    };

    render(
      <AddressContext.Provider value={value}>
        <SendPage
          balance={ADDRESS_WITH_FROM_ADDRESS.balance}
          transactions={ADDRESS_WITH_FROM_ADDRESS.transactions}
        />
      </AddressContext.Provider>,
      { router: { query: { address: "Bob" } } }
    );

    expect(
      await screen.findByTestId(SEND_PAGE_TEST_IDS.BALANCE_HEADING)
    ).toHaveTextContent("Jobcoin Balance");
    expect(
      await screen.findByTestId(SEND_PAGE_TEST_IDS.BALANCE_AMOUNT)
    ).toHaveTextContent("49.5");
    expect(
      await screen.findByTestId(SEND_PAGE_TEST_IDS.SEND_COINS_HEADING)
    ).toHaveTextContent("Send Jobcoins");
  });

  // if I had the time to set up API mocking, I would test the API interactions in the following test cases
  it("should make an SSR get API call on hard refresh", () => {});
  it("should make an client side API call on soft refresh if an address param is present in the URL and there is no address in context", () => {});
});
