import AppLayout from 'components/AppLayout';
import Head from 'next/head';
import { FC } from 'react';

const Profile: FC = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>내 프로필</AppLayout>
    </>
  );
};

export default Profile;