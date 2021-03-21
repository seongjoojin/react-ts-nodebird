import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import useSWR from 'swr';
import wrapper, { SagaStore } from '../store/configureStore';
import {
  FollowType,
  loadMyInfoRequestAction,
} from '../reducers/user';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { RootState } from '../reducers';

// eslint-disable-next-line max-len
const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const router = useRouter();
  const { me } = useSelector((state: RootState) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);
  const { data: followersData, error: followersError } = useSWR<Array<{ id: number; nickname: string; Follow: FollowType[] }>>(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingsError } = useSWR<Array<{ id: number; nickname: string; Follow: FollowType[] }>>(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);

  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  if (!me) {
    return '내 정보 로딩중...';
  }

  if (followersError || followingsError) {
    console.error(followersError || followingsError);
    return <div>팔로잉/팔로워 로딩 중 에러가 발생합니다</div>;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingsError} />
        <FollowList header="팔로워 목록" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followersError} />
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
