import type { NextPage } from "next";
import Head from "next/head";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { SignInWrapper, StyledForm, StyledTypography, Wrapper } from "./styles";

const SignIn: NextPage = () => {
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
              fullWidth
              id="outlined-basic"
              label="Jobcoin Address"
              size="small"
              variant="outlined"
            />
            <Button fullWidth sx={{ mt: "1rem" }} variant="contained">
              Sign In
            </Button>
          </StyledForm>
        </SignInWrapper>
      </Wrapper>
    </>
  );
};

export default SignIn;
