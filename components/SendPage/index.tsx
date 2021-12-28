import type { NextPage } from "next";
import Head from "next/head";
import { NavigationBar } from "../NavigationBar";

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
      <NavigationBar />
    </>
  );
};
