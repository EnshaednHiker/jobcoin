import {
  ChangeEventHandler,
  KeyboardEventHandler,
  useCallback,
  useState,
} from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import escapeHtml from "escape-html";

import { getAddress } from "../services";
import { hasEscapedCharacter } from "../utilities";

import {
  SignInWrapper,
  StyledAnchorIcon,
  StyledForm,
  StyledTypography,
  Wrapper,
} from "./styles";

export const SignInPage: NextPage = () => {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { push } = router;

  const signInOnClickHandler = useCallback(async () => {
    try {
      // we need to protect against XSS attacks by stripping out characters that can make html tags
      const cleanAddress = escapeHtml(address.trim());
      console.log("cleanedAddress", cleanAddress);

      const response = await getAddress(cleanAddress);

      if (response?.balance === "0" && response?.transactions?.length === 0) {
        setError("Address does not exist.");
      } else {
        setError("");
        push(`/send-page?address=${cleanAddress}`);
      }
    } catch (error) {
      console.log("error", error);
      setError("Something went wrong. Please try again.");
    }
  }, [address, push]);

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
            textAlign="center"
            variant="h5"
          >
            Welcome! Sign In With Your Jobcoin Address
          </StyledTypography>
          <StyledForm>
            <TextField
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
