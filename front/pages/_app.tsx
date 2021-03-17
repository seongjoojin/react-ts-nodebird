import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>NodeBird</title>
    </Head>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);
export default wrapper.withRedux(App);
