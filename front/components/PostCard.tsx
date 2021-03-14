import React, { useCallback, useState } from 'react';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import {
  IMainPost,
  likePostRequestAction,
  removePostRequestAction,
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
    dispatch(unlikePostRequestAction(post.id));
  }, []);
  const onLike = useCallback(() => {
    dispatch(likePostRequestAction(post.id));
  }, []);
  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prevState) => !prevState);
  }, []);

  const onRemovePost = useCallback(() => {
    dispatch(removePostRequestAction(post.id));
  }, []);
  return (
    <CardWrapper>
      <Card
        cover={post.Images[0] && <PostImage images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
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
        extra={id && <FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
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
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
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
