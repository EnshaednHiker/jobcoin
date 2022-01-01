import {
  ChangeEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";

import escapeHtml from "escape-html";

import { HistoryChart } from "../../components/HistoryChart";
import { NavigationBar } from "../../components/NavigationBar";
import { AddressContext, DEFAULT_ADDRESS_VALUE } from "../../context";
import { getAddress, postSendCoinsToAddress } from "../../services";
import { GetAddressResponse, PostSendCoinResponse } from "../../types";
import { hasEscapedCharacter, isNumberString } from "../../utilities";

import {
  BoxWrapper,
  Column,
  StyledForm,
  StyledTypography,
  Wrapper,
} from "./styles";
import { HTTPError } from "ky";

export const SendPage: NextPage<GetAddressResponse> = (props) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationAddressError, setDestinationAddressError] = useState("");
  const [sendCoinsError, setSendCoinsError] = useState("");

  const [amountToSend, setAmountToSend] = useState("");
  const [amountToSendError, setAmountToSendError] = useState("");

  const { address, setAddress } = useContext(AddressContext);
  const router = useRouter();

  useEffect(() => {
    const { balance, transactions } = props;
    if (balance && balance !== "0" && (transactions?.length ?? 0) > 0) {
      setAddress({
        balance,
        transactions,
      });
    }
    // we only want this to run one time to avoid an infinite rerender loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendJobcoinsOnClickHandler = useCallback(async () => {
    try {
      const fromAddress = router.query?.address?.toString().trim() ?? "";
      // we need to protect against XSS attacks by stripping out characters that can make html tags
      const cleanDestinationAddress = escapeHtml(destinationAddress.trim());

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

  return (
    <>
      <Head>
        <title>Jobcoin send page</title>
        <meta
          name="description"
          content="send page interface for a new, much simpler online currency, the Jobcoin"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <Wrapper>
        <Column>
          <BoxWrapper>
            <StyledTypography
              // @ts-ignore issue with emotion not picking up the component prop
              component="h2"
              textAlign="center"
              variant="h5"
            >
              Jobcoin Balance
            </StyledTypography>
            <Typography
              component="p"
              textAlign="center"
              sx={{ m: "55px" }}
              variant="h5"
            >
              {address.balance ?? "0"}
            </Typography>
          </BoxWrapper>
          <BoxWrapper>
            <StyledTypography
              // @ts-ignore issue with emotion not picking up the component prop
              component="h2"
              textAlign="center"
              variant="h5"
            >
              Send Jobcoins
            </StyledTypography>
            <StyledForm>
              <TextField
                error={destinationAddressError.length > 0}
                fullWidth
                helperText={destinationAddressError}
                id="outlined-basic"
                label="Destination Address"
                onChange={destinationAddressOnChangeHandler}
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
                size="small"
                sx={{ mt: "24px" }}
                value={amountToSend}
                variant="outlined"
              />
              <Button
                disabled={
                  amountToSend.length === 0 ||
                  destinationAddress.length === 0 ||
                  amountToSendError.length > 0 ||
                  destinationAddressError.length > 0
                }
                fullWidth
                onClick={sendJobcoinsOnClickHandler}
                sx={{ mt: "24px" }}
                variant="contained"
              >
                Send Jobcoins
              </Button>
              {sendCoinsError && (
                <FormHelperText>{sendCoinsError}</FormHelperText>
              )}
            </StyledForm>
          </BoxWrapper>
        </Column>
        <HistoryChart />
      </Wrapper>
    </>
  );
};

SendPage.getInitialProps = async (ctx) => {
  // if ctx.req, then it's server side
  if (ctx.query?.address && ctx.req) {
    const address = await getAddress(ctx.query?.address?.toString());
    return address ?? DEFAULT_ADDRESS_VALUE;
  }

  return DEFAULT_ADDRESS_VALUE;
};
