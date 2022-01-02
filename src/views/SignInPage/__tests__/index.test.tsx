import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";

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

    const addressTextField = await screen.findByRole("textbox");

    userEvent.type(addressTextField, "Bob");

    expect(
      await screen.findByTestId(SIGN_IN_PAGE_TEST_IDS.SIGN_IN_BUTTON)
    ).not.toHaveAttribute("disabled", "");
  });

  // given more time, I would implement a way to mock out my API calls. Without that functionality, I cannot test the rest of these test cases
  it("should route to send-page on click of sign in button with valid address", async () => {});

  it("should not route to send-page on click of sign in button with invalid address", async () => {});
});
