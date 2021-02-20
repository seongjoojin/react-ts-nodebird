import { AppProps } from 'next/app';
import Head from 'next/head';
import { FC } from 'react';
import 'antd/dist/antd.css';

const App : FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>NodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
