import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import escapeHtml from "escape-html";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "../../context";
import { doesAddressExist, getAddress } from "../../services";
import { hasEscapedCharacter } from "../../utilities";

import {
  SignInWrapper,
  StyledAnchorIcon,
  StyledForm,
  StyledTypography,
  Wrapper,
} from "./styles";

const SCOPE = "@jobcoin/views/SignInPage";

export const SIGN_IN_PAGE_TEST_IDS = {
  HEADING: `${SCOPE}/Heading`,
  ADDRESS_TEXT_FIELD: `${SCOPE}/AddressTextField`,
  SIGN_IN_BUTTON: `${SCOPE}/SignInButton`,
} as const;

export const SignInPage: NextPage = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { push } = router;
  const { setAddress: setAddressAction } = useContext(AddressContext);

  const signInOnClickHandler = useCallback(async () => {
    try {
      // we need to protect against XSS attacks by stripping out characters that can make html tags
      const cleanAddress = escapeHtml(address.trim());

      const response = await getAddress(cleanAddress);

      if (!doesAddressExist(response ?? DEFAULT_ADDRESS_VALUE)) {
        setError("Address does not exist.");
      } else {
        setError("");
        setAddressAction(response ?? DEFAULT_ADDRESS_VALUE);
        push(`/send-page?address=${cleanAddress}`);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    }
  }, [address, push, setAddressAction]);

  const onChangeHandler = useCallback<
    ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  >((event) => {
    const value = event.target.value;
    setAddress(value);
    if (hasEscapedCharacter(value)) {
      setError("Cannot use characters <>&'\"\\/");
    } else {
      setError("");
    }
  }, []);

  const onKeypressHandler = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (!hasEscapedCharacter(address)) {
          signInOnClickHandler();
        }
      }
    },
    [address, signInOnClickHandler]
  );

  return (
    <>
      <Head>
        <title>Jobcoin sign in</title>
        <meta
          name="description"
          content="sign in interface for a new, much simpler online currency, the Jobcoin"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <StyledAnchorIcon />
        <SignInWrapper>
          <StyledTypography
            // @ts-ignore issue with emotion not picking up the component prop
            component="h1"
            data-testid={SIGN_IN_PAGE_TEST_IDS.HEADING}
            textAlign="center"
            variant="h5"
          >
            Welcome! Sign In With Your Jobcoin Address
          </StyledTypography>
          <StyledForm>
            <TextField
              data-testid={SIGN_IN_PAGE_TEST_IDS.ADDRESS_TEXT_FIELD}
              error={error.length > 0}
              fullWidth
              helperText={error}
              id="outlined-basic"
              label="Jobcoin Address"
              onChange={onChangeHandler}
              onKeyPress={onKeypressHandler}
              required
              size="small"
              value={address}
              variant="outlined"
            />
            <Button
              data-testid={SIGN_IN_PAGE_TEST_IDS.SIGN_IN_BUTTON}
              disabled={address.length < 1 || hasEscapedCharacter(address)}
              fullWidth
              onClick={signInOnClickHandler}
              sx={{ mt: "1rem" }}
              type="button"
              variant="contained"
            >
              Sign In
            </Button>
          </StyledForm>
        </SignInWrapper>
      </Wrapper>
    </>
  );
};
