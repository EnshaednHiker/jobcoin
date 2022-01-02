import { fireEvent, render, screen } from "test-utils";

import { SignInPage, SIGN_IN_PAGE_TEST_IDS } from "..";

describe("SignInPage", () => {
  it("should render", async () => {
    render(<SignInPage />);

    expect(
      await screen.findByTestId(SIGN_IN_PAGE_TEST_IDS.HEADING)
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(SIGN_IN_PAGE_TEST_IDS.ADDRESS_TEXT_FIELD)
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(SIGN_IN_PAGE_TEST_IDS.SIGN_IN_BUTTON)
    ).toBeInTheDocument();
  });

  it("should disable the sign in button with no text in the TextField", async () => {
    render(<SignInPage />);

    expect(
      await screen.findByTestId(SIGN_IN_PAGE_TEST_IDS.SIGN_IN_BUTTON)
    ).toHaveAttribute("disabled", "");
  });

  it("should enable the sign in button with text in the TextField", async () => {
    render(<SignInPage />);

    const addressTextField = await screen.findByTestId(
      SIGN_IN_PAGE_TEST_IDS.ADDRESS_TEXT_FIELD
    );

    // fireEvent(addressTextField, "typ");

    expect(
      await screen.findByTestId(SIGN_IN_PAGE_TEST_IDS.SIGN_IN_BUTTON)
    ).toHaveAttribute("disabled", "false");
  });
});
