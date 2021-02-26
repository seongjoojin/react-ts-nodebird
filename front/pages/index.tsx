import React from 'react';
import {useSelector} from 'react-redux';

import AppLayout from 'components/AppLayout';
import PostForm from 'components/PostForm';
import PostCard from 'components/PostCard';
import {RootState} from 'reducers';

const Home = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const mainPosts = useSelector((state: RootState) => state.post.mainPosts);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;