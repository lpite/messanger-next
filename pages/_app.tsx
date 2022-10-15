import "../styles/style.scss";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Messenger</title>
        <meta name="description" content="Messenger" />
        <link rel="icon" href="/cat.jpg" />
        <link rel="apple-touch-icon" href="/cat.png" sizes="180x180" />
        <link rel="apple-touch-icon" href="/cat.png" sizes="152x152" />
        <link rel="apple-touch-icon" href="/cat.png" sizes="76x76" />
      </Head>
        <Component {...pageProps} />
    </>
  );
}


export default MyApp;
