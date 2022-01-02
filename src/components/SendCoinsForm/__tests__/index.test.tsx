import { Dispatch, SetStateAction } from "react";
import { render, screen } from "test-utils";
import userEvent from "@testing-library/user-event";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "context";
import { ADDRESS_WITH_FROM_ADDRESS } from "__mocks__/data";
import { GetAddressResponse } from "types";
import { SendCoinsForm, SEND_COINS_FORM_TEST_IDS } from "..";

describe("SendCoinsForm", () => {
  it("should render the form if an address is present", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: ADDRESS_WITH_FROM_ADDRESS,
      setAddress: mockSetAddress,
    };

    render(
      <AddressContext.Provider value={value}>
        <SendCoinsForm />
      </AddressContext.Provider>,
      { router: { query: { address: "Bob" } } }
    );

    expect(
      await screen.findByTestId(SEND_COINS_FORM_TEST_IDS.FORM)
    ).toBeInTheDocument();
  });

  it("should not render the form if an address is not present", async () => {
    const mockSetAddress = jest.fn() as never as Dispatch<
      SetStateAction<GetAddressResponse>
    >;

    const value = {
      address: DEFAULT_ADDRESS_VALUE,
      setAddress: mockSetAddress,
    };

    render(
      <AddressContext.Provider value={value}>
        <SendCoinsForm />
      </AddressContext.Provider>,
      { router: { query: { address: "Bob" } } }
    );

    expect(
      screen.queryByTestId(SEND_COINS_FORM_TEST_IDS.FORM)
    ).not.toBeInTheDocument();
  });

  describe("button states", () => {
    it("should disable the Send Coins button if the form is empty", async () => {
      const mockSetAddress = jest.fn() as never as Dispatch<
        SetStateAction<GetAddressResponse>
      >;

      const value = {
        address: ADDRESS_WITH_FROM_ADDRESS,
        setAddress: mockSetAddress,
      };

      render(
        <AddressContext.Provider value={value}>
          <SendCoinsForm />
        </AddressContext.Provider>,
        { router: { query: { address: "Bob" } } }
      );

      const textFields = await screen.findAllByRole("textbox");

      textFields.map((textField) => {
        expect(textField).toHaveAttribute("value", "");
      });

      expect(await screen.findByRole("button")).toHaveAttribute("disabled", "");
    });

    it("should disable the Send Coins button if first textfield is filled but the second one is empty", async () => {
      const mockSetAddress = jest.fn() as never as Dispatch<
        SetStateAction<GetAddressResponse>
      >;

      const value = {
        address: ADDRESS_WITH_FROM_ADDRESS,
        setAddress: mockSetAddress,
      };

      render(
        <AddressContext.Provider value={value}>
          <SendCoinsForm />
        </AddressContext.Provider>,
        { router: { query: { address: "Bob" } } }
      );

      const textFields = await screen.findAllByRole("textbox");

      userEvent.type(textFields[0], "Alice");

      expect(textFields[0]).toHaveAttribute("value", "Alice");
      expect(textFields[1]).toHaveAttribute("value", "");

      expect(await screen.findByRole("button")).toHaveAttribute("disabled", "");
    });

    it("should disable the Send Coins button if first textfield is empty but the second one is filled", async () => {
      const mockSetAddress = jest.fn() as never as Dispatch<
        SetStateAction<GetAddressResponse>
      >;

      const value = {
        address: ADDRESS_WITH_FROM_ADDRESS,
        setAddress: mockSetAddress,
      };

      render(
        <AddressContext.Provider value={value}>
          <SendCoinsForm />
        </AddressContext.Provider>,
        { router: { query: { address: "Bob" } } }
      );

      const textFields = await screen.findAllByRole("textbox");

      userEvent.type(textFields[1], "10");

      expect(textFields[0]).toHaveAttribute("value", "");
      expect(textFields[1]).toHaveAttribute("value", "10");

      expect(await screen.findByRole("button")).toHaveAttribute("disabled", "");
    });

    it("should disable the Send Coins button if first textfield is filled but the second one is filled with something other than a number", async () => {
      const mockSetAddress = jest.fn() as never as Dispatch<
        SetStateAction<GetAddressResponse>
      >;

      const value = {
        address: ADDRESS_WITH_FROM_ADDRESS,
        setAddress: mockSetAddress,
      };

      render(
        <AddressContext.Provider value={value}>
          <SendCoinsForm />
        </AddressContext.Provider>,
        { router: { query: { address: "Bob" } } }
      );

      const textFields = await screen.findAllByRole("textbox");

      userEvent.type(textFields[0], "Alice");
      userEvent.type(textFields[1], "foo");

      expect(textFields[0]).toHaveAttribute("value", "Alice");
      expect(textFields[1]).toHaveAttribute("value", "foo");

      expect(await screen.findByRole("button")).toHaveAttribute("disabled", "");
      expect(await screen.findByText("Must be a number")).toBeInTheDocument();
    });

    it("should enable the Send Coins button if both fields are filled with good data", async () => {
      const mockSetAddress = jest.fn() as never as Dispatch<
        SetStateAction<GetAddressResponse>
      >;

      const value = {
        address: ADDRESS_WITH_FROM_ADDRESS,
        setAddress: mockSetAddress,
      };

      render(
        <AddressContext.Provider value={value}>
          <SendCoinsForm />
        </AddressContext.Provider>,
        { router: { query: { address: "Bob" } } }
      );

      const textFields = await screen.findAllByRole("textbox");

      userEvent.type(textFields[0], "Alice");
      userEvent.type(textFields[1], "10");

      expect(textFields[0]).toHaveAttribute("value", "Alice");
      expect(textFields[1]).toHaveAttribute("value", "10");

      expect(await screen.findByRole("button")).not.toHaveAttribute(
        "disabled",
        ""
      );
    });
  });

  // if I had the time to set up API mocking, I would test the API interactions in the following test cases
  it("should send coins to destination address if the destination address is good and there are sufficient funds", () => {});
  it("should not send coins to destination address if the destination address is good but there are insufficient funds", () => {});
  it("should not send coins to destination address if the destination address does not exist", () => {});
});
