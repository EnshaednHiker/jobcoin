import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import escapeHtml from "escape-html";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "context";
import { doesAddressExist, getAddress, postSendCoinsToAddress } from "services";
import { hasEscapedCharacter, isNumberString } from "utilities";

import { StyledForm } from "./styles";

export const SendCoinsForm: FC = () => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationAddressError, setDestinationAddressError] = useState("");
  const [sendCoinsError, setSendCoinsError] = useState("");

  const [amountToSend, setAmountToSend] = useState("");
  const [amountToSendError, setAmountToSendError] = useState("");

  const { setAddress } = useContext(AddressContext);
  const router = useRouter();

  const sendJobcoinsOnClickHandler = useCallback(async () => {
    try {
      const fromAddress = router.query?.address?.toString().trim() ?? "";
      // we need to protect against XSS attacks by stripping out characters that can make html tags
      const cleanDestinationAddress = escapeHtml(destinationAddress.trim());

      const destinationAddressResponse = await getAddress(
        cleanDestinationAddress
      );

      if (
        doesAddressExist(destinationAddressResponse ?? DEFAULT_ADDRESS_VALUE)
      ) {
        const response = await postSendCoinsToAddress({
          fromAddress,
          toAddress: cleanDestinationAddress,
          amount: amountToSend.trim(),
        });

        if (response?.status === "OK") {
          const getResponse = await getAddress(escapeHtml(fromAddress));

          setAddress(getResponse ?? DEFAULT_ADDRESS_VALUE);

          setDestinationAddress("");
          setDestinationAddressError("");
          setAmountToSend("");
          setAmountToSendError("");
        }
      } else {
        setSendCoinsError("Destination address does not exist.");
      }
    } catch (error) {
      // @ts-ignore error must remain untyped according to the catch linter
      if (error?.message?.includes("422")) {
        setSendCoinsError("Insufficient funds.");
      } else {
        setSendCoinsError("Something went wrong. Please try again.");
      }
    }
  }, [amountToSend, destinationAddress, router.query?.address, setAddress]);

  const destinationAddressOnChangeHandler = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >((event) => {
    const value = event.target.value;

    if (hasEscapedCharacter(value)) {
      setDestinationAddressError("Cannot use characters <>&'\"\\/");
    } else {
      setDestinationAddress(value);
      setDestinationAddressError("");
      setSendCoinsError("");
    }
  }, []);

  const amountToSendOnChangeHandler = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >((event) => {
    const value = event.target.value;

    if (!isNumberString(value) && value.length > 0) {
      setAmountToSendError("Must be a number");
    } else {
      setAmountToSendError("");
      setSendCoinsError("");
    }
    setAmountToSend(value);
  }, []);

  const isDisabled = useMemo(() => {
    return (
      amountToSend.length === 0 ||
      destinationAddress.length === 0 ||
      amountToSendError.length > 0 ||
      destinationAddressError.length > 0
    );
  }, [
    amountToSend.length,
    amountToSendError.length,
    destinationAddress.length,
    destinationAddressError.length,
  ]);

  const onKeypressHandler = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!isDisabled) {
          sendJobcoinsOnClickHandler();
        }
      }
    },
    [isDisabled, sendJobcoinsOnClickHandler]
  );

  return (
    <StyledForm>
      <TextField
        error={destinationAddressError.length > 0}
        fullWidth
        helperText={destinationAddressError}
        id="outlined-basic"
        label="Destination Address"
        onChange={destinationAddressOnChangeHandler}
        onKeyPress={onKeypressHandler}
        required
        size="small"
        value={destinationAddress}
        variant="outlined"
      />
      <TextField
        error={amountToSendError.length > 0}
        fullWidth
        helperText={amountToSendError}
        id="outlined-basic"
        label="Amount to Send"
        onChange={amountToSendOnChangeHandler}
        onKeyPress={onKeypressHandler}
        required
        size="small"
        sx={{ mt: "24px" }}
        value={amountToSend}
        variant="outlined"
      />
      <Button
        disabled={isDisabled}
        fullWidth
        onClick={sendJobcoinsOnClickHandler}
        sx={{ mt: "24px" }}
        variant="contained"
      >
        Send Jobcoins
      </Button>
      {sendCoinsError && <FormHelperText>{sendCoinsError}</FormHelperText>}
    </StyledForm>
  );
};
