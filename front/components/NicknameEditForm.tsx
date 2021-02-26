import React from 'react';
import { Form, Input } from 'antd';
import styled from '@emotion/styled';

const NicknameEditForm = () => {
  return (
    <NicknameEditWrapper>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </NicknameEditWrapper>
  );
};

const NicknameEditWrapper = styled(Form)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

export default NicknameEditForm;