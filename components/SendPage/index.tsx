import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { HistoryChart } from "../HistoryChart";
import { NavigationBar } from "../NavigationBar";
import { SEND_PAGE_MOBILE_BREAKPOINT } from "../constants";
import { AddressContext, DEFAULT_ADDRESS_VALUE } from "../context";
import { getAddress } from "../services";
import { AddressResponse } from "../types";

import {
  BoxWrapper,
  Column,
  StyledForm,
  StyledTypography,
  Wrapper,
} from "./styles";

export const SendPage: NextPage<AddressResponse> = (props) => {
  const { address, setAddress } = useContext(AddressContext);

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
              Send Jobcoin
            </StyledTypography>
            <StyledForm>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Destination Address"
                size="small"
                variant="outlined"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Amount to Send"
                size="small"
                sx={{ mt: "24px" }}
                variant="outlined"
              />
              <Button fullWidth sx={{ mt: "24px" }} variant="contained">
                Send Jobcoins
              </Button>
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
