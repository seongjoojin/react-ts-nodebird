import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input } from 'antd';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../reducers';
import { addPostRequestAction } from '../reducers/post';
import useInput from '../hooks/useInput';

const FormWrapper = styled(Form)`
  margin: 10px 0 20px;
`;

const SubmitButton = styled(Button)`
  float: right;
`;

const PostImageBox = styled.div`
  display: inline-block;
`;

const PostImage = styled.img`
  width: 200px;
`;

const PostFrom = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state: RootState) => state.post);
  const [text, onChangeText, setText] = useInput<HTMLTextAreaElement>('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPostRequestAction(text));
  }, [text]);

  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, [imageInput.current]);

  return (
    <FormWrapper encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <SubmitButton type="primary" htmlType="submit">짹짹</SubmitButton>
      </div>
      <div>
        {imagePaths.map((v) => (
          <PostImageBox key={v}>
            <PostImage src={v} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </PostImageBox>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostFrom;
