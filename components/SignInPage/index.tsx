import type { NextPage } from "next";
import Head from "next/head";

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
      <h1>Sign in page</h1>
    </>
  );
};

export default SignIn;
