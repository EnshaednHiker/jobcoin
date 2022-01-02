import { Dispatch, SetStateAction } from "react";
import { render, screen } from "test-utils";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "context";
import { ADDRESS_WITH_FROM_ADDRESS } from "__mocks__/data";
import { GetAddressResponse } from "types";
import { HistoryChart, HISTORY_CHART_TEST_IDS } from "..";

describe("HistoryChart", () => {
  it("should not render the chart if no address with transactions passed in", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: DEFAULT_ADDRESS_VALUE,
      setAddress: mockSetAddress,
    };

    render(
      <AddressContext.Provider value={value}>
        <HistoryChart />
      </AddressContext.Provider>,
      { router: { query: { address: "Bob" } } }
    );

    expect(
      await screen.findByText("No Jobcoin Transaction History")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(HISTORY_CHART_TEST_IDS.CHART)
    ).not.toBeInTheDocument();
  });

  it("should not render the chart if no address name in the url", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: DEFAULT_ADDRESS_VALUE,
      setAddress: mockSetAddress,
    };

    render(
      <AddressContext.Provider value={value}>
        <HistoryChart />
      </AddressContext.Provider>
    );

    expect(
      await screen.findByText("No Jobcoin Transaction History")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(HISTORY_CHART_TEST_IDS.CHART)
    ).not.toBeInTheDocument();
  });

  it("should render the chart if passed an address with transactions", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: ADDRESS_WITH_FROM_ADDRESS,
      setAddress: mockSetAddress,
    };

    render(
      <AddressContext.Provider value={value}>
        <HistoryChart />
      </AddressContext.Provider>,
      { router: { query: { address: "Bob" } } }
    );

    expect(
      await screen.findByTestId(HISTORY_CHART_TEST_IDS.CHART)
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Jobcoin Transaction History")
    ).toBeInTheDocument();
  });
});
