import { Dispatch, SetStateAction } from "react";
import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "context";
import { ADDRESS_WITH_FROM_ADDRESS } from "__mocks__/data";
import { GetAddressResponse } from "types";
import { NavigationBar, NAVIGATION_BAR_TEST_IDS } from "..";

jest.mock(
  "next/link",
  () =>
    // @ts-ignore
    ({ children }) =>
      children
);

describe("NavigationBar", () => {
  it("should render", async () => {
    render(<NavigationBar />);

    expect(
      await screen.findByTestId(NAVIGATION_BAR_TEST_IDS.SIGN_OUT_BUTTON)
    ).toBeInTheDocument();
  });

  it("should call router.push with the home page and reset address context on click of Sign out", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: ADDRESS_WITH_FROM_ADDRESS,
      setAddress: mockSetAddress,
    };

    const mockPush = jest.fn();

    render(
      <AddressContext.Provider value={value}>
        <NavigationBar />
      </AddressContext.Provider>,
      { router: { push: mockPush } }
    );

    const signOutButton = await screen.findByTestId(
      NAVIGATION_BAR_TEST_IDS.SIGN_OUT_BUTTON
    );

    userEvent.click(signOutButton);

    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockSetAddress).toHaveBeenCalledWith(DEFAULT_ADDRESS_VALUE);
  });
});
