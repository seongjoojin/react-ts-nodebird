import { Avatar, Card } from 'antd';
import React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import wrapper, { SagaStore } from '../store/configureStore';
import {
  loadUserRequestAction,
} from '../reducers/user';
import AppLayout from '../components/AppLayout';
import { RootState } from '../reducers';

const About = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return (
    <AppLayout>
      <Head>
        <title>evanjin | nodebird</title>
      </Head>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch(loadUserRequestAction(1));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default About;
