import type { NextPage } from "next";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { NavigationBar } from "../NavigationBar";
import { SEND_PAGE_MOBILE_BREAKPOINT } from "../constants";

import {
  BoxWrapper,
  Column,
  HistoryChartWrapper,
  StyledForm,
  StyledTypography,
  Wrapper,
} from "./styles";

export const SendPage: NextPage = () => {
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
      <NavigationBar mobileBreakpoint={SEND_PAGE_MOBILE_BREAKPOINT} />
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
              {/* TODO: add dynamic balance amount from API */}
              230.12
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
        <Column>
          <HistoryChartWrapper></HistoryChartWrapper>
        </Column>
      </Wrapper>
    </>
  );
};
