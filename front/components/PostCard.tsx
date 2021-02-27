import React, {useCallback, useState} from 'react';
import {IMainPost} from 'reducers/post';
import {Card, Popover, Button, Avatar} from 'antd';
import {RetweetOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, EllipsisOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {RootState} from 'reducers';
import PostImage from 'components/PostImage';
import styled from '@emotion/styled';

interface IProps {
  post: IMainPost
}

const PostCard = ({post}: IProps) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state: RootState) => state.user.me?.id);
  const onToggleLike = useCallback(() => {
    setLiked(prevState => !prevState);
  }, []);
  const onToggleComment  = useCallback(() => {
    setCommentFormOpened(prevState => !prevState);
  } ,[]);
  return (
    <CardWrapper>
      <Card
        cover={post.Images[0] && <PostImage image={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
            : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="comment" onClick={onToggleComment} />,
          <Popover key="more" content={(
            <Button.Group>
              {id && post.User.id === id ? (
                <>
                  <Button>수정</Button>
                  <Button danger>삭제</Button>
                </>
              ) : <Button>신고</Button>}
            </Button.Group>
          )}>
            <EllipsisOutlined />
          </Popover>
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {commentFormOpened && (
        <div>
          댓글 부분
        </div>
      )}
      {/*<CommentForm  />*/}
      {/*<Comments />*/}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

export default PostCard;