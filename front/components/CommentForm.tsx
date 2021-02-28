import React, {useCallback, useState} from 'react';
import {Button, Form, Input} from 'antd';
import {useSelector} from 'react-redux';
import styled from "@emotion/styled";

import {IMainPost} from 'reducers/post';
import useInput from 'hooks/useInput';
import {RootState} from 'reducers';

interface IProps {
  post: IMainPost
}

const CommentForm = ({post}: IProps) => {
  const id = useSelector((state: RootState) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput<HTMLTextAreaElement>('');
  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);
  }, [commentText]);
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

const FormItem = styled(Form.Item)`
  position: relative;
  margin: 0;
`;

const SubmitButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -40px;
`;

export default CommentForm;