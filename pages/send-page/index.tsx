import type { NextPage } from "next";
import Head from "next/head";

const SendPage: NextPage = () => {
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
      <h1>Send page</h1>
    </>
  );
};

export default SendPage;
