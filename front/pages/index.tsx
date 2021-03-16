import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInfiniteScroll from '../hooks/useInfiniteScroll';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { RootState } from '../reducers';
import { loadMyInfoRequestAction } from '../reducers/user';
import { loadPostsRequestAction } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const { me } = useSelector((state: RootState) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector(
    (state: RootState) => state.post,
  );
  useEffect(() => {
    dispatch(loadPostsRequestAction(undefined));
    dispatch(loadMyInfoRequestAction());
  }, []);
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
      <div ref={setTarget} id="InfiniteScrollTarget" />
    </AppLayout>
  );
};

export default Home;
