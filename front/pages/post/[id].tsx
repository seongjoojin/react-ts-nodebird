import Head from 'next/head';
import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';
import { RootState } from '../../reducers';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import { loadPostRequestAction } from '../../reducers/post';
import { loadMyInfoRequestAction } from '../../reducers/user';
import wrapper, { SagaStore } from '../../store/configureStore';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { singlePost } = useSelector(
    (state: RootState) => state.post,
  );

  return (
    <AppLayout>
      {singlePost && (
        <Head>
          <title>
            {singlePost.User.nickname}
            님의 글
          </title>
          <meta name="description" content={`${singlePost.User.nickname}님의 게시글`} />
          <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
          <meta property="og:description" content={`${singlePost.User.nickname}님의 게시글`} />
          <meta property="og:image" content="https://nodebird.com/favicon.ico" />
          <meta property="og:url" content={`https://nodebird.com/user/${id}`} />
        </Head>
      )}
      {singlePost && <PostCard post={singlePost} />}
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
  context.store.dispatch(loadPostRequestAction(Number(context.params?.id)));
  context.store.dispatch(END);
  await (context.store as SagaStore).sagaTask?.toPromise();
});

export default Post;
