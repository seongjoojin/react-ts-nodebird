import AppLayout from 'components/AppLayout';
import Head from 'next/head';
import { FC } from 'react';

const Signup: FC = () => {
  return (
    <>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <AppLayout>회원가입</AppLayout>
    </>
  );
}

export default Signup;