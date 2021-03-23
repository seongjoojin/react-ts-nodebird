import React, { useCallback, useEffect, useRef } from 'react';
import { Button, Form, Input, message } from 'antd';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { backUrl } from '../config/config';
import { RootState } from '../reducers';
import { addPostRequestAction, removeImageAction, uploadImagesRequestAction } from '../reducers/post';
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
    if (!text || !text.trim()) {
      message.error('게시글을 작성하세요.');
      return;
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    dispatch(addPostRequestAction(formData));
  }, [text, imagePaths]);

  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, [imageInput.current]);
  const onChangeImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f: string) => {
      imageFormData.append('image', f);
    });
    dispatch(uploadImagesRequestAction(imageFormData));
  }, []);
  const onRemoveImage = useCallback((index:number) => () => {
    console.log('onRemoveImage', index);
    dispatch(removeImageAction(index));
  }, []);

  return (
    <FormWrapper encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <SubmitButton type="primary" htmlType="submit">짹짹</SubmitButton>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <PostImageBox key={v}>
            <PostImage src={`${backUrl}/${v}`} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </PostImageBox>
        ))}
      </div>
    </FormWrapper>
  );
};

export default PostFrom;
