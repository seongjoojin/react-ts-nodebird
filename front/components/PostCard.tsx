import React, { useCallback, useState } from 'react';
import { Card, Popover, Button, Avatar, List, Comment, message } from 'antd';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Link from 'next/link';
import {
  IMainPost,
  likePostRequestAction,
  removePostRequestAction,
  retweetRequestAction,
  unlikePostRequestAction,
} from '../reducers/post';
import { RootState } from '../reducers';
import PostImage from './PostImage';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

interface IProps {
  post: IMainPost
}

const PostCard = ({ post }: IProps) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state: RootState) => state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state: RootState) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  const onUnLike = useCallback(() => {
    if (!id) {
      message.info('로그인이 필요합니다.');
      return;
    }
    dispatch(unlikePostRequestAction(post.id));
  }, [id]);
  const onLike = useCallback(() => {
    if (!id) {
      message.info('로그인이 필요합니다.');
      return;
    }
    dispatch(likePostRequestAction(post.id));
  }, [id]);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prevState) => !prevState);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      message.info('로그인이 필요합니다.');
      return;
    }
    dispatch(removePostRequestAction(post.id));
  }, [id]);
  const onRetweet = useCallback(() => {
    if (!id) {
      message.info('로그인이 필요합니다.');
      return;
    }
    dispatch(retweetRequestAction(post.id));
  }, []);
  return (
    <CardWrapper>
      <Card
        cover={post.Images[0] && <PostImage images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetweet} />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onUnLike} />
            : <HeartOutlined key="heart" onClick={onLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover
            key="more"
            content={(
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button danger loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                  </>
                ) : <Button>신고</Button>}
              </Button.Group>
          )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={post.RetweetId ? `${post.User.nickname[0]}님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={post.Retweet.Images[0] && <PostImage images={post.Retweet.Images} />}
          >
            <Card.Meta
              avatar={(
                <Link href={`/user/${post.Retweet.User.id}`}>
                  <a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a>
                </Link>
              )}
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <Card.Meta
            avatar={(
              <Link href={`/user/${post.User.id}`}>
                <a><Avatar>{post.User.nickname[0]}</Avatar></a>
              </Link>
            )}
            title={post.User.nickname}
            description={<PostCardContent postData={post.content} />}
          />
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
    </CardWrapper>
  );
};

export default PostCard;
