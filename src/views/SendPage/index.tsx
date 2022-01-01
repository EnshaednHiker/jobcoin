import { useContext, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import escapeHtml from "escape-html";

import { HistoryChart } from "../../components/HistoryChart";
import { NavigationBar } from "../../components/NavigationBar";
import { SendCoinsForm } from "../../components/SendCoinsForm";

import { AddressContext, DEFAULT_ADDRESS_VALUE } from "../../context";
import { doesAddressExist, getAddress } from "../../services";
import { GetAddressResponse } from "../../types";

import { BoxWrapper, Column, StyledTypography, Wrapper } from "./styles";

export const SendPage: NextPage<GetAddressResponse> = (props) => {
  const { address, setAddress } = useContext(AddressContext);
  const { query } = useRouter();
  const addressName = query?.address?.toString();
  useEffect(() => {
    const { balance, transactions } = props;

    // we don't want to set the default value into context state if it's already there
    // this prevents unnecessary rerenders since the object will be a new reference even if it has the same values
    if (doesAddressExist({ balance, transactions })) {
      setAddress({
        balance,
        transactions,
      });
    } else if (
      (!doesAddressExist({ balance, transactions }) && addressName?.length) ??
      0 > 0
    ) {
      const fetchAddress = async () =>
        await getAddress(escapeHtml(addressName?.trim()));
      fetchAddress().then((response) => {
        setAddress(response ?? DEFAULT_ADDRESS_VALUE);
      });
    }
    // we only want this to run one time to avoid an infinite rerender loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressName]);

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
            <SendCoinsForm />
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
    const address = await getAddress(
      escapeHtml(ctx.query?.address?.toString().trim())
    );
    return address ?? DEFAULT_ADDRESS_VALUE;
  }

  return DEFAULT_ADDRESS_VALUE;
};
