import React, { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { ADD_COMMENT_REQUEST, IMainPost } from '../reducers/post';
import useInput from '../hooks/useInput';
import { RootState } from '../reducers';

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const SubmitButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
`;

interface IProps {
  post: IMainPost
}

const CommentForm = ({ post }: IProps) => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.user.me?.id);
  const { addCommentDone } = useSelector((state: RootState) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput<HTMLTextAreaElement>('');

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  return (
    <Form onFinish={onSubmitComment}>
      <FormItem>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <SubmitButton type="primary" htmlType="submit">삐약</SubmitButton>
      </FormItem>
    </Form>
  );
};

export default CommentForm;
