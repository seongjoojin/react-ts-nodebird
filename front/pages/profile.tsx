import axios from 'axios';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';

import wrapper, { SagaStore } from '../store/configureStore';
import {
  loadFollowersRequestAction,
  loadFollowingsRequestAction,
  loadMyInfoRequestAction,
} from '../reducers/user';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { RootState } from '../reducers';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    dispatch(loadFollowersRequestAction());
    dispatch(loadFollowingsRequestAction());
  }, []);
  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={me?.Followings} />
        <FollowList header="팔로워 목록" data={me?.Followers} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default Profile;
