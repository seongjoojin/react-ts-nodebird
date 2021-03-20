import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { RootState } from '../../reducers';
import PostCard from '../../components/PostCard';
import wrapper, { SagaStore } from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import { loadHashtagPostsRequestAction } from '../../reducers/post';
import { loadMyInfoRequestAction } from '../../reducers/user';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const {
    mainPosts, hasMorePosts, loadPostsLoading,
  } = useSelector((state: RootState) => state.post);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useInfiniteScroll({
    target,
    handleIntersect([{ isIntersecting }]) {
      if (isIntersecting) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
          if (typeof tag === 'string') dispatch(loadHashtagPostsRequestAction(tag, lastId));
        }
      }
    },
    threshold: 0.5,
  });

  return (
    <AppLayout>
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
  context.store.dispatch(loadMyInfoRequestAction());
  if (typeof context.params?.tag === 'string') context.store.dispatch(loadHashtagPostsRequestAction(context.params?.tag, undefined));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default Hashtag;
