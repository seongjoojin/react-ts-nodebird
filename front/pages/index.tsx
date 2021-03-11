import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { RootState } from '../reducers';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const Home = () => {
  const dispatch = useDispatch();
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const { me } = useSelector((state: RootState) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state: RootState) => state.post,
  );
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);
  useInfiniteScroll({
    target,
    handleIntersect([{ isIntersecting }]) {
      if (isIntersecting) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
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
