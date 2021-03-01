import React from 'react';
import Head from 'next/head';
import { AppProps, AppContext } from 'next/app';
import {END} from 'redux-saga';
import 'antd/dist/antd.css';

import wrapper, {SagaStore} from 'store/configureStore';

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

App.getInitialProps = async ({Component, ctx}: AppContext) => {
  // 1. Wait for all page actions to dispatch
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  // 2. Stop the saga if on server
  if (ctx.req) {
    ctx.store.dispatch(END);
    await (ctx.store as SagaStore).sagaTask?.toPromise();
  }

  // 3. Return props
  return {
    pageProps,
  };
};

export default wrapper.withRedux(App);
