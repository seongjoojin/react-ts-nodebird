import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { RootState } from '../../reducers';
import { loadUserPostsRequestAction } from '../../reducers/post';
import { loadMyInfoRequestAction, loadUserRequestAction } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper, { SagaStore } from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const {
    mainPosts, hasMorePosts, loadPostsLoading,
  } = useSelector((state: RootState) => state.post);
  const { userInfo, me } = useSelector((state: RootState) => state.user);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useInfiniteScroll({
    target,
    handleIntersect([{ isIntersecting }]) {
      if (isIntersecting) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
          dispatch(loadUserPostsRequestAction(Number(id), lastId));
        }
      }
    },
    threshold: 0.5,
  });
  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? (
          <Card
            style={{ marginBottom: 20 }}
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
            />
          </Card>
        )
        : null}
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
      <div ref={setTarget} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch(loadUserPostsRequestAction(Number(context.params?.id), undefined));
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadUserRequestAction(Number(context.params?.id)));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default User;
