import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import 'antd/dist/antd.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
