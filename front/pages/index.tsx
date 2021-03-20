import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { RootState } from '../reducers';
import { loadPostsRequestAction } from '../reducers/post';
import { loadMyInfoRequestAction } from '../reducers/user';

import wrapper, { SagaStore } from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const { me } = useSelector((state: RootState) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector(
    (state: RootState) => state.post,
  );
  useEffect(() => {
    if (retweetError) {
      message.error(retweetError);
    }
  }, [retweetError]);
  useInfiniteScroll({
    target,
    handleIntersect([{ isIntersecting }]) {
      if (isIntersecting) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPostsRequestAction(lastId));
        }
      }
    },
    threshold: 0.5,
  });
  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
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
  context.store.dispatch(loadMyInfoRequestAction());
  context.store.dispatch(loadPostsRequestAction(undefined));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default Home;
