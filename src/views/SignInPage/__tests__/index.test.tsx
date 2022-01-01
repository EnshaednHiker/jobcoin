import { screen } from "@testing-library/react";
import { render } from "../../../test-utils";

import { SignInPage, SIGN_IN_PAGE_TEST_IDS } from "..";

describe("SignInPage", () => {
  it("should render", () => {
    render(<SignInPage />);

    expect(
      screen.getByTestId(SIGN_IN_PAGE_TEST_IDS.HEADING)
    ).toBeInTheDocument();
  });
});
